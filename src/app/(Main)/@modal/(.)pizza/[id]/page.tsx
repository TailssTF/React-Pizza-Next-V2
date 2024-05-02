import { IPizza, PizzaBlock } from "@/components/PizzaBlock";
import { Modal } from "@/components/Modal";

const getPizza = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}pizza/` + id);
  return res.json();
};

const sortParameters = (pizza: IPizza) => {
  pizza.sizes.sort((a, b) => a - b);
  pizza.types.sort((a, b) => a - b);
  return pizza;
};

const PizzaModal = async ({ params }: { params: { id: string } }) => {
  const pizzaData = getPizza(params.id);
  const pizza: IPizza = await pizzaData;
  const oPizza = sortParameters(pizza);

  return (
    <Modal>
      <PizzaBlock pizza={oPizza} isModal={true} />
    </Modal>
  );
};
export default PizzaModal;
