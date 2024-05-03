"use client";
import { useState } from "react";
import { observer } from "mobx-react-lite";

import { useStores } from "../../Store-context";
import { pizzaType } from "../../stores/CartStore";
import Link from "next/link";
import Image from "next/image";

export interface IPizza {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

interface IPizzaBlockParams {
  pizza: IPizza;
  isModal?: boolean;
}

export const PizzaBlock: React.FC<IPizzaBlockParams> = observer(
  (props: { pizza: IPizza; isModal?: boolean }) => {
    const {
      CartStore: { addItem },
    } = useStores();

    const { id, title, price, imageUrl, sizes, types } = props.pizza;
    const isModal = props.isModal;

    const [selectedType, setSelectedType] = useState<number>(types[0]);
    const [selectedSize, setSelectedSize] = useState<number>(0);

    const onAddPizza = () => {
      addItem({
        id,
        title,
        price,
        imageUrl,
        sizes,
        selectedSize,
        selectedType,
      });
    };

    return (
      <div className="pizza-block">
        <Link
          href={`/pizza/${id}`}
          passHref
          onClick={() => isModal && location.reload()}
        >
          <img className="pizza-block__image" src={imageUrl} alt={title} />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        {isModal && (
          <div className="pizza-block__selector">
            <ul>
              {types.map((type) => (
                <li
                  key={type}
                  className={selectedType == type ? "active" : ""}
                  onClick={() => setSelectedType(type)}
                >
                  {pizzaType[type]}
                </li>
              ))}
            </ul>
            <ul>
              {sizes.map((size, index) => (
                <li
                  key={index}
                  className={selectedSize == index ? "active" : ""}
                  onClick={() => setSelectedSize(index)}
                >
                  {size} см.
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {String(price)} ₽</div>
          {isModal ? (
            <button
              onClick={onAddPizza}
              className="button button--outline button--add"
            >
              <span>Добавить</span>
            </button>
          ) : (
            <Link className="button" href={`/pizza/${id}`} passHref>
              Собрать
            </Link>
          )}
        </div>
      </div>
    );
  }
);
