import { VehiclesSearchParams } from "@/types/vehicle";

export async function extractSearchParams(
  searchParamsPromise: Promise<VehiclesSearchParams>
): Promise<VehiclesSearchParams> {
  const {
    query = "",
    page = 1,
    limit = 10,
    min = "",
    max = "",
  } = await searchParamsPromise;

  return {
    query: query.toLowerCase(),
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    min,
    max,
  };
}

export const generatePageNumbers = (
  totalPages: number,
  currentPage: number
) => {
  const pages: (number | "ellipsis")[] = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    const delta = 1;
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);
    if (start > 2) {
      pages.push("ellipsis");
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (end < totalPages - 1) {
      pages.push("ellipsis");
    }
    pages.push(totalPages);
  }

  return pages;
};
