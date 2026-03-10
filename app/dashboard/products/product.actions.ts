"use server";

import connectToDatabase from "@/lib/mongodb";
import { ProductDAL, ProductModel } from "@/models/product.dal";
import { revalidateTag } from "next/cache";
import { generateEmbeddings } from "@/lib/embedding";
import { upsertVector, deleteVectorsByPayloadMatch } from "@/lib/qdrant";

export async function createProductAction(data: any, guildId: string) {
    try {
        await connectToDatabase();
        const product = await ProductDAL.createProduct({
            ...data,
            guildId,
            isAvailable: data.isAvailable ?? true,
            emoji: data.emoji ?? "",
        });
        revalidateTag("product-list");
        return { success: true, product: JSON.parse(JSON.stringify(product)) };
    } catch (error: any) {
        console.error("Failed to create product:", error);
        return {
            success: false,
            error: error.message || "Failed to create product",
        };
    }
}

export async function updateProductAction(id: string, data: any) {
    try {
        await connectToDatabase();
        const product = await ProductDAL.updateProductById({
            _id: id as any,
            ...data,
        });
        revalidateTag("product-list");
        return { success: true, product: JSON.parse(JSON.stringify(product)) };
    } catch (error: any) {
        console.error("Failed to update product:", error);
        return {
            success: false,
            error: error.message || "Failed to update product",
        };
    }
}

export async function deleteProductAction(id: string, guildId: string) {
    try {
        await connectToDatabase();
        const product = await ProductDAL.getProductById(id);

        if (product && product.qdrant_point_id) {
            await deleteVectorsByPayloadMatch("productId", id);
        }

        await ProductDAL.deleteSingleProduct(id, guildId);
        revalidateTag("product-list");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to delete product:", error);
        return {
            success: false,
            error: error.message || "Failed to delete product",
        };
    }
}

export async function trainProductsAction(productIds: string[]) {
    try {
        await connectToDatabase();
        // Set all selected products to "training" status
        await ProductModel.updateMany(
            { _id: { $in: productIds } },
            { $set: { training_status: "training" } },
        );
        revalidateTag("product-list");

        // Actually embed product data into Qdrant
        for (const id of productIds) {
            try {
                const product = await ProductDAL.getProductById(id);
                if (!product) continue;

                // Prepare text for embedding: name + description (relevant fields only)
                const trainingText = `Product: ${product.name}\nDescription: ${product.description || ""}`;

                // Generate embeddings via Vercel AI SDK
                const embeddings = await generateEmbeddings(trainingText);

                if (product.qdrant_point_id) {
                    await deleteVectorsByPayloadMatch("productId", id);
                }

                // Upsert to Qdrant
                const pointId = product.qdrant_point_id || crypto.randomUUID();

                for (let i = 0; i < embeddings.length; i++) {
                    const chunkPointId =
                        embeddings.length === 1 ? pointId : crypto.randomUUID();
                    await upsertVector(chunkPointId, embeddings[i].vector, {
                        type: "product",
                        productId: id,
                        guildId: product.guildId,
                        name: product.name,
                        chunkText: embeddings[i].text,
                        chunkIndex: i,
                        totalChunks: embeddings.length,
                    });
                }

                await ProductModel.findByIdAndUpdate(id, {
                    training_status: "trained",
                    trained_at: new Date(),
                    qdrant_point_id: pointId,
                });
            } catch (err) {
                console.error(`Failed to train product ${id}:`, err);
                await ProductModel.findByIdAndUpdate(id, {
                    training_status: "failed",
                });
            }
        }

        revalidateTag("product-list");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to train products:", error);
        return {
            success: false,
            error: error.message || "Failed to train products",
        };
    }
}
