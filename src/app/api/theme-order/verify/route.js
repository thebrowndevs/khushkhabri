// // POST /api/theme-order/verify
// // Verifies Razorpay payment signature and marks order as paid
// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Order from "@/models/orderModel";
// import User from "@/models/userModel";
// import crypto from "crypto";

// export async function POST(req) {
//   await connectDB();

//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

//     // Verify signature
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expected = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expected !== razorpay_signature) {
//       return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
//     }

//     // Update order
//     const order = await Order.findOneAndUpdate(
//       { razorpayOrderId: razorpay_order_id },
//       {
//         $set: {
//           status: "paid",
//           paymentId: razorpay_payment_id,
//           paymentDate: new Date(),
//         },
//       },
//       { new: true }
//     );

//     if (!order) {
//       return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
//     }

//     // Push order to user's orders array
//     await User.findByIdAndUpdate(order.user, {
//       $addToSet: { orders: order._id },
//     });

//     return NextResponse.json({ success: true, order });
//   } catch (err) {
//     console.error("Payment verification error:", err);
//     return NextResponse.json({ error: "Verification failed" }, { status: 500 });
//   }
// }



// POST /api/theme-order/verify

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/orderModel";
import User from "@/models/userModel";
import { generateOrderId } from "@/lib/services/generateOrderId";
import crypto from "crypto";

export async function POST(req) {
  await connectDB();

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      themeName,
      userId,
      amount,
    } = await req.json();

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
    }

    // ✅ Generate simple ID
    const orderId = await generateOrderId();

    // ✅ Create order ONLY AFTER PAYMENT
    const order = await Order.create({
      orderId,
      user: userId,
      themeName,
      orderValue: amount,
      totalAmount: amount,
      razorpayOrderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      status: "paid",
      paymentDate: new Date(),
    });

    // Add to user
    await User.findByIdAndUpdate(userId, {
      $addToSet: { orders: order._id },
    });

    return NextResponse.json({ success: true, order });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}