"use client";
import Link from "next/link";
import { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import { registerUser } from "@/api/authActions";

const Register: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [isValid, setIsValid] = useState(false);

  return (
    <form className="auth__form" action={registerUser}>
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
          aria-describedby="password"
          aria-invalid="false"
          onChange={(e) => setPassword(e.target.value)}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,200}$"
          required
        />
      </div>
      <div className="auth__field">
        <label htmlFor="passwordAgain">Повторите пароль: </label>
        <input
          type="password"
          id="passwordAgain"
          name="passwordAgain"
          minLength={3}
          maxLength={200}
          aria-describedby="passwordAgain"
          aria-invalid="false"
          onChange={(e) => setPasswordAgain(e.target.value)}
          required
        />
      </div>
      <div className="auth__requirements">
        <PasswordChecklist
          rules={[
            "minLength",
            "maxLength",
            "capital",
            "specialChar",
            "number",
            "match",
          ]}
          minLength={3}
          maxLength={200}
          value={password}
          valueAgain={passwordAgain}
          onChange={(isValid) => setIsValid(isValid)}
          messages={{
            minLength: "Пароль содержит минимум 3 символа",
            maxLength: "Пароль содержит максимум 200 символов",
            capital: "Пароль содержит заглавную букву",
            specialChar: "Пароль содержит спец символ",
            number: "Пароль содержит цифру",
            match: "Пароли совпадают",
          }}
        />
      </div>

      <div className="auth__buttons">
        <button
          className={"button " + (isValid ? "" : "button_disabled")}
          disabled={!isValid}
        >
          Подтвердить
        </button>
        <Link href={"/auth"} className="button">
          Авторизация
        </Link>
      </div>
    </form>
  );
};

export default Register;
