"use client";
import { useAuthStore } from "@/stores/AuthStore";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import PasswordChecklist from "react-password-checklist";

const Reset: React.FC = observer(() => {
  const { signIn, fromPath } = useAuthStore();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [nextStage, setNextStage] = useState(false);

  const handleSubmitEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nextStage && email !== "") {
      setNextStage(true);
    } else {
      if (nextStage && password !== "" && password == passwordAgain) {
        signIn(email);

        router.push(fromPath);
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("fromPath", "/");
      } else {
        alert("Введите корректные данные");
      }
    }
  };

  return (
    <form className="auth__form" onSubmit={handleSubmitEvent}>
      {!nextStage && (
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      )}

      {nextStage && (
        <>
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
        </>
      )}

      <div className="auth__buttons">
        <button className="button">
          {nextStage ? "Подтвердить" : "Восстановить"}
        </button>
      </div>
    </form>
  );
});

export default Reset;
