import connectToDatabase from "@/lib/mongodb";
import { OrderDAL } from "@/models/order.dal";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const ids = body?.ids || [];
  if (!ids || !ids?.length) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
  try {
    await connectToDatabase();
    const deleteCount = await OrderDAL.deleteBulkOrderById(ids);
    revalidateTag("order-list");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
