import { IPizzaInCart } from "@/stores/CartStore/interfaces";

export const calcTotalItems = (items: IPizzaInCart[]) => {
  return items.reduce((sum, obj) => {
    return obj.count ? obj.count + sum : sum++;
  }, 0);
};
