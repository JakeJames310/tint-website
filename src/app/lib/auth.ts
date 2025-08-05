import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { createOrUpdateCustomer } from "./airtable";

export const config: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Create or update customer in Airtable
          const airtableRecord = await createOrUpdateCustomer({
            email: user.email!,
            name: user.name!,
            googleId: user.id || "",
            profilePicture: user.image || "",
          });
          
          // Store Airtable ID in user object for session
          const userWithAirtable = user as typeof user & { airtableId: string };
          userWithAirtable.airtableId = airtableRecord.id;
          
          return true;
        } catch (error) {
          console.error("Error saving to Airtable:", error);
          // Still allow sign in even if Airtable fails
          return true;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        const userWithAirtable = user as typeof user & { airtableId?: string };
        return {
          ...token,
          googleId: user.id,
          airtableId: userWithAirtable.airtableId,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (session.user) {
        const sessionUser = session.user as typeof session.user & { 
          googleId?: string; 
          airtableId?: string; 
        };
        sessionUser.googleId = token.googleId as string | undefined;
        sessionUser.airtableId = token.airtableId as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);