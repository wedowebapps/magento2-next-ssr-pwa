"use client";
import clsx from "clsx";
import { FC } from "react";

export interface PaginationProps {
  currentPage: number;
  totalPage: number;
  perPage: number;
  handlePagination: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  perPage,
  totalPage,
  handlePagination,
}) => {
  return (
    <div className={clsx("join", [{ hidden: totalPage <= 1 }])}>
      <button
        disabled={currentPage <= 1}
        className="join-item btn"
        onClick={() => {
          handlePagination(currentPage >= 1 ? currentPage - 1 : currentPage);
        }}
      >
        Prev
      </button>
      {Array(totalPage)
        .fill(0)
        .map((_, index) => (
          <button
            onClick={() => handlePagination(index + 1)}
            className={clsx("join-item btn", [
              { "btn-active": index + 1 === currentPage },
            ])}
            key={index}
          >
            {index + 1}
          </button>
        ))}
      <button
        disabled={currentPage >= totalPage}
        className="join-item btn"
        onClick={() =>
          handlePagination(
            currentPage < totalPage ? currentPage + 1 : currentPage,
          )
        }
      >
        Next
      </button>
    </div>
  );
};
