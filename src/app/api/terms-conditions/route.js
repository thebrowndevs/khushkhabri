

import { connectDB } from "@/lib/mongodb";
import TermsConditions from "@/models/termsConditionsModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const doc = await TermsConditions.find().lean();
        if (!doc) {
            return NextResponse.json({ data: null }, { status: 200 });
        }

        return NextResponse.json({ data: doc }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        await connectDB();

        const data = await TermsConditions.create(body);
        return NextResponse.json({ success: true, data }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}
