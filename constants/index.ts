import { SortFilterItem } from "@/types";

export const SELECT_SORTING: SortFilterItem[] = [
  { title: "Price: Low to high", slug: "price-asc" },
  { title: "Price: High to low", slug: "price-desc" },
  { title: "Mileage: Low to High", slug: "mileage-asc" },
  { title: "Mileage: High to low", slug: "mileage-desc" },
];

export const TAGS = {
  vehicles: "vehicles",
  singleVehicle: "singleVehicle",
};
