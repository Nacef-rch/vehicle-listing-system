import { SortFilterItem } from "@/types";

export const BASE_URL =
  process.env.APP_ENV === "PROD"
    ? `https://${process.env.PRODUCTION_URL}`
    : "http://localhost:3000";

export const API_END_POINT = "/api/v1";

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
