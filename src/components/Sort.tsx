"use client";
import React, { useEffect, useRef, useState } from "react";
import { ISorting } from "../stores/FilterStore/interfaces";
import { useSearchParams } from "next/navigation";
import { useQueryParams } from "@/utils/useQueryParams";

export const sortList: ISorting[] = [
  { name: "популярности", sortProperty: "rating" },
  { name: "цене", sortProperty: "price" },
  { name: "алфавиту", sortProperty: "title" },
];

export const Sort: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const sortBy = params.get("sortBy");
  const selectedSorting =
    sortList.find((sort) => sort.sortProperty == sortBy) ?? sortList[0];
  const selectedOrder = params.get("order");
  const { setQueryParams } = useQueryParams();

  const handleChangeSorting = (sorting: ISorting) => {
    setIsOpen(false);
    setQueryParams({ sortBy: sorting.sortProperty });
  };

  const handleChangeOrder = () => {
    const order = selectedOrder == "desc" ? "asc" : "desc";
    setQueryParams({ order: order });
  };

  useEffect(() => {
    const handleClickOutsidePopup = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutsidePopup);

    return () =>
      document.body.removeEventListener<"click">(
        "click",
        handleClickOutsidePopup
      );
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <div className="sort__arrow" onClick={handleChangeOrder}>
          {selectedOrder == "desc" ? <>&#128899;</> : <>&#128897;</>}
        </div>
        <b>Сортировка по:</b>
        <span className="sort__button" onClick={() => setIsOpen(!isOpen)}>
          {selectedSorting.name}
        </span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortList.map((sorting, i) => (
              <li
                key={i}
                className={
                  selectedSorting.sortProperty == sorting.sortProperty
                    ? "active"
                    : ""
                }
                onClick={() => handleChangeSorting(sorting)}
              >
                {sorting.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
