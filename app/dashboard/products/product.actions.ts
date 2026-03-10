"use server";

import connectToDatabase from "@/lib/mongodb";
import { ProductDAL } from "@/models/product.dal";
import { revalidateTag } from "next/cache";

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
