import { makeAutoObservable } from "mobx";
import { getAuthFromLS } from "../utils/getAuthFromLS";

const { isAuth, fromPath } = getAuthFromLS();

class AuthStore {
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

export default new AuthStore();
