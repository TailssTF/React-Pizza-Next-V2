import {
  Categories,
  categories,
  Sort,
  PizzaBlock,
  Placeholder,
  Pagination,
  PerPage,
  IPizza,
} from "@/components";
import {
  IParameters,
  IStringParameters,
  Order,
  SortType,
} from "@/stores/FilterStore/interfaces";
import { Suspense } from "react";

const transformParams = (params: IStringParameters): IParameters => {
  return {
    category: Number(params.category) ?? 0,
    page: Number(params.page) ?? 0,
    limit: Number(params.limit) ?? 4,
    sortBy: (params.sortBy as SortType) ?? "rating",
    order: (params.order as Order) ?? "desc",
    search: params.search,
  };
};

const Home = async ({ searchParams }: { searchParams: IStringParameters }) => {
  const { category, page, limit, sortBy, order, search } =
    transformParams(searchParams);

  const pizzaSkeletons = [...new Array(4)].map((_, index) => (
    <div className="pizza-block__wrapper" key={index}>
      <Placeholder />
    </div>
  ));

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}pizza`);
  if (category > 0) {
    url.searchParams.append("category_eq", `${category}`);
  }
  url.searchParams.append("page", `${page + 1}`);
  url.searchParams.append("limit", `${limit}`);
  url.searchParams.append("sort", sortBy);
  url.searchParams.append("order", order);
  if (search) {
    url.searchParams.append("search", search);
  }

  const res = await fetch(url);
  const items = await res.json();
  const totalItems = Number(res.headers.get("x-filtered-count"));

  const pizzas =
    items.length > 0
      ? items.map((pizza: IPizza) => (
          <div className="pizza-block__wrapper" key={pizza.id}>
            <PizzaBlock isModal={false} pizza={pizza} />
          </div>
        ))
      : [];

  return (
    <div className="container">
      <div className="content__top">
        {
          <>
            <Categories />
            <Sort />
            <PerPage />
          </>
        }
      </div>
      {/* <h2 className="content__title">{categories[category]} пиццы</h2> */}
      <div className="content__items">
        <Suspense fallback={pizzaSkeletons}>{pizzas}</Suspense>
      </div>
      <Pagination totalCount={totalItems} />
    </div>
  );
};
export default Home;
