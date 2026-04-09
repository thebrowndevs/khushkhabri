import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/orderModel";

function getDateRange(days) {
  const dates = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }

  return dates;
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get("days") || "28", 10);

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    // ✅ Only PAID orders
    const agg = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: cutoff },
          status: "paid",
        },
      },
      {
        $group: {
          _id: {
            day: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
          },
          revenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const dataMap = {};
    let totalRevenue = 0;

    for (const { _id, revenue } of agg) {
      dataMap[_id.day] = revenue;
      totalRevenue += revenue;
    }

    const dates = getDateRange(days);
    const revenues = dates.map((d) => dataMap[d] || 0);

    return NextResponse.json({
      dates,
      revenues,
      totalRevenue,
    });

  } catch (error) {
    console.error("Revenue API Error:", error);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}
