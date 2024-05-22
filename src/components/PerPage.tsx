"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQueryParams } from "@/utils/useQueryParams";

const perPageList = [4, 8, 16, 32, 50];

export const PerPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const perPage = Number(params.get("limit") ?? 4);
  const { setQueryParams } = useQueryParams();

  const onChangePerPage = (value: number) => {
    setIsOpen(false);
    setQueryParams({ limit: value });
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
        <b>На странице:</b>
        <span className="sort__button" onClick={() => setIsOpen(!isOpen)}>
          {perPage}
        </span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {perPageList.map((item, i) => (
              <li
                key={i}
                className={perPage == item ? "active" : ""}
                onClick={() => onChangePerPage(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
