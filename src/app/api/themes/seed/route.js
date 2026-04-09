// POST /api/themes/seed — one-time seed for themes
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Theme from "@/models/themeModel";

const THEMES = [
  { name: "sikh", price: 4000, isActive: true },
  { name: "hindu1", price: 4000, isActive: true },
  { name: "hindu2", price: 4000, isActive: true },
  { name: "hindu3", price: 4000, isActive: true },
  { name: "gurujiSatsang", price: 4000, isActive: true },
];

export async function POST() {
  await connectDB();
  try {
    // Upsert each theme so it's safe to call multiple times
    for (const theme of THEMES) {
      await Theme.findOneAndUpdate(
        { name: theme.name },
        { $set: theme },
        { upsert: true, new: true }
      );
    }
    const allThemes = await Theme.find({});
    return NextResponse.json(
      { success: true, message: "Themes seeded successfully", themes: allThemes },
      { status: 200 }
    );
  } catch (err) {
    console.error("Seed themes error:", err);
    return NextResponse.json({ error: "Failed to seed themes" }, { status: 500 });
  }
}
