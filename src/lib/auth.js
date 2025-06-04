import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const { handlers } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: (credentials) => {
        const emailMock = "admin@admin.com";
        const passwordMock = "Q1w2e3?";
        console.log(credentials);
        if (
          credentials.email === emailMock &&
          credentials.password === passwordMock
        ) {
          return { email: credentials.email };
        } else {
          throw new Error("Invalid Credentials");
        }
      },
    }),
  ],
});
