"use client";
import React, { useEffect, useRef, useState } from "react";
import { useStores } from "../Store-context";
import { ISorting } from "../stores/FilterStore";
import { observer } from "mobx-react-lite";

export const sortList: ISorting[] = [
  { name: "популярности", sortProperty: "rating" },
  { name: "цене", sortProperty: "price" },
  { name: "алфавиту", sortProperty: "title" },
];

export const Sort: React.FC = observer(() => {
  const {
    FilterStore: {
      selectedSorting,
      setSelectedSorting,
      selectedOrder,
      setSelectedOrder,
    },
  } = useStores();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const onChangeSorting = (sorting: ISorting) => {
    setSelectedSorting(sorting);
    setIsOpen(false);
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
        <div
          className="sort__arrow"
          onClick={() =>
            setSelectedOrder(selectedOrder == "desc" ? "asc" : "desc")
          }
        >
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
                onClick={() => onChangeSorting(sorting)}
              >
                {sorting.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
