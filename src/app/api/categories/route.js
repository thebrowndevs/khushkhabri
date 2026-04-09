import { connectDB } from "@/lib/mongodb";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";

// GET all categorys
export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ updatedAt: -1 });
    return NextResponse.json({ data: categories });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST a new Category
export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();

    // Check for existing name or slug
    if (body.name || body.slug) {
      const existing = await Category.findOne({
        $or: [{ name: body.name }, { slug: body.slug }],
      });

      if (existing) {
        throw new Error(
          "Category with this name or slug already exists. Please use a unique value."
        );
      }
    }

    const newCollection = await Category.create(body);
    return NextResponse.json(
      { success: true, Category: newCollection },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
