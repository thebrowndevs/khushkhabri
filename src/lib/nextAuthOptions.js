// lib/nextAuthOptions.js

export const authOptions = {
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;

                const maxAge = user.role === 'user' ? 60 * 60 * 24 * 30 : 60 * 30;
                token.exp = Math.floor(Date.now() / 1000) + maxAge;
            }
            return token;
        },

        async session({ session, token }) {
            session.user = { id: token.id, role: token.role };
            return session;
        }
    }
};
