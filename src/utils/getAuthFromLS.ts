export const getAuthFromLS = () => {
  const isAuthString = localStorage.getItem("isAuth");
  const isAuth = isAuthString == "true";
  const fromPath = localStorage.getItem("fromPath") ?? "/";

  return {
    isAuth,
    fromPath,
  };
};
