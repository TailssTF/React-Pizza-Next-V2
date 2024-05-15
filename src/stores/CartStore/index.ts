import { makeAutoObservable } from "mobx";
import { getCartFromLS } from "@/utils/getCartFromLS";
import { calcTotalPrice } from "@/utils/calcTotalPrice";
import { calcTotalItems } from "@/utils/calcTotalItems";
import { ICartStore, IPizzaInCart } from "./interfaces";
import { TNullable } from "@/types";
import { useMemo } from "react";
import { IS_SERVER } from "@/constants";

const { items, totalItems, totalPrice } = getCartFromLS();

class CartStore implements ICartStore {
  totalPrice: number = totalPrice;
  totalItems: number = totalItems;
  items: IPizzaInCart[] = items;

  constructor() {
    makeAutoObservable(this);
  }

  addItem = (item: IPizzaInCart) => {
    const findItem = this.items.find((obj: IPizzaInCart) =>
      this.isEqualPizza(obj, item)
    );

    if (findItem && findItem.count) {
      findItem.count++;
    } else {
      this.items.push({ ...item, count: 1 });
    }
    this.recalculateTotal();
  };

  removeItem = (item: IPizzaInCart) => {
    const findItem = this.items.find((obj: IPizzaInCart) =>
      this.isEqualPizza(obj, item)
    );
    if (findItem?.count) {
      if (findItem.count > 1) {
        findItem.count--;
        this.recalculateTotal();
      } else {
        this.clearItem(item);
      }
    }
  };

  clearItem = (item: IPizzaInCart) => {
    if (window.confirm("Удалить пиццу из корзины?")) {
      this.items = this.items.filter((obj) => obj.id !== item.id);
      this.recalculateTotal();
    }
  };

  clearCart = () => {
    if (window.confirm("Очистить корзину?")) {
      this.items = [];
      this.recalculateTotal();
    }
  };

  recalculateTotal = () => {
    this.totalItems = calcTotalItems(this.items);
    this.totalPrice = calcTotalPrice(this.items);
  };

  isEqualPizza = (pizza1: IPizzaInCart, pizza2: IPizzaInCart) => {
    return (
      pizza1.id == pizza2.id &&
      pizza1.selectedType == pizza2.selectedType &&
      pizza1.selectedSize == pizza2.selectedSize
    );
  };
}

let storeUI: ICartStore;

function initializeCartStore(initialData: TNullable<ICartStore> = null) {
  const _store = storeUI ?? new CartStore();

  if (IS_SERVER) return _store;

  if (!storeUI) storeUI = _store;

  return _store;
}

function useCartStore(initialData: TNullable<ICartStore> = null) {
  return useMemo(() => initializeCartStore(initialData), [initialData]);
}

export { initializeCartStore, useCartStore };
