import axios from "axios";
import { makeAutoObservable } from "mobx";
import { IPizza } from "@/components/PizzaBlock";
import { IPizzaStore, State } from "./interfaces";
import { TNullable } from "@/types";
import { IS_SERVER } from "@/constants";
import { useMemo } from "react";

class PizzaStore implements IPizzaStore {
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
      this.setItems(data);
      this.totalCount = headers["x-filtered-count"];
    } catch (error) {
      this.state = State.ERROR;
    }
  }
}

let storeUI: IPizzaStore;

function initializePizzaStore(initialData: TNullable<IPizzaStore> = null) {
  const _store = storeUI ?? new PizzaStore();

  if (IS_SERVER) return _store;

  if (!storeUI) storeUI = _store;

  return _store;
}

function usePizzaStore(initialData: TNullable<IPizzaStore> = null) {
  return useMemo(() => initializePizzaStore(initialData), [initialData]);
}

export { initializePizzaStore, usePizzaStore };
