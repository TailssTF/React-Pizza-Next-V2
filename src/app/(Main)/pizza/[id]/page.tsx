import { IPizza } from "@/components/PizzaBlock";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

const PizzaDetails = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}pizza/` + id);
  if (!res.ok) redirect("/");

  const pizza: IPizza = await res.json();

  return (
    <div className="container">
      {pizza ? (
        <div className="content__pizza-details">
          <Link href="/" className="button button--outline button--go-back">
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13L1 6.93015L6.86175 1"
                stroke="#D3D3D3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>Вернуться назад</span>
          </Link>
          <img src={pizza.imageUrl} alt={pizza.title} />
          <h2>{pizza.title}</h2>
          <h4>{pizza.price} ₽</h4>
        </div>
      ) : (
        <h4>Загрузка...</h4>
      )}
    </div>
  );
};

export default PizzaDetails;
