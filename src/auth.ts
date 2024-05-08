import NextAuth, { NextAuthConfig } from "next-auth";
import "next-auth/jwt";
// import EmailProvider from "next-auth/providers/email";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
});

// export const config: NextAuthConfig = {
//   providers: [
//     // EmailProvider({
//     //   server: process.env.MAIL_SERVER,
//     //   from: "NextAuth.js <no-reply@example.com",
//     // }),
//     GitHub,
//     Google,
//   ],
//   basePath: "/api/auth",
//   callbacks: {
//     jwt({ token, trigger, session }) {
//       if (trigger === "update") token.name = session.user.name;
//       return token;
//     },
//     async session({ session, token }) {
//       session.accessToken = token.accessToken;
//       return session;
//     },
//   },
// };

// export const { handlers, auth, signIn, signOut } = NextAuth(config);

// declare module "next-auth" {
//   interface Session {
//     accessToken?: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     accessToken?: string;
//   }
// }
