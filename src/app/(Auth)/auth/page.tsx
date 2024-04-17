"use client";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

const Auth: React.FC = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmitEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.email !== "" && input.password !== "") {
      // signIn(input.email);

      // navigate(fromPath);
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("fromPath", "/");
    } else {
      alert("Введите корректные данные");
    }
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="auth">
      <Link href={"/"} className="button button--outline button--go-back">
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 13L1 6.93015L6.86175 1"
            stroke="#D3D3D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span>Вернуться назад</span>
      </Link>
      <form className="auth__form" onSubmit={handleSubmitEvent}>
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
            onChange={handleInput}
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
            onChange={handleInput}
            required
          />
        </div>

        <div className="auth__buttons">
          <button className="button">Подтвердить</button>
          <Link href={"/reset"} className="button">
            Забыли пароль?
          </Link>
          <Link href={"/register"} className="button">
            Регистрация
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Auth;
