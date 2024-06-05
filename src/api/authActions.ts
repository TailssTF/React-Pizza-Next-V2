"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const xanoUrl = process.env.XANO_BASE_URL;

export async function login(state: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirectTo: "/",
    });
    return undefined;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const { type, cause } = error as AuthError;
      switch (type) {
        case "CredentialsSignin":
          return "Некорректные данные.";
        case "CallbackRouteError":
          return cause?.err?.toString();
        default:
          return "Произошла ошибка.";
      }
    }
    throw error;
  }
}

export async function registerUser(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await fetch(`${xanoUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    await login("", formData);
  } catch (error) {
    throw error;
  }
}
