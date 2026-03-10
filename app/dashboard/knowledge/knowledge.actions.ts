"use server";

import connectToDatabase from "@/lib/mongodb";
import { KnowledgeDAL, KnowledgeModel } from "@/models/knowledge.dal";
import { revalidateTag } from "next/cache";
import { generateEmbeddings } from "@/lib/embedding";
import { upsertVector, deleteVectorsByPayloadMatch } from "@/lib/qdrant";

export async function createKnowledgeAction(data: {
    name: string;
    content: string;
    guildId: string;
    source?: "created" | "uploaded";
    fileUrl?: string;
    fileKey?: string;
}) {
    try {
        await connectToDatabase();
        const charCount = data.content.length;
        if (charCount > 12000) {
            return {
                success: false,
                error: "Content exceeds 12,000 character limit",
            };
        }
        const knowledge = await KnowledgeDAL.createKnowledge({
            name: data.name,
            content: data.content,
            charCount,
            guildId: data.guildId,
            source: data.source || "created",
            fileUrl: data.fileUrl || null,
            fileKey: data.fileKey || null,
            training_status: "not_trained",
            qdrant_point_id: null,
            trained_at: null,
        } as any);
        revalidateTag("knowledge-list");
        return {
            success: true,
            knowledge: JSON.parse(JSON.stringify(knowledge)),
        };
    } catch (error: any) {
        console.error("Failed to create knowledge:", error);
        return {
            success: false,
            error: error.message || "Failed to create knowledge",
        };
    }
}

export async function updateKnowledgeAction(
    id: string,
    data: { name?: string; content?: string },
) {
    try {
        await connectToDatabase();
        const updateData: any = { ...data };
        if (data.content !== undefined) {
            if (data.content.length > 12000) {
                return {
                    success: false,
                    error: "Content exceeds 12,000 character limit",
                };
            }
            updateData.charCount = data.content.length;
            // Reset training status when content changes
            updateData.training_status = "not_trained";
        }
        const knowledge = await KnowledgeDAL.updateKnowledgeById(
            id,
            updateData,
        );
        revalidateTag("knowledge-list");
        return {
            success: true,
            knowledge: JSON.parse(JSON.stringify(knowledge)),
        };
    } catch (error: any) {
        console.error("Failed to update knowledge:", error);
        return {
            success: false,
            error: error.message || "Failed to update knowledge",
        };
    }
}

export async function deleteKnowledgeAction(id: string, guildId: string) {
    try {
        await connectToDatabase();
        const knowledge = await KnowledgeDAL.getKnowledgeById(id);

        if (knowledge && knowledge.qdrant_point_id) {
            await deleteVectorsByPayloadMatch("knowledgeId", id);
        }

        await KnowledgeDAL.deleteKnowledge(id, guildId);
        revalidateTag("knowledge-list");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to delete knowledge:", error);
        return {
            success: false,
            error: error.message || "Failed to delete knowledge",
        };
    }
}

export async function trainKnowledgeAction(knowledgeIds: string[]) {
    try {
        await connectToDatabase();
        // Set all to "training"
        await KnowledgeModel.updateMany(
            { _id: { $in: knowledgeIds } },
            { $set: { training_status: "training" } },
        );
        revalidateTag("knowledge-list");

        // Embed knowledge data into Qdrant via Vercel AI SDK
        for (const id of knowledgeIds) {
            try {
                const knowledge = await KnowledgeDAL.getKnowledgeById(id);
                if (!knowledge) continue;

                const trainingText = `Title: ${knowledge.name}\n${knowledge.content}`;

                // Generate embeddings and upsert vectors to Qdrant
                const embeddings = await generateEmbeddings(trainingText);

                if (knowledge.qdrant_point_id) {
                    await deleteVectorsByPayloadMatch("knowledgeId", id);
                }

                const pointId =
                    knowledge.qdrant_point_id || crypto.randomUUID();

                for (let i = 0; i < embeddings.length; i++) {
                    const chunkPointId =
                        embeddings.length === 1 ? pointId : crypto.randomUUID();
                    await upsertVector(chunkPointId, embeddings[i].vector, {
                        type: "knowledge",
                        knowledgeId: id,
                        guildId: knowledge.guildId,
                        source: knowledge.source,
                        name: knowledge.name,
                        chunkText: embeddings[i].text,
                        chunkIndex: i,
                        totalChunks: embeddings.length,
                    });
                }

                await KnowledgeModel.findByIdAndUpdate(id, {
                    training_status: "trained",
                    trained_at: new Date(),
                    qdrant_point_id: pointId,
                });
            } catch (err) {
                console.error(`Failed to train knowledge ${id}:`, err);
                await KnowledgeModel.findByIdAndUpdate(id, {
                    training_status: "failed",
                });
            }
        }

        revalidateTag("knowledge-list");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to train knowledge:", error);
        return {
            success: false,
            error: error.message || "Failed to train knowledge",
        };
    }
}
