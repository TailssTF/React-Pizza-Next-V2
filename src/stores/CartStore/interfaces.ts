export interface IPizzaInCart {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  selectedSize: number;
  selectedType: number;
  count?: number;
}

export interface ITypeNames {
  [keyof: number]: string;
}

export const pizzaType: ITypeNames = {
  0: "тонкое",
  1: "традиционное",
};

export interface ICartStore {
  totalPrice: number;
  totalItems: number;
  items: IPizzaInCart[];

  addItem(item: IPizzaInCart): void;
  removeItem(item: IPizzaInCart): void;
  clearItem(item: IPizzaInCart): void;
  clearCart(): void;
  recalculateTotal(): void;
  isEqualPizza(pizza1: IPizzaInCart, pizza2: IPizzaInCart): boolean;
}
