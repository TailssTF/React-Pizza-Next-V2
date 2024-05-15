export interface IAuthStore {
  isAuth: boolean;
  email: string;
  fromPath: string;
  signIn(email: string): void;
  signOut(): void;
  setFromPath(path: string): void;
}
