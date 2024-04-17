import { makeAutoObservable } from "mobx";
import { sortList } from "../components/Sort";

export interface ISorting {
  name: string;
  sortProperty: "rating" | "title" | "price";
}

type Order = "desc" | "asc";

export interface IParameters {
  category: string;
  sortBy: string;
  order: string;
  page: string;
  search?: string;
}

const defaultSorting: ISorting = {
  name: "популярности",
  sortProperty: "rating",
};

class FilterStore {
  selectedCategory = 0;
  selectedPage = 0;
  selectedSorting: ISorting = defaultSorting;
  selectedOrder: Order = "desc";
  searchValue: string = "";

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

  setFilters = (params: IParameters) => {
    const sortBy: ISorting =
      sortList.find((param) => param.sortProperty === params.sortBy) ||
      defaultSorting;
    const order = params.order == "asc" ? "asc" : "desc";

    this.setSelectedCategory(Number(params.category));
    this.setSelectedPage(Number(params.page));
    this.setSelectedSorting(sortBy);
    this.setSelectedOrder(order);
    if (params.search) {
      this.setSearchValue(params.search);
    }
  };
}

export default new FilterStore();
