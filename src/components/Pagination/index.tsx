"use client";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "next/navigation";

import styles from "./Pagination.module.scss";
import { useQueryParams } from "@/utils/useQueryParams";

export const Pagination = ({ totalCount }: { totalCount: number }) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const selectedPage = Number(params.get("page"));
  const pageRange = Number(params.get("limit"));
  const pageCount = Math.ceil(totalCount / pageRange);
  const { setQueryParams } = useQueryParams();

  const handleChangePage = (index: number) => {
    setQueryParams({ page: index });
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
