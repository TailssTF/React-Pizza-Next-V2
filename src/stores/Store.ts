import FilterStore from "./FilterStore";
import CartStore from "./CartStore";
import PizzaStore from "./PizzaStore";
import AuthStore from "./AuthStore";

class Store {
  FilterStore = FilterStore;
  CartStore = CartStore;
  PizzaStore = PizzaStore;
  AuthStore = AuthStore;
}

export default Store;
