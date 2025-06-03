import Google from "next-auth/providers/google";
import NextAuth from "next-auth";

export const { handlers } = NextAuth({
  providers: [Google],
});
