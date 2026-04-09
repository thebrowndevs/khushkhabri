// api/order/verify/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    await req.json();
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  return NextResponse.json({ valid: expected === razorpay_signature });
}
