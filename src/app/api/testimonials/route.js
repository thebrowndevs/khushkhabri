// api/testimonials/route.js

import { connectDB } from "@/lib/mongodb";
import { Resources } from "@/lib/permissions";
import Testimonial from "@/models/testimonialModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);

        const isVisible = searchParams.get('isVisible');
        const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
        const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10')));

        const filter = {};

        // Build filter object
        if (isVisible && isVisible !== 'all') {
            filter.isVisible = isVisible;
        }

        const skip = (page - 1) * limit;

        const [testimonials, totalCount] = await Promise.all([
            Testimonial.find(filter)
                .sort({ updatedAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Testimonial.countDocuments(filter)
        ]);

        return NextResponse.json({
            success: true,
            data: testimonials,
            totalCount: totalCount,
            pagination: {
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit),
                hasNextPage: page < Math.ceil(totalCount / limit),
                hasPrevPage: page > 1
            }
        }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        await connectDB();

        // Check for existing tags
        if (body.userName && body.company) {
            const existing = await Testimonial.findOne({
                userName: body.userName,
                company: body.company,
            });

            if (existing) {
                throw new Error("Testimonial from this user at the same company already exists.");
            }
        }

        const newTestimonial = await Testimonial.create(body);
        return NextResponse.json({ success: true, testimonial: newTestimonial }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}