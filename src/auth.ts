import NextAuth, { NextAuthConfig } from "next-auth";
import "next-auth/jwt";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const xanoUrl = process.env.XANO_BASE_URL;

const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: {
      label: "Email",
      type: "email",
    },
    password: {
      label: "Пароль",
      type: "password",
    },
  },
  async authorize(credentials) {
    const user = await axios.post(`${xanoUrl}/auth/login`, credentials);

    if (!user) {
      throw new Error("Ошибка авторизации");
    }

    return user.data;
  },
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, credentialsConfig],
});
