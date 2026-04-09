// GET /api/themes — return all active themes
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Theme from "@/models/themeModel";

export async function GET() {
  await connectDB();
  try {
    const themes = await Theme.find({ isActive: true }).select("name price");
    return NextResponse.json({ themes }, { status: 200 });
  } catch (err) {
    console.error("Fetch themes error:", err);
    return NextResponse.json({ error: "Failed to fetch themes" }, { status: 500 });
  }
}
