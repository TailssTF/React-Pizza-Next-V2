"use client";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "next/navigation";

import styles from "./Pagination.module.scss";
import { useQueryParams } from "@/utils/useQueryParams";
import { useTransition } from "react";
import Loader from "../Loader";

export const Pagination = ({ totalCount }: { totalCount: number }) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const selectedPage = Number(params.get("page") ?? 0);
  const pageRange = Number(params.get("limit") ?? 4);
  const pageCount = Math.ceil(totalCount / pageRange);
  const { setQueryParams } = useQueryParams();
  const [isPending, startTransition] = useTransition();

  const handleChangePage = (index: number) => {
    startTransition(() => {
      setQueryParams({ page: index });
    });
  };

  return (
    <div>
      {isPending && <Loader />}
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
