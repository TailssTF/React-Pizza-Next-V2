import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";
import { useStores } from "../../Store-context";
import { observer } from "mobx-react-lite";
import { useFilterStore } from "@/stores/FilterStore";

export const Pagination: React.FC = observer(() => {
  const { selectedPage, setSelectedPage, perPage } = useFilterStore();
  const {
    PizzaStore: { totalCount },
  } = useStores();

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
