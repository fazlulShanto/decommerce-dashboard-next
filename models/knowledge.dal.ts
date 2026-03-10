import mongoose from "mongoose";

const knowledgeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        content: { type: String, default: "" },
        fileUrl: { type: String, default: null },
        fileKey: { type: String, default: null },
        source: {
            type: String,
            enum: ["created", "uploaded"],
            default: "created",
        },
        charCount: { type: Number, default: 0 },
        training_status: {
            type: String,
            enum: ["not_trained", "training", "trained", "failed"],
            default: "not_trained",
        },
        qdrant_point_id: { type: String, default: null },
        trained_at: { type: Date, default: null },
        guildId: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

export interface KnowledgeDocument extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    content: string;
    fileUrl: string | null;
    fileKey: string | null;
    source: "created" | "uploaded";
    charCount: number;
    training_status: "not_trained" | "training" | "trained" | "failed";
    qdrant_point_id: string | null;
    trained_at: Date | null;
    guildId: string;
    createdAt: Date;
    updatedAt: Date;
}

export type KnowledgeData = {
    _id: string;
    name: string;
    content: string;
    fileUrl: string | null;
    fileKey: string | null;
    source: "created" | "uploaded";
    charCount: number;
    training_status: "not_trained" | "training" | "trained" | "failed";
    qdrant_point_id: string | null;
    trained_at: string | null;
    guildId: string;
    createdAt: string;
    updatedAt: string;
};

const KnowledgeModel =
    mongoose.models.knowledge ||
    mongoose.model<KnowledgeDocument>("knowledge", knowledgeSchema);

const KnowledgeDAL = {
    createKnowledge: async (
        data: Omit<KnowledgeDocument, "createdAt" | "updatedAt" | "_id">,
    ): Promise<KnowledgeDocument> => {
        return KnowledgeModel.create(data);
    },

    updateKnowledgeById: async (
        id: string,
        data: Partial<KnowledgeDocument>,
    ): Promise<KnowledgeDocument | null> => {
        return KnowledgeModel.findByIdAndUpdate(id, data, { new: true });
    },

    getKnowledgeByGuildId: async (
        guildId: string,
    ): Promise<KnowledgeDocument[]> => {
        return KnowledgeModel.find({ guildId }).sort({ createdAt: -1 });
    },

    getKnowledgeById: async (id: string): Promise<KnowledgeDocument | null> => {
        return KnowledgeModel.findById(id);
    },

    deleteKnowledge: async (
        id: string,
        guildId: string,
    ): Promise<KnowledgeDocument | null> => {
        return KnowledgeModel.findOneAndDelete({ _id: id, guildId });
    },
};

export { KnowledgeDAL, KnowledgeModel };
