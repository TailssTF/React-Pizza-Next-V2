"use client";
import { login } from "@/api/authActions";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const Auth: React.FC = () => {
  const [state, formAction] = useFormState(login, "");

  useEffect(() => {
    if (state) {
      const stateObj = JSON.parse(state);
      if (stateObj.kind == "error") {
        alert("Ошибка авторизации");
      }
    }
  }, [state]);

  return (
    <form className="auth__form" action={formAction}>
      <div className="auth__field">
        <label htmlFor="user-email">Email: </label>
        <input
          type="email"
          id="user-email"
          name="email"
          placeholder="example@yahoo.com"
          minLength={3}
          maxLength={200}
          aria-describedby="user-email"
          aria-invalid="false"
        />
      </div>
      <div className="auth__field">
        <label htmlFor="password">Пароль: </label>
        <input
          type="password"
          id="password"
          name="password"
          minLength={3}
          maxLength={200}
          aria-describedby="user-password"
          aria-invalid="false"
          required
        />
      </div>

      <div className="auth__buttons">
        <button className="button" type="submit">
          Подтвердить
        </button>
        <Link href={"/reset"} className="button">
          Забыли пароль?
        </Link>
        <Link href={"/register"} className="button">
          Регистрация
        </Link>
      </div>
    </form>
  );
};

export default Auth;
