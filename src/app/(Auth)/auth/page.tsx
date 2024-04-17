"use client";
import { useStores } from "@/Store-context";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

const Auth: React.FC = observer(() => {
  const {
    AuthStore: { signIn, fromPath },
  } = useStores();
  const router = useRouter();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmitEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.email !== "" && input.password !== "") {
      signIn(input.email);

      router.push(fromPath);
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
  );
});

export default Auth;
