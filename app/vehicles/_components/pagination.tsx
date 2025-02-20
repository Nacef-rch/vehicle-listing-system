"use client";

import Link from "next/link";
//hooks
import useAddQuery from "@/hooks/useAddQuery";
//libs
import { generatePageNumbers } from "../_lib/utils";
import { cn } from "@/lib/utils";
//components
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/pagination";

type VehiclesPageProps = {
  currentPage: number;
  totalPages: number;
  limit?: number;
};

const VehiclePagination = ({
  currentPage,
  totalPages,
  limit,
}: VehiclesPageProps) => {
  const { addUrlParams } = useAddQuery();
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = generatePageNumbers(totalPages, currentPage);

  return (
    <div
      className="mt-10 flex flex-wrap justify-center gap-5 border-t border-gray-200 py-4 md:flex-nowrap md:gap-0"
      aria-label="Pagination Navigation"
    >
      <Pagination>
        <PaginationContent>
          {currentPage !== 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={addUrlParams("page", currentPage - 1)}
                aria-label="Go to previous page"
              />
            </PaginationItem>
          )}

          {pageNumbers.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis aria-hidden="true" />
                </PaginationItem>
              );
            }

            const isActive = page === currentPage;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href={addUrlParams("page", page)}
                  isActive={isActive}
                  tabIndex={0}
                  aria-label={`Go to page ${page}`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {!(currentPage === totalPages) && (
            <PaginationItem>
              <PaginationNext
                href={addUrlParams("page", currentPage + 1)}
                aria-label="Go to next page"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
      <div className="flex items-center gap-3">
        <p className="text-md font-semibold text-muted-foreground">Limit:</p>
        <ul className="flex items-center gap-3" aria-label="Items per page">
          {[6, 12, 18].map((pageLimit) => (
            <li
              key={pageLimit}
              className={cn(
                "flex size-8 items-center justify-center rounded-lg bg-slate-200",
                { "bg-slate-900 text-white": pageLimit === limit }
              )}
            >
              <Link
                prefetch={true}
                href={addUrlParams("limit", pageLimit)}
                aria-label={`Show ${pageLimit} items per page`}
              >
                {pageLimit}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VehiclePagination;
