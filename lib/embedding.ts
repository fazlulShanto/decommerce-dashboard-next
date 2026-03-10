import { embed, generateText } from "ai";
import { google } from "@ai-sdk/google";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export function chunkText(text: string, maxLength: number = 800): string[] {
    const chunks: string[] = [];
    const paragraphs = text
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean);

    for (const p of paragraphs) {
        if (p.length <= maxLength) {
            chunks.push(p);
        } else {
            const sentences = p.split(/(?<=[.!?])\s+/);
            let currentChunk = "";
            for (const s of sentences) {
                if ((currentChunk + " " + s).length <= maxLength) {
                    currentChunk = (currentChunk + " " + s).trim();
                } else {
                    if (currentChunk) chunks.push(currentChunk);
                    currentChunk = s;
                }
            }
            if (currentChunk) chunks.push(currentChunk);
        }
    }

    const combinedChunks: string[] = [];
    let temp = "";
    for (const c of chunks) {
        if ((temp + "\n" + c).length <= maxLength) {
            temp = temp ? temp + "\n" + c : c;
        } else {
            if (temp) combinedChunks.push(temp);
            temp = c;
        }
    }
    if (temp) combinedChunks.push(temp);

    return combinedChunks.length > 0
        ? combinedChunks
        : [text.slice(0, maxLength)];
}

export async function generateEmbeddings(
    text: string,
    _late_chunking = true,
): Promise<{ text: string; vector: number[] }[]> {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        throw new Error(
            "GOOGLE_GENERATIVE_AI_API_KEY is not set in environment variables",
        );
    }

    const chunks = chunkText(text);
    const results = await Promise.all(
        chunks.map(async (chunk) => {
            const { embedding } = await embed({
                model: google.embeddingModel("gemini-embedding-001"),
                value: chunk,
                providerOptions: {
                    google: {
                        taskType: "RETRIEVAL_DOCUMENT",
                        outputDimensionality: 768,
                    },
                },
            });

            return { text: chunk, vector: embedding };
        }),
    );

    return results;
}

export async function rerankDocuments(
    query: string,
    documents: string[],
    topN: number = 3,
): Promise<string[]> {
    if (!documents || documents.length === 0) {
        return [];
    }

    if (!process.env.OLLAMA_KEY) {
        throw new Error("OLLAMA_KEY is not set in environment variables");
    }

    const ollamaProvider = createOpenAICompatible({
        name: "ollama",
        apiKey: process.env.OLLAMA_KEY,
        baseURL: "https://ollama.com/v1/",
        includeUsage: true,
    });

    const numberedDocs = documents
        .map((doc, index) => `Index: ${index}\n${doc}`)
        .join("\n\n---\n\n");

    try {
        const { text } = await generateText({
            model: ollamaProvider("gpt-oss-20b"),
            temperature: 0,
            prompt: [
                "You are a ranking engine.",
                `Return ONLY a valid JSON array of ${Math.min(topN, documents.length)} integers.`,
                "Each integer must be an Index from the provided documents, ordered from most relevant to least relevant.",
                "Do not include markdown or explanation.",
                `Query:\n${query}`,
                `Documents:\n${numberedDocs}`,
            ].join("\n\n"),
        });

        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) {
            return documents.slice(0, topN);
        }

        const uniqueIndices = Array.from(new Set(parsed))
            .filter((value) => Number.isInteger(value))
            .filter((value) => value >= 0 && value < documents.length)
            .slice(0, topN) as number[];

        if (uniqueIndices.length === 0) {
            return documents.slice(0, topN);
        }

        const finalResult = uniqueIndices.map((index) => documents[index]);
        console.log("Reranking result:", finalResult);
        return finalResult;
    } catch {
        return documents.slice(0, topN);
    }
}
