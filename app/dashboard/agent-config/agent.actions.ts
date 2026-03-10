"use server";

import connectToDatabase from "@/lib/mongodb";
import { AgentConfigDAL } from "@/models/aiAgentConfig.dal";
import { revalidateTag } from "next/cache";

export async function updateAgentConfigAction(guildId: string, data: any) {
    try {
        await connectToDatabase();
        const config = await AgentConfigDAL.updateAgentConfigByGuildId(
            guildId,
            data,
        );

        // Revalidate the cache tag
        revalidateTag("agent-config");

        return {
            success: true,
            config: JSON.parse(JSON.stringify(config)),
        };
    } catch (error: any) {
        console.error("Failed to update agent config:", error);
        return {
            success: false,
            error: error.message || "Failed to update agent configuration",
        };
    }
}
