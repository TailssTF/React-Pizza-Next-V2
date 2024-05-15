import { makeAutoObservable } from "mobx";
import { sortList } from "../../components/Sort";
import { TNullable } from "@/types";
import { IFilterStore, ISorting, IStringParameters, Order } from "./interfaces";
import { IS_SERVER } from "@/constants";
import { useMemo } from "react";

const defaultSorting: ISorting = {
  name: "популярности",
  sortProperty: "rating",
};

class FilterStore implements IFilterStore {
  selectedCategory = 0;
  selectedPage = 0;
  selectedSorting = defaultSorting;
  selectedOrder: Order = "desc";
  searchValue = "";
  perPage = 4;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedCategory = (category: number) => {
    this.selectedCategory = category;
    this.setSelectedPage(0);
  };
  setSelectedPage = (page: number) => {
    this.selectedPage = page;
  };
  setSelectedSorting = (sorting: ISorting) => {
    this.selectedSorting = sorting;
  };
  setSelectedOrder = (order: Order) => {
    this.selectedOrder = order;
  };
  setSearchValue = (value: string) => {
    this.searchValue = value;
  };
  setPerPage = (value: number) => {
    this.perPage = value;
  };

  setFilters = (params: IStringParameters) => {
    const sortBy: ISorting =
      sortList.find((param) => param.sortProperty === params.sortBy) ||
      defaultSorting;
    const order = params.order == "asc" ? "asc" : "desc";

    this.setSelectedCategory(Number(params.category));
    this.setSelectedPage(Number(params.page));
    this.setPerPage(Number(params.limit));
    this.setSelectedSorting(sortBy);
    this.setSelectedOrder(order);
    if (params.search) {
      this.setSearchValue(params.search);
    }
  };
}

let storeUI: IFilterStore;

function initializeFilterStore(initialData: TNullable<IFilterStore> = null) {
  const _store = storeUI ?? new FilterStore();

  if (IS_SERVER) return _store;

  if (!storeUI) storeUI = _store;

  return _store;
}

function useFilterStore(initialData: TNullable<IFilterStore> = null) {
  return useMemo(() => initializeFilterStore(initialData), [initialData]);
}

export { initializeFilterStore, useFilterStore };
