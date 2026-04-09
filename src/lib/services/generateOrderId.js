// import Order from "@/models/orderModel";
// import { format } from "date-fns";

// export async function generateOrderId() {
//   const today = format(new Date(), "yyMMdd"); // e.g. 250723
//   const startOfDay = new Date();
//   startOfDay.setHours(0, 0, 0, 0);

//   const endOfDay = new Date();
//   endOfDay.setHours(23, 59, 59, 999);

//   const orderCountToday = await Order.countDocuments({
//     createdAt: { $gte: startOfDay, $lte: endOfDay },
//   });

//   const serial = String(orderCountToday + 1).padStart(4, "0"); // e.g. 0001
//   return `TRV-${today}-${serial}`;
// }


import Order from "@/models/orderModel";

export async function generateOrderId() {
  const count = await Order.countDocuments({ status: "paid" });
  return count + 1; // 1,2,3...
}
