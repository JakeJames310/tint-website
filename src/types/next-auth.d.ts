import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      googleId?: string;
      airtableId?: string;
    } & DefaultSession["user"];
  }

  interface User {
    googleId?: string;
    airtableId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    googleId?: string;
    airtableId?: string;
  }
}