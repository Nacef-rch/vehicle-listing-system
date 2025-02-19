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
    <div className="mt-10 flex justify-center border-t border-gray-200 py-4">
      <Pagination>
        <PaginationContent>
          {currentPage !== 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={addUrlParams("page", currentPage - 1)}
              />
            </PaginationItem>
          )}

          {pageNumbers.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            const isActive = page === currentPage;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href={addUrlParams("page", page)}
                  isActive={isActive}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {!(currentPage === totalPages) && (
            <PaginationItem>
              <PaginationNext href={addUrlParams("page", currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
      <ul className="flex items-center gap-3">
        <p className="text-md font-semibold text-muted-foreground">Limit:</p>
        {[6, 12, 18].map((pageLimit) => (
          <li
            key={pageLimit}
            className={cn(
              "flex size-8 items-center justify-center rounded-lg bg-slate-200",
              {
                "bg-slate-900 text-white": pageLimit === limit,
              }
            )}
          >
            <Link prefetch={true} href={addUrlParams("limit", pageLimit)}>
              {pageLimit}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehiclePagination;
