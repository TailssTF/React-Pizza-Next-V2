"use server";
import axios from "axios";
import * as bcrypt from "bcrypt";

const xanoUrl = process.env.XANO_BASE_URL;

interface IUser {
  email: string;
  password: string;
}

export async function registerUser(user: IUser) {
  const { data } = await axios.post(`${xanoUrl}/auth/signup`, {
    email: user.email,
    password: await bcrypt.hash(user.password, 10),
  });
  return JSON.stringify(data);
}
