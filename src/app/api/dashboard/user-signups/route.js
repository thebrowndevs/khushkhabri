import { connectDB } from "@/lib/mongodb";
import User from "@/models/userModel"; // Make sure the User schema has a createdAt field
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const days = parseInt(searchParams.get("days") || "28");

        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days + 1);

        // Fetch all users created within the range
        const users = await User.find({
            createdAt: {
                $gte: startDate,
                $lte: endDate,
            },
        }).select("createdAt");

        // Create an array for each day
        const dateMap = {};
        for (let i = 0; i < days; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            const key = date.toISOString().split("T")[0]; // 'YYYY-MM-DD'
            dateMap[key] = 0;
        }

        // Count users by created date
        users.forEach((user) => {
            const key = user.createdAt.toISOString().split("T")[0];
            if (dateMap[key] !== undefined) {
                dateMap[key]++;
            }
        });

        const dates = Object.keys(dateMap);
        const counts = Object.values(dateMap);

        return NextResponse.json({ dates, counts });
    } catch (err) {
        console.error("Error fetching user signups:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
