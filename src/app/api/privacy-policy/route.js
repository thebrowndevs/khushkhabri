// app/api/privacy-policy/route.js

import { connectDB } from "@/lib/mongodb";
import PrivacyPolicy from "@/models/privacyPolicyModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const privacyDoc = await PrivacyPolicy.find().lean();
        if (!privacyDoc) {
            return NextResponse.json({ data: null }, { status: 200 });
        }

        return NextResponse.json({ data: privacyDoc }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        await connectDB();

        const data = await PrivacyPolicy.create(body);
        return NextResponse.json({ success: true, data }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}
