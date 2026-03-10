import { z } from "zod";
import { generateText, tool, stepCountIs, userModelMessageSchema } from "ai";

import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateEmbeddings, rerankDocuments } from "./lib/jina";
import { searchVectors } from "./lib/qdrant";

const ollamaProvider = createOpenAICompatible({
    name: "ollama",
    apiKey: process.env.OLLAMA_KEY || "ollama", // Optional, depends on your auth
    baseURL: "https://ollama.com/v1/", // Ollama Cloud API
    includeUsage: true,
});

const knowledgeLookupTool = tool({
    description:
        "Search for knowledge, documents, and product context from the vector database. You MUST use this tool when users ask questions about specific items, store policies, or historical information.",
    parameters: z.object({
        query: z
            .string()
            .min(1, "A search query string is strictly required.")
            .describe(
                "The exact search query or keywords to look up in the database. You MUST provide this string.",
            ),
    }),
    // @ts-expect-error - AI SDK v3 types sometimes conflict with strict parameters
    execute: async ({ query }: { query?: string }) => {
        try {
            if (!query || query.trim() === "") {
                return {
                    result: "Please provide a specific search query to look up in the knowledge base. The previous tool call was missing the 'query' string argument.",
                };
            }

            console.log(
                `[Tool: knowledge_look_up] Generating embedding for query: "${query}"`,
            );
            const embeddings = await generateEmbeddings(query, false);

            if (!embeddings || embeddings.length === 0) {
                return {
                    result: "Failed to generate embedding for the query.",
                };
            }

            const queryVector = embeddings[0].vector;

            console.log(`[Tool: knowledge_look_up] Searching Qdrant...`);
            const searchResults = await searchVectors(queryVector, 10);

            if (!searchResults || searchResults.length === 0) {
                return { result: "No relevant knowledge found." };
            }

            // Extract text payloads from Qdrant results.
            // Assuming payload stored contains 'text' or 'content'. Adjust based on how embeddings were saved.
            // Looking at knowledge/product actions, they might have 'title', 'content', 'description'
            const documents = searchResults
                .map((res) => {
                    const payload = res.payload || {};
                    // Construct a sensible string to rerank
                    const title = payload.title || payload.name || "";
                    const content =
                        payload.chunkText ||
                        payload.content ||
                        payload.description ||
                        "";
                    return `Title: ${title}\nContent: ${content}`.trim();
                })
                .filter((doc) => doc.length > 0);

            if (documents.length === 0) {
                return {
                    result: "No text content available in vector payloads.",
                };
            }

            console.log(
                `[Tool: knowledge_look_up] Reranking ${documents.length} documents...`,
            );
            // Rerank using Jina AI to get the top 3 most relevant context
            const rerankedDocs = await rerankDocuments(query, documents, 3);

            return { result: rerankedDocs.join("\n\n---\n\n") };
        } catch (err) {
            console.error("[Tool: knowledge_look_up] Error:", err);
            return {
                result: "An internal error occurred during knowledge lookup.",
            };
        }
    },
});

const main = async () => {
    const systemPrompt = `
        You are a helpful AI assistant for the Decommerce dashboard.
        You have a tool called 'knowledge_look_up' to search the knowledge base. 
        CRITICAL: When you use the 'knowledge_look_up' tool, you MUST ALWAYS provide the 'query' argument as a string summarizing the user's question. 
        If you do not know the answer, use the knowledge tool with a specific search phrase. Always provide concise and helpful responses.`;

    // Ensure we start with system prompt
    const fullMessages: any = [
        userModelMessageSchema.parse({
            role: "user",
            content: "hi,what is the return policy",
        }),
    ];

    const result = await generateText({
        model: ollamaProvider("gpt-oss:120b"),
        system: systemPrompt,

        tools: {
            knowledge_look_up: knowledgeLookupTool,
        },
        messages: fullMessages,
        stopWhen: stepCountIs(5),
        // prompt: "hi,what is the return policy",
    });

    console.log("🏵️".repeat(20));
    console.log("tool calls", result);
    console.log("✅".repeat(20));
    console.log(result.text);
};

main();
