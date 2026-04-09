// /app/api/banners/[id]/route.js
import { connectDB } from "@/lib/mongodb";
import Banner from "@/models/bannerModel";
import { NextResponse } from "next/server";

// DELETE a banner by ID
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const deleted = await Banner.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: "Banner deleted successfully" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
