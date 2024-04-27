"use client";
import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useStores } from "@/Store-context";
import qs from "qs";

import {
  Categories,
  categories,
  Sort,
  PizzaBlock,
  Placeholder,
  Pagination,
} from "@/components";
import { IParameters } from "@/stores/FilterStore";
import { State } from "@/stores/PizzaStore";

const Home: React.FC = observer(() => {
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const router = useRouter();
  const {
    FilterStore: {
      selectedCategory,
      selectedPage,
      selectedSorting,
      selectedOrder,
      searchValue,
      setFilters,
    },
    PizzaStore: { items, state, fetchPizzas },
  } = useStores();

  const pizzaSkeletons = [...new Array(6)].map((_, index) => (
    <Placeholder key={index} />
  ));
  const pizzas =
    items.length > 0
      ? items.map((pizza) => (
          <div className="pizza-block__wrapper" key={pizza.id}>
            <PizzaBlock isModal={false} pizza={pizza} />
          </div>
        ))
      : [];

  // Применение параметров поисковой строки
  useEffect(() => {
    if (window.location.search) {
      const paramsQs = qs.parse(window.location.search.substring(1));
      const params: IParameters = {
        category: String(paramsQs.category),
        sortBy: String(paramsQs.sortBy),
        order: String(paramsQs.order),
        page: String(paramsQs.page),
      };

      setFilters(params);
      isSearch.current = true;
    }
  }, [setFilters]);

  // Запись параметров в поисковую строку
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        category: selectedCategory,
        page: selectedPage,
        sortBy: selectedSorting.sortProperty,
        order: selectedOrder,
      });

      router.push(`?${queryString}`);
    }
    isMounted.current = true;
  }, [
    selectedCategory,
    selectedSorting,
    selectedOrder,
    selectedPage,
    searchValue,
    router,
  ]);

  // Получение данных для пицц
  useEffect(() => {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}pizza`);
    if (selectedCategory > 0) {
      url.searchParams.append("category_eq", `${selectedCategory}`);
    }
    url.searchParams.append("page", `${selectedPage + 1}`);
    url.searchParams.append("limit", "4");
    url.searchParams.append("sort", selectedSorting.sortProperty);
    url.searchParams.append("order", selectedOrder);
    if (searchValue) {
      url.searchParams.append("search", searchValue);
    }

    const getPizzas = async () => {
      await fetchPizzas(url);
      window.scrollTo(0, 0);
    };

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [
    selectedCategory,
    selectedSorting,
    selectedOrder,
    selectedPage,
    searchValue,
    fetchPizzas,
  ]);

  return (
    <div className="container">
      <div className="content__top">
        {state != State.ERROR && (
          <>
            <Categories />
            <Sort />
          </>
        )}
      </div>
      <h2 className="content__title">{categories[selectedCategory]} пиццы</h2>
      {state == State.ERROR ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>
            К сожалению, не удалось получить пиццы. <br />
            Попробуйте повторить попытку позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {state == State.PENDING && isMounted.current
            ? pizzaSkeletons
            : pizzas}
        </div>
      )}
      <Pagination />
    </div>
  );
});

export default Home;
