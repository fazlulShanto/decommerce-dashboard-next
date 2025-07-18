import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import { ProductDAL, ProductModel } from "@/models/product.dal";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const guildId = request.nextUrl.searchParams.get("id");
    if (!guildId) {
      return NextResponse.json(
        {
          success: false,
          message: "Guild ID is required",
          guildId,
        },
        { status: 400 },
      );
    }
    const products = await ProductDAL.getProductsByGuildId(guildId);

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error("Database connection failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
