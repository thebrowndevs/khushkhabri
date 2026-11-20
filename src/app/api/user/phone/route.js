import { connectDB } from "@/lib/mongodb";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id && !session?.user?.email) {
            return NextResponse.json(
                { success: false, message: "Unauthorized. Please log in." },
                { status: 401 }
            );
        }

        const body = await req.json();
        let { phone } = body;

        if (!phone) {
            return NextResponse.json(
                { success: false, message: "WhatsApp number is required." },
                { status: 400 }
            );
        }

        // Clean phone number (remove spaces, dashes, leading +91 or 0)
        phone = phone.toString().trim().replace(/\D/g, "");
        if (phone.length === 12 && phone.startsWith("91")) {
            phone = phone.slice(2);
        } else if (phone.length === 11 && phone.startsWith("0")) {
            phone = phone.slice(1);
        }

        if (!/^\d{10}$/.test(phone)) {
            return NextResponse.json(
                { success: false, message: "Please enter a valid 10-digit WhatsApp number." },
                { status: 400 }
            );
        }

        await connectDB();

        // Check if phone number is already registered by another user
        const existingPhoneUser = await User.findOne({
            phone,
            _id: { $ne: session.user.id }
        });

        if (existingPhoneUser) {
            return NextResponse.json(
                { success: false, message: "This mobile number is already linked to another account." },
                { status: 400 }
            );
        }

        // Find user by session id or email
        let user = null;
        if (session.user.id) {
            user = await User.findById(session.user.id);
        }
        if (!user && session.user.email) {
            user = await User.findOne({ email: session.user.email });
        }

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User account not found." },
                { status: 404 }
            );
        }

        user.phone = phone;
        await user.save();

        return NextResponse.json({
            success: true,
            message: "Phone number updated successfully.",
            phone: user.phone
        });
    } catch (error) {
        console.error("Error updating user phone:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Failed to update phone number." },
            { status: 500 }
        );
    }
}
