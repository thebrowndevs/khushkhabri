// // POST /api/theme-order/create
// // Creates a Razorpay order and saves a pending order in DB
// export const runtime = "nodejs";
// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Theme from "@/models/themeModel";
// import Order from "@/models/orderModel";
// import { generateOrderId } from "@/lib/services/generateOrderId";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import Razorpay from "razorpay";

// let razorpay;
// if (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
//   razorpay = new Razorpay({
//     key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
//   });
// }

// export async function POST(req) {
//   if (!razorpay) {
//     return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 });
//   }

//   await connectDB();

//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { themeName, userId } = await req.json();

//     if (!themeName || !userId) {
//       return NextResponse.json({ error: "themeName and userId are required" }, { status: 400 });
//     }

//     // Validate theme
//     const theme = await Theme.findOne({ name: themeName, isActive: true });
//     if (!theme) {
//       return NextResponse.json({ error: "Theme not found or inactive" }, { status: 404 });
//     }

//     const amount = theme.price;

//     // Create Razorpay order
//     const razorpayOrder = await razorpay.orders.create({
//       amount: Math.round(amount * 100), // paise
//       currency: "INR",
//       receipt: `theme_${Date.now()}`,
//       payment_capture: 1,
//     });

//     // Save order in DB
//     const orderId = await generateOrderId();
//     const newOrder = await Order.create({
//       orderId,
//       user: userId,
//       themeName,
//       orderValue: amount,
//       discount: 0,
//       totalAmount: amount,
//       razorpayOrderId: razorpayOrder.id,
//       status: "created",
//     });

//     return NextResponse.json({
//       success: true,
//       razorpayOrderId: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//       dbOrderId: newOrder._id,
//       orderId: newOrder.orderId,
//     });
//   } catch (err) {
//     console.error("Theme order creation error:", err);
//     return NextResponse.json({ error: `Failed to create order: ${err?.message || JSON.stringify(err)}` }, { status: 500 });
//   }
// }


// POST /api/theme-order/create
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Theme from "@/models/themeModel";
import Razorpay from "razorpay";

let razorpay;
if (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

export async function POST(req) {
  if (!razorpay) {
    return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 });
  }

  await connectDB();

  try {
    const { themeName } = await req.json();

    const theme = await Theme.findOne({ name: themeName, isActive: true });
    if (!theme) {
      return NextResponse.json({ error: "Theme not found" }, { status: 404 });
    }

    const amount = theme.price;

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `theme_${Date.now()}`,
      payment_capture: 1,
    });

    return NextResponse.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      themeName, // 👈 important (verify me use hoga)
    });

  } catch (err) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
