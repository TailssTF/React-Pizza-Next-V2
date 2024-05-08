"use client";
// import { signIn, signOut } from "@/auth";
import { signIn, signOut } from "next-auth/react";

export function SignIn() {
  return (
    <button className="button ml-2" onClick={() => signIn()}>
      Войти
    </button>
  );
}

export function SignOut() {
  return (
    <button className="button ml-2" onClick={() => signOut()}>
      Выйти
    </button>
  );
}
