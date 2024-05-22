"use client";
import { allCategories } from "@/constants";
import { useQueryParams } from "@/utils/useQueryParams";
import { useSearchParams } from "next/navigation";
import React, { useTransition } from "react";
import Loader from "./Loader";

export const Categories = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const category = Number(params.get("category") ?? 0);
  const { setQueryParams } = useQueryParams();
  const [isPending, startTransition] = useTransition();

  const handleChangeCategory = (index: number) => {
    startTransition(() => {
      setQueryParams({ category: index, page: 0 });
    });
  };

  return (
    <>
      {isPending && <Loader />}
      <div className="categories">
        <ul>
          {allCategories.map((name: string, index: number) => (
            <li
              key={index}
              onClick={() => handleChangeCategory(index)}
              className={category == index ? "active" : ""}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
