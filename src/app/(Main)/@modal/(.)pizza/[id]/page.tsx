import { IPizza, PizzaBlock } from "@/components/PizzaBlock";
import { Modal } from "@/components/Modal";

const getPizza = async (id: string) => {
  const res = await fetch(
    "https://660bdea73a0766e85dbcc139.mockapi.io/items/" + id
  );
  return res.json();
};

const PizzaModal = async ({ params }: { params: { id: string } }) => {
  const pizzaData = getPizza(params.id);
  const pizza: IPizza = await pizzaData;

  return (
    <Modal>
      <PizzaBlock pizza={pizza} isModal={true} />
    </Modal>
  );
};
export default PizzaModal;
