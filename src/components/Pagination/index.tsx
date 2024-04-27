import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";
import { useStores } from "../../Store-context";
import { observer } from "mobx-react-lite";

export const Pagination: React.FC = observer(() => {
  const {
    FilterStore: { selectedPage, setSelectedPage },
    PizzaStore: { totalCount },
  } = useStores();

  const pageRange = 4;
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
      forcePage={selectedPage}
    />
  );
});
