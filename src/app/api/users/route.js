// app/api/users/route.js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { requirePermissionApi } from "@/lib/serverPermissions";
import { Actions, Resources } from "@/lib/permissions";

export async function GET(req) {
    const errorResponse = await requirePermissionApi(req, Resources.USERS, Actions.VIEW);
    if (errorResponse) return errorResponse;

    await connectDB();
    try {
        const { searchParams } = new URL(req.url);
        const role = searchParams.get('role') || undefined
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')

        const filter = role ? { role } : {}
        const skip = (page - 1) * limit

        const [users, totalCount] = await Promise.all([
            User.find(filter).skip(skip).limit(limit).select('-password'),
            User.countDocuments(filter)
        ])

        if (!users || users.length === 0) {
            return NextResponse.json({
                success: true,
                message: "Users data is empty.",
                data: []
            });
        }
        return NextResponse.json({
            success: true,
            data: users,
            totalCount: totalCount
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch users',
            error: error.message
        }, { status: 500 });
    }
}

export async function POST(req) {
    const errorResponse = await requirePermissionApi(req, Resources.USERS, Actions.ADD);
    if (errorResponse) return errorResponse;

    await connectDB();

    try {
        const body = await req.json();

        // check existing user
        const existing = await User.findOne({ email: body.email });
        if (existing) {
            return NextResponse.json({
                success: false,
                message: 'Email already exists'
            }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        // Create user with hashed password
        const user = await User.create({
            ...body,
            password: hashedPassword
        });

        return NextResponse.json({
            success: true,
            data: user
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: 'Failed to create user',
            error: err.message
        }, { status: 500 });
    }
}