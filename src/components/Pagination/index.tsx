import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";
import { useStores } from "../../Store-context";
import { observer } from "mobx-react-lite";

export const Pagination: React.FC = observer(() => {
  const {
    FilterStore: { selectedPage, setSelectedPage },
  } = useStores();
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      onPageChange={(event) => setSelectedPage(event.selected)}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
      forcePage={selectedPage}
    />
  );
});
