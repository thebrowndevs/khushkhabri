
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/orderModel";

function getDateRangeArray(days) {
  const dates = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get("days") || "7", 10);

  await connectDB();

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
        count: { $sum: 1 },
      },
    },
  ]);

  // Convert to map
  const dataMap = {};
  for (const { _id, count } of agg) {
    dataMap[_id.day] = count;
  }

  const dates = getDateRangeArray(days);
  const counts = [];

  for (const date of dates) {
    counts.push(dataMap[date] || 0);
  }

  return new Response(JSON.stringify({ dates, counts }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
