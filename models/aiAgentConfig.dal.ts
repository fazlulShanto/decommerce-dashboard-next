import mongoose, { type InferSchemaType } from "mongoose";

const agentConfigSchema = new mongoose.Schema(
    {
        guildId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        systemPrompt: {
            type: String,
            default:
                "You are a helpful AI assistant in a Discord server. Be friendly, concise, and helpful. Use the provided memory context about users to personalize your responses.",
        },
        chatModel: {
            type: String,
            default: process.env.DEFAULT_CHAT_MODEL,
        },
        embeddingModel: {
            type: String,
            default: process.env.DEFAULT_EMBEDDING_MODEL,
        },
        fallbackModel: {
            type: String,
            default: "cogito-2.1:671b",
        },
        temperature: {
            type: Number,
            default: 0.7,
            min: 0,
            max: 2,
        },
        topP: {
            type: Number,
            default: 0.5,
            min: 0,
            max: 2,
        },
        retriverScroreThreshold: {
            type: Number,
            default: 0.5,
            min: 0,
            max: 1,
        },
        retriverTopK: {
            type: Number,
            default: 4,
            min: 0,
            max: 10,
        },
    },
    { timestamps: true },
);

export type AgentConfig = InferSchemaType<typeof agentConfigSchema> & {
    _id: mongoose.Types.ObjectId;
};

// Check if the model exists before creating it
export const AgentConfigModel =
    mongoose.models.AgentConfig ||
    mongoose.model("AgentConfig", agentConfigSchema);

export const AgentConfigDAL = {
    /**
     * Get or create agent config for a guild.
     */
    getOrCreateAgentConfig: async (guildId: string): Promise<AgentConfig> => {
        let config = await AgentConfigModel.findOne({ guildId });
        if (!config) {
            config = await AgentConfigModel.create({ guildId });
        }
        return JSON.parse(JSON.stringify(config)) as AgentConfig;
    },

    /**
     * Update agent config for a guild.
     */
    updateAgentConfigByGuildId: async (
        guildId: string,
        data: Partial<AgentConfig>,
    ): Promise<AgentConfig | null> => {
        const config = await AgentConfigModel.findOneAndUpdate(
            { guildId },
            { $set: data },
            { new: true, upsert: true },
        );
        return JSON.parse(JSON.stringify(config)) as AgentConfig;
    },
};

/**
 * Get or create agent config for a guild (Legacy).
 */
export async function getOrCreateAgentConfig(
    guildId: string,
): Promise<AgentConfig> {
    return AgentConfigDAL.getOrCreateAgentConfig(guildId);
}
