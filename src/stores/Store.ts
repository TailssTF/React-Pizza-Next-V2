import CartStore from "./CartStore";
import PizzaStore from "./PizzaStore";
import AuthStore from "./AuthStore";

class Store {
  CartStore = CartStore;
  PizzaStore = PizzaStore;
  AuthStore = AuthStore;
}

export default Store;
