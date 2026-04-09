// app/api/refund-policy/route.js

import { connectDB } from "@/lib/mongodb";
import RefundPolicy from "@/models/refundPolicyModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const refundDoc = await RefundPolicy.find().lean();
        if (!refundDoc) {
            return NextResponse.json({ data: null }, { status: 200 });
        }

        return NextResponse.json({ data: refundDoc }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        await connectDB();

        const data = await RefundPolicy.create(body);
        return NextResponse.json({ success: true, data }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}
