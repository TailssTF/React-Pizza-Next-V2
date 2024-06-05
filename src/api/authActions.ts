"use server";
import { signIn } from "@/auth";
import axios from "axios";
import * as bcrypt from "bcrypt";
import { redirect } from "next/navigation";

const xanoUrl = process.env.XANO_BASE_URL;

interface IUser {
  email: string;
  password: string;
}

export async function login(state: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
  } catch (error: any) {
    return JSON.stringify(error);
  }
}

export async function registerUser(user: IUser) {
  const { data } = await axios.post(`${xanoUrl}/auth/signup`, {
    email: user.email,
    password: await bcrypt.hash(user.password, 10),
  });
  return JSON.stringify(data);
}
