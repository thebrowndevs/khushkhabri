// app/api/order/create/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/orderModel";
import User from "@/models/userModel";
import { generateOrderId } from "@/lib/services/generateOrderId";

export const runtime = "nodejs";

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const {
      type,
      user,
      shippingDetails,
      cart,
      orderValue,
      subTotal,
      shippingCharges,
      totalAmount,
      paymentMethod,
      paymentStatus = "pending",
      razorpayOrder,
      transactionId,
    } = body;

    if (!shippingDetails || !cart || !cart.length || !totalAmount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newOrderId = await generateOrderId();

    const newOrder = await Order.create({
      orderId: newOrderId,
      type,
      user: user,
      shippingDetails,
      cart,
      orderValue,
      subTotal,
      shippingCharges,
      totalAmount,
      paymentMethod,
      paymentStatus,
      transactionId,
      razorpayOrder,
      status: [{ currentStatus: "New", message: "Order received" }],
    });

    const updatedUserData = await User.findByIdAndUpdate(
      user,
      { $push: { orders: newOrder._id } },
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      { success: true, orderDetails: newOrder, user: updatedUserData },
      { status: 201 }
    );
  } catch (err) {
    console.error("Order creation error:", err);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
