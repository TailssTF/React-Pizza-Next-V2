"use client";
import { createContext, useContext } from "react";
import Store from "@/stores/Store";

export const StoreContext = createContext<Store | null>(null);

export const useStores = () => {
  const context = useContext(StoreContext);

  if (context === null) {
    throw new Error("Ошибка загрузки хранилища");
  }

  return context;
};
