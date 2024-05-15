import { makeAutoObservable } from "mobx";
import { getAuthFromLS } from "@/utils/getAuthFromLS";
import { useMemo } from "react";
import { TNullable } from "@/types";
import { IAuthStore } from "./interfaces";
import { IS_SERVER } from "@/constants";

const { isAuth, fromPath } = getAuthFromLS();

class AuthStore implements IAuthStore {
  isAuth = isAuth;
  email: string = "";
  fromPath: string = fromPath;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  signIn = (email: string) => {
    this.isAuth = true;
    this.email = email;
  };

  signOut = () => {
    this.isAuth = false;
    this.email = "";
  };

  setFromPath = (path: string) => {
    this.fromPath = path;
  };
}

let storeUI: IAuthStore;

function initializeAuthStore(initialData: TNullable<IAuthStore> = null) {
  const _store = storeUI ?? new AuthStore();

  if (IS_SERVER) return _store;

  if (!storeUI) storeUI = _store;

  return _store;
}

function useAuthStore(initialData: TNullable<IAuthStore> = null) {
  return useMemo(() => initializeAuthStore(initialData), [initialData]);
}

export { initializeAuthStore, useAuthStore };
