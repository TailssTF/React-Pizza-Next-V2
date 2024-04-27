import { IPizza, PizzaBlock } from "@/components/PizzaBlock";
import { Modal } from "@/components/Modal";

const getPizza = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}pizza/` + id);
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
