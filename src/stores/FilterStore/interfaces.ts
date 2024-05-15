export interface ISorting {
  name: string;
  sortProperty: "rating" | "title" | "price";
}

export type Order = "desc" | "asc";

export interface IStringParameters {
  category: string;
  sortBy: string;
  order: string;
  page: string;
  limit: string;
  search?: string;
}

export interface IParameters {
  category: number;
  page: number;
  limit: number;
  sortBy: "rating" | "title" | "price";
  order: Order;
  search?: string;
}

export interface IFilterStore {
  selectedCategory: number;
  selectedPage: number;
  selectedSorting: ISorting;
  selectedOrder: Order;
  searchValue: string;
  perPage: number;
  setSelectedCategory(category: number): void;
  setSelectedPage(page: number): void;
  setSelectedSorting(sorting: ISorting): void;
  setSelectedOrder(order: Order): void;
  setSearchValue(value: string): void;
  setPerPage(value: number): void;
  setFilters(params: IStringParameters): void;
}
