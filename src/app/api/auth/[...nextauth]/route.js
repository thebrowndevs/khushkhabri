import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodbClient';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    session: { strategy: 'jwt' },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: "user", // Default new Google users to "user" role
                }
            }
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize({ email, password }) {
                await import('@/lib/mongodb').then(m => m.connectDB());
                const user = await User.findOne({ email }).select('+password');
                if (!user) throw new Error('No user found');
                if (!["admin", "sub-admin"].includes(user.role)) throw new Error("Not authorized");
                const valid = await bcrypt.compare(password, user.password);
                if (!valid) throw new Error('Invalid credentials');
                return { id: user._id.toString(), role: user.role, phone: user.phone };
            }
        }),
        CredentialsProvider({
            id: 'otp',
            name: 'Phone OTP',
            credentials: {
                phone: { label: 'Phone', type: 'text' },
                sessionId: { label: 'Session ID', type: 'text' },
                otp: { label: 'OTP', type: 'text' }
            },
            async authorize({ phone, sessionId, otp }) {
                try {
                    await import('@/lib/mongodb').then(m => m.connectDB());
                    console.log(sessionId)
                    console.log(otp)
                    // Validate phone format
                    if (!phone || !/^\d{10}$/.test(phone)) {
                        throw new Error('Invalid phone number');
                    }

                    let user = await User.findOne({ phone });

                    // Prevent admin login through this flow
                    if (user && user.role !== 'user') {
                        throw new Error('Invalid user: Admin must use email login');
                    }

                    if (!user) {
                        user = await User.create({ phone, role: 'user' });
                    }

                    return {
                        id: user._id.toString(),
                        role: user.role,
                        phone: user.phone
                    };
                } catch (error) {
                    console.error('OTP Auth Error:', error);
                    throw new Error(error.message || 'Could not authenticate');
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.phone = user.phone;
                token.name = user.name;
                token.email = user.email;
                token.picture = user.image;

                const maxAge = user.role === 'user' ? 60 * 60 * 24 * 30 : 60 * 30;
                token.exp = Math.floor(Date.now() / 1000) + maxAge;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id,
                role: token.role,
                phone: token.phone,
                name: token.name,
                email: token.email,
                image: token.picture
            };
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };