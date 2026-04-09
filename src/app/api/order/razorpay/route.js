// app/api/order/razorpay/route.js
export const runtime = "nodejs";
import Razorpay from "razorpay";
import { NextResponse } from "next/server";

let razorpay;
if (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
}

export async function POST(request) {
  if (!razorpay) {
      return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 });
  }
  let body;
  try {
    body = await request.json();
  } catch (e) {
    console.error("Could not parse JSON body:", e);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const { amount } = body;
    if (typeof amount !== "number") {
      throw new Error("`amount` must be a number");
    }

    // Convert amount to paise (integer)
    const amountInPaise = Math.round(amount * 100);

    const options = {
      amount: amountInPaise, // Use integer value
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    // console.log('👷 Creating order with options:', options);
    const order = await razorpay.orders.create(options);
    // console.log('✅ razorpay.orders.create result:', order);

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Razorpay API Error:", {
      errorCode: error.statusCode,
      errorDetails: error.error,
    });
    return NextResponse.json(
      { error: "Payment gateway error", details: error.error },
      { status: 500 }
    );
  }
}
