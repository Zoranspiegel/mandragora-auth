import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const { handlers } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        name: {},
        email: {},
        password: {},
      },
      authorize: (credentials) => {
        const userMock = {
          name: "Zoran",
          email: "admin@admin.com",
          password: "Q1w2e3?",
        };

        if (
          credentials.name === userMock.name &&
          credentials.email === userMock.email &&
          credentials.password === userMock.password
        ) {
          return userMock;
        } else {
          return null;
        }
      },
    }),
  ],
});
