// app/api/blogs/route.js
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/blogModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const newBlog = await Blog.create(body);

        return NextResponse.json(
            { success: true, data: newBlog, },
            { status: 201 }
        )

    } catch (error) {
        console.error('POST /api/blogs error:', error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');
        const featuredParam = searchParams.get('featured');

        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');

        const filter = {};
        if (status) {
            filter.status = status;
        }
        if (featuredParam !== null) {
            filter.featured = featuredParam === 'true';
        }

        const skip = (page - 1) * limit;

        const [blogs, totalCount] = await Promise.all([
            Blog
                .find(filter)
                .sort({ updatedAt: -1 })
                .skip(skip)
                .limit(limit),
            Blog.countDocuments(filter)
        ]);

        return NextResponse.json({
            success: true,
            data: blogs,
            totalCount: totalCount,
        });
    } catch (error) {
        console.error('GET /api/blogs error:', error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}