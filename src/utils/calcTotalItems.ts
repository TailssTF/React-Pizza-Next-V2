import { IPizzaInCart } from "../stores/CartStore";

export const calcTotalItems = (items: IPizzaInCart[]) => {
  return items.reduce((sum, obj) => {
    return obj.count ? obj.count + sum : sum++;
  }, 0);
};
