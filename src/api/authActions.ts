"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

const xanoUrl = process.env.XANO_BASE_URL;

export async function login(
  state: any,
  formData: FormData,
  isRedirect: boolean = true
) {
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const { type, cause, message } = error as AuthError;
      switch (type) {
        case "CredentialsSignin":
          return "Некорректные данные.";
        case "CallbackRouteError":
          return cause?.err?.toString();
        default:
          return `Произошла ошибка:\n${message}`;
      }
    }
    throw error;
  }

  if (isRedirect) {
    redirect("/");
  }
}

export async function registerUser(state: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await fetch(`${xanoUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const resObj = await res.json();

    if (res.ok) {
      await login("", formData, false);
    } else {
      throw new Error(resObj.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      const { type, cause, message } = error as AuthError;

      switch (type) {
        case "CredentialsSignin":
          return "Некорректные данные.";
        case "CallbackRouteError":
          return cause?.err?.toString();
        default:
          return `Произошла ошибка:\n${message}`;
      }
    }
    throw error;
  }

  redirect("/");
}
