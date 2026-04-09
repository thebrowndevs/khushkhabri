// app/api/auth/permissions/route.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/userModel';

export async function GET(req) {
    // 1) grab the NextAuth JWT from the cookie
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.id) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // 2) fetch the user fresh from the DB
    await connectDB();
    const user = await User.findById(token.id).lean();
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 3) return only the piece we need
    return NextResponse.json({
        id: user._id,
        role: user.role,
        permissions: user.permissions || {},
    });
}
