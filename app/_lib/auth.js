import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getAppUser, createAppUser } from "@/app/_lib/user-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      const existingUser = await getAppUser(user.email);
      if (!existingUser) return "/login/admin";
      return true;
    },
    async session({ session }) {
      const appUser = await getAppUser(session.user.email);
      session.user.appUserId = appUser.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);

