"use client";
import { allCategories } from "@/constants";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

export const Categories = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const category = Number(params.get("category"));

  const handleChangeCategory = (index: number) => {
    params.set("category", String(index));
    params.set("page", "0");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
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
  );
};
