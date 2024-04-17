export const getAuthFromLS = () => {
  const isAuthString =
    typeof window == "undefined" ? "true" : localStorage.getItem("isAuth");
  const isAuth = isAuthString == "true";
  const fromPath =
    typeof window == "undefined"
      ? "/"
      : localStorage.getItem("fromPath") ?? "/";

  return {
    isAuth,
    fromPath,
  };
};
