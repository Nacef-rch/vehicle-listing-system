type SortOptions = "price-asc" | "price-desc" | "mileage-asc" | "mileage-desc";

export type SortFilterItem = {
  title: string;
  slug: SortOptions;
};
