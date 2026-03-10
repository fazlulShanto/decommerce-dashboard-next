"use server";

import connectToDatabase from "@/lib/mongodb";
import { OrderDAL } from "@/models/order.dal";
import { revalidateTag } from "next/cache";

export async function updateOrderAction(id: string, data: any) {
    try {
        await connectToDatabase();
        const order = await OrderDAL.updateOrder(id, data);
        revalidateTag("order-list");
        return { success: true, order: JSON.parse(JSON.stringify(order)) };
    } catch (error: any) {
        console.error("Failed to update order:", error);
        return {
            success: false,
            error: error.message || "Failed to update order",
        };
    }
}

export async function deleteOrderAction(id: string) {
    try {
        await connectToDatabase();
        await OrderDAL.deleteOrder(id);
        revalidateTag("order-list");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to delete order:", error);
        return {
            success: false,
            error: error.message || "Failed to delete order",
        };
    }
}

export async function deleteBulkOrderAction(ids: string[]) {
    try {
        await connectToDatabase();
        await OrderDAL.deleteBulkOrderById(ids as [string]);
        revalidateTag("order-list");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to delete bulk orders:", error);
        return {
            success: false,
            error: error.message || "Failed to delete bulk orders",
        };
    }
}

export async function createOrderAction(data: any, guildId: string) {
    try {
        await connectToDatabase();
        const order = await OrderDAL.createOrder({
            ...data,
            guildId,
            paymentAmount: data.paymentAmount ?? data.price,
            confirmationStatus: "pending",
            deliveryStatus: "pending",
            paymentStatus: "pending",
            deliveryInfo: "",
        });
        revalidateTag("order-list");
        return { success: true, order: JSON.parse(JSON.stringify(order)) };
    } catch (error: any) {
        console.error("Failed to create order:", error);
        return {
            success: false,
            error: error.message || "Failed to create order",
        };
    }
}
