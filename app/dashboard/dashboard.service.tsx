import connectToDatabase from "@/lib/mongodb";
import { OrderDAL, OrderData, OrderDocument } from "@/models/order.dal";
import { ProductDAL } from "@/models/product.dal";
import { unstable_cache } from "next/cache";

export const getProductList = unstable_cache(
  async (guildId) => {
    await connectToDatabase();
    const data = await ProductDAL.getProductsByGuildId(guildId);
    return data.map((product) => product.toJSON());
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
    const orders = data.map((order) => order.toJSON() as OrderData);
    return orders;
  },
  ["order-list"],
  {
    revalidate: 30 * 1000, // in seconds
    tags: ["order-list"],
  },
);

export const getCustomerList = unstable_cache(
  async (guildId) => {
    await connectToDatabase();
    const data = await ProductDAL.getProductsByGuildId(guildId);
    return data.map((product) => product.toJSON());
  },
  ["customer-list"],
  {
    revalidate: 30 * 1000, // in seconds
    tags: ["customer-list"],
  },
);
