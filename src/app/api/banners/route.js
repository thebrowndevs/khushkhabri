// /app/api/banners/route.js
import { connectDB } from "@/lib/mongodb";
import Banner from "@/models/bannerModel";
import { NextResponse } from "next/server";

// GET all banners
export async function GET() {
  try {
    await connectDB();
    const banners = await Banner.find().sort({ updatedAt: -1 });
    return NextResponse.json({ data: banners });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST a new banner
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Basic validation (optional)
    if (!body.image || !body.page) {
      return NextResponse.json(
        { error: "Image and page are required." },
        { status: 400 }
      );
    }

    const newBanner = await Banner.create(body);
    return NextResponse.json(
      { success: true, data: newBanner },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
