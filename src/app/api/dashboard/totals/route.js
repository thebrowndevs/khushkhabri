import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/categoryModel";
import User from "@/models/userModel";
import Blog from "@/models/blogModel";

export async function GET() {
  try {
    await connectDB();

    // Fetch counts in parallel
    const [categoriesCount, usersCount, blogsCount] =
      await Promise.all([
        Category.countDocuments(),
        User.countDocuments({ role: "user" }),
        Blog.countDocuments(),
      ]);

    return NextResponse.json({
      categoriesCount,
      servicesCount: 0,
      usersCount,
      blogsCount,
    });
  } catch (error) {
    console.error("Totals API Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
