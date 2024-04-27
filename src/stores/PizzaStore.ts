import axios from "axios";
import { makeAutoObservable } from "mobx";
import { IPizza } from "../components/PizzaBlock";

export enum State {
  PENDING = "pending",
  DONE = "done",
  ERROR = "error",
}

class PizzaStore {
  items: IPizza[] = [];
  state = State.PENDING;
  totalCount: number = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setItems = (items: IPizza[]) => {
    this.items = items;
  };

  *fetchPizzas(url: URL) {
    this.items = [];
    this.state = State.PENDING;

    try {
      const { data, headers } = yield axios.get<IPizza[]>(String(url));
      this.state = State.DONE;
      this.items = data;
      this.totalCount = headers["x-filtered-count"];
    } catch (error) {
      this.state = State.ERROR;
    }
  }
}

export default new PizzaStore();
