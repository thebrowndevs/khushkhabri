// /api/dashboard/orders-status-summary
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/orderModel";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const orders = await Order.find({});

    const summary = {
      website: { new: 0, inProcess: 0, delivered: 0, cancelled: 0 },
      pos: { new: 0, inProcess: 0, delivered: 0, cancelled: 0 },
    };

    for (const order of orders) {
      const { type } = order;
      const latestStatus =
        order.status?.[order.status.length - 1]?.currentStatus || "New";

      if (latestStatus === "New") {
        summary[type].new++;
      } else if (
        ["Processing", "Packed", "Shipped", "Ready for delivery"].includes(
          latestStatus
        )
      ) {
        summary[type].inProcess++;
      } else if (latestStatus === "Delivered") {
        summary[type].delivered++;
      } else if (latestStatus === "cancelled") {
        summary[type].cancelled++;
      }
    }

    return NextResponse.json(summary);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching order summary" },
      { status: 500 }
    );
  }
}
