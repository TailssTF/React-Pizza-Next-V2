"use client";
import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import pizzaLogoSvg from "@/assets/img/pizza-logo.svg";
import { Search } from "./";
import { useStores } from "../Store-context";

export const Header: React.FC = observer(() => {
  const {
    CartStore: { items, totalPrice, totalItems },
    AuthStore: { isAuth, setFromPath, signOut },
  } = useStores();
  const isMounted = useRef(false);
  const router = useRouter();
  const pathName = usePathname();

  // Сохранение состояния авторизации
  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("isAuth", String(isAuth));
    }
  }, [isAuth]);

  // Сохранение корзины
  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem("cart", json);
    }
    isMounted.current = true;
  }, [totalItems]);

  const onCLickAuth = () => {
    setFromPath(pathName);
    localStorage.setItem("fromPath", pathName);
    router.push("/auth");
  };

  return (
    <div className="sticky top-0 bg-white">
      <div className="header" id="header">
        <div className="container">
          <Link href="/">
            <div className="header__logo">
              <Image width="38" src={pizzaLogoSvg} alt="Pizza logo" />
              <div>
                <h1>React Pizza</h1>
                <p>самая вкусная пицца во вселенной</p>
              </div>
            </div>
          </Link>
          {pathName == "/" && <Search />}
          <div className="header__buttons">
            {pathName != "/cart" && (
              <div className="header__cart">
                <Link href="/cart" className="button button--cart">
                  <span>{isMounted.current ? totalPrice : 0} ₽</span>
                  <div className="button__delimiter"></div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{isMounted.current ? totalItems : 0}</span>
                </Link>
              </div>
            )}
            {isAuth && isMounted.current ? (
              <button onClick={signOut} className="button button--small">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 96 96"
                  id="exit"
                >
                  <path
                    stroke="#ffffff"
                    strokeLinecap="round"
                    strokeWidth="5"
                    d="M64 35.7059V16C64 12.6863 61.3137 10 58 10H19C15.6863 10 13 12.6863 13 16V80C13 83.3137 15.6863 86 19 86H58C61.3137 86 64 83.3137 64 80V61.9706M77 58L83.818 51.182C85.5754 49.4246 85.5754 46.5754 83.818 44.818L77 38M74 48H47"
                  ></path>
                </svg>
              </button>
            ) : (
              <button onClick={onCLickAuth} className="button button--small">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  id="sign-in"
                >
                  <path
                    fill="#fff"
                    d="M18.01 27h-4c-6.34 0-11.5 5.16-11.5 11.5v3c0 .83.67 1.5 1.5 1.5h24c.83 0 1.5-.67 1.5-1.5v-3c0-6.34-5.16-11.5-11.5-11.5zm8.5 13h-21v-1.5c0-4.69 3.81-8.5 8.5-8.5h4c4.69 0 8.5 3.81 8.5 8.5V40zm-10.5-14c5.79 0 10.5-4.71 10.5-10.5S21.8 5 16.01 5 5.51 9.71 5.51 15.5 10.22 26 16.01 26zm0-18c4.14 0 7.5 3.36 7.5 7.5s-3.36 7.5-7.5 7.5-7.5-3.36-7.5-7.5S11.87 8 16.01 8zM45.4 23.97c0-.01 0-.03-.01-.04v-.01c-.07-.17-.17-.31-.29-.44a.219.219 0 0 1-.03-.05l-4-4c-.59-.59-1.54-.59-2.12 0s-.59 1.54 0 2.12L40.38 23H31c-.83 0-1.5.67-1.5 1.5S30.17 26 31 26h9.38l-1.44 1.44a1.49 1.49 0 0 0 0 2.12c.29.29.68.44 1.06.44s.77-.15 1.06-.44l4-4c.13-.13.22-.28.3-.44.02-.05.04-.1.05-.15.04-.12.06-.24.07-.37 0-.05.01-.1.01-.15 0-.17-.03-.32-.09-.48z"
                  ></path>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
