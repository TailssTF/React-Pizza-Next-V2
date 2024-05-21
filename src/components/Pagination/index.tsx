"use client";
import ReactPaginate from "react-paginate";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import styles from "./Pagination.module.scss";

export const Pagination = ({ totalCount }: { totalCount: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const selectedPage = Number(params.get("page"));
  const pageRange = Number(params.get("limit"));
  const pageCount = Math.ceil(totalCount / pageRange);

  const handleChangePage = (index: number) => {
    params.set("page", String(index));
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        previousLabel="<"
        nextLabel=">"
        onPageChange={(event) => handleChangePage(event.selected)}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        forcePage={pageCount > 0 ? selectedPage : -1}
      />
    </div>
  );
};
