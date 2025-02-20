import { API_END_POINT, BASE_URL } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createUrl(pathname: string, params: URLSearchParams) {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;
  return `${pathname}${queryString}`;
}

export const createApiUrl = () => `${BASE_URL}${API_END_POINT}`;

export const isBrowser = typeof window !== "undefined";

export function vehicleName(brand: string, model: string) {
  return `${brand} ${model}`;
}

export function formatMoney(amount: number | undefined): string {
  if (!amount) return "";
  if (amount >= 1_000_000) {
    // Format millions
    return (amount / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (amount >= 1_000) {
    // Format thousands
    return (amount / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return amount.toString();
}
