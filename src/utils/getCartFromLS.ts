import { calcTotalItems } from "./calcTotalItems";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
  const data = typeof window == "undefined" ? "" : localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalItems = calcTotalItems(items);
  const totalPrice = calcTotalPrice(items);

  return {
    items,
    totalItems,
    totalPrice,
  };
};
