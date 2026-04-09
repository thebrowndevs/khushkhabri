import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
    const path = req.nextUrl.pathname;

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Admin route protection
    
    if (path.startsWith('/admin')) {
        if (!session) {
            return NextResponse.redirect(new URL('/auth', req.url));
        }

        if (!['admin', 'sub-admin'].includes(session.role)) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    // User route protection
    if (path.startsWith('/user')) {
        if (!session) {
            return NextResponse.redirect(new URL('/', req.url));
        }

        if (session.role !== 'user') {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/user/:path*'],
};
