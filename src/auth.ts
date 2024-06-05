import NextAuth, { NextAuthConfig } from "next-auth";
import "next-auth/jwt";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const xanoUrl = process.env.XANO_BASE_URL;

export interface IAuthToken {
  authToken: string;
}

const credentialsConfig = CredentialsProvider({
  name: "credentials",
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
    let errors: String[] = [];
    const res = await fetch(`${xanoUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      errors.push(message);
      throw new Error(`Ошибка авторизации: ${JSON.stringify(message)}`);
    }

    const authToken = (await res.json()) as IAuthToken;

    const userRes = await fetch(`${xanoUrl}/auth/me`, {
      method: "GET",
      headers: { Authorization: authToken.authToken },
    });

    if (!userRes.ok) {
      const { message } = await userRes.json();
      errors.push(message);
      throw new Error(`Ошибка токена авторизации: ${message}`);
    }

    const user = await userRes.json();

    return user;
  },
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, credentialsConfig],
});
