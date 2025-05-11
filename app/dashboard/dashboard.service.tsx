import connectToDatabase from "@/lib/mongodb";
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
  }
);
