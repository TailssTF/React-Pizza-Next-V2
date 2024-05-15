import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";
import { observer } from "mobx-react-lite";
import { useFilterStore } from "@/stores/FilterStore";
import { usePizzaStore } from "@/stores/PizzaStore";

export const Pagination: React.FC = observer(() => {
  const { selectedPage, setSelectedPage, perPage } = useFilterStore();
  const { totalCount } = usePizzaStore();

  const pageRange = perPage;
  const pageCount = Math.ceil(totalCount / pageRange);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      onPageChange={(event) => setSelectedPage(event.selected)}
      pageRangeDisplayed={pageRange}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      forcePage={pageCount > 0 ? selectedPage : -1}
    />
  );
});
