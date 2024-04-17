import React from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../Store-context";

export const categories = [
  "Все",
  "Мясные",
  "Вегетарианские",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories: React.FC = React.memo(
  observer(() => {
    const {
      FilterStore: { selectedCategory, setSelectedCategory },
    } = useStores();

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
  })
);
