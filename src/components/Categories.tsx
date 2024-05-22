"use client";
import React from "react";
import { observer } from "mobx-react-lite";
import { useFilterStore } from "@/stores/FilterStore";

export const categories = [
  "Все",
  "Мясные",
  "Вегетарианские",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories: React.FC = observer(() => {
  const { selectedCategory, setSelectedCategory } = useFilterStore();

  return (
    <div className="categories">
      <ul>
        {categories.map((name: string, index: number) => (
          <li
            key={index}
            onClick={() => setSelectedCategory(index)}
            className={selectedCategory == index ? "active" : ""}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
});
