"use server";
import { IAuthToken, signIn } from "@/auth";
import axios from "axios";
import * as bcrypt from "bcrypt";
import { redirect } from "next/navigation";

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
  } catch (error: any) {
    throw error;
  }
  return state;
}

export async function registerUser(formData: FormData) {
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
    await login("", formData);
  } catch (error) {
    throw error;
  }
}
