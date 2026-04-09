// app/api/orders/getOrder/route.js or route.ts (Next.js App Router)
import { NextResponse } from "next/server";
import Order from "@/models/orderModel";
import { connectDB } from "@/lib/mongodb";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "orderId is required" },
        { status: 400 }
      );
    }

    const order = await Order.findOne({ orderId });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ data: order }, { status: 200 });
  } catch (error) {
    console.error("POST /getOrder Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
