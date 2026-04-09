// api/order/[id]/payment/route.js
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/orderModel";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const { paymentStatus, paymentMessage, paymentDate } = await req.json();

    if (!paymentStatus || !paymentDate) {
      return NextResponse.json(
        {
          success: false,
          message: "Order ID, payment date and payment status are required",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        paymentStatus,
        paymentDate,
        ...(paymentMessage && { paymentMessage }),
      },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedOrder },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
