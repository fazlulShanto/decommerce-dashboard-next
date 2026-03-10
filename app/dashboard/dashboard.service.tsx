import connectToDatabase from "@/lib/mongodb";
import { OrderDAL, OrderData, OrderDocument } from "@/models/order.dal";
import { ProductDAL } from "@/models/product.dal";
import { KnowledgeDAL, KnowledgeData } from "@/models/knowledge.dal";
import { AgentConfigDAL } from "@/models/aiAgentConfig.dal";
import { unstable_cache } from "next/cache";

export const getAgentConfig = unstable_cache(
  async (guildId) => {
    await connectToDatabase();
    return await AgentConfigDAL.getOrCreateAgentConfig(guildId);
  },
  ["agent-config"],
  {
    revalidate: 60 * 1000,
    tags: ["agent-config"],
  },
);

export const getProductList = unstable_cache(
  async (guildId) => {
    await connectToDatabase();
    const data = await ProductDAL.getProductsByGuildId(guildId);
    return data.map((product) => JSON.parse(JSON.stringify(product.toJSON())));
  },
  ["product-list"],
  {
    revalidate: 30 * 1000, // in seconds
    tags: ["product-list"],
  },
);

export const getOrderList = unstable_cache(
  async (guildId) => {
    await connectToDatabase();
    const data = await OrderDAL.getOrdersByGuildId(guildId);
    return data.map((order) => JSON.parse(JSON.stringify(order.toJSON())) as OrderData);
  },
  ["order-list"],
  {
    revalidate: 30 * 1000, // in seconds
    tags: ["order-list"],
  },
);

export const getKnowledgeList = unstable_cache(
  async (guildId) => {
    await connectToDatabase();
    const data = await KnowledgeDAL.getKnowledgeByGuildId(guildId);
    return data.map((k) => JSON.parse(JSON.stringify(k.toJSON())) as KnowledgeData);
  },
  ["knowledge-list"],
  {
    revalidate: 30 * 1000,
    tags: ["knowledge-list"],
  },
);

export const getCustomerList = unstable_cache(
  async (guildId) => {
    await connectToDatabase();
    const data = await ProductDAL.getProductsByGuildId(guildId);
    return data.map((product) => JSON.parse(JSON.stringify(product.toJSON())));
  },
  ["customer-list"],
  {
    revalidate: 30 * 1000, // in seconds
    tags: ["customer-list"],
  },
);

