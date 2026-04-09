import { connectDB } from "../mongodb";
import Order from "@/models/orderModel";
import User from "@/models/userModel";

export async function getOrderById(id) {
  try {
    await connectDB();
    const order = await Order.findById(id)
      .sort({ createdAt: -1 })
      .populate("user");

    return order ? JSON.parse(JSON.stringify(order)) : null;
  } catch (error) {
    console.error("Error fetching Sub Service", error);
    return null;
  }
}
