import { IPizzaInCart } from "@/stores/CartStore/interfaces";

export const calcTotalPrice = (items: IPizzaInCart[]) => {
  return items.reduce((sum, obj) => {
    return obj.count ? obj.price * obj.count + sum : obj.price + sum;
  }, 0);
};
