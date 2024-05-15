import { IPizza } from "@/components";

export enum State {
  PENDING = "pending",
  DONE = "done",
  ERROR = "error",
}

export interface IPizzaStore {
  items: IPizza[];
  state: State;
  totalCount: number;

  setItems(items: IPizza[]): void;
  fetchPizzas(url: URL): void;
}
