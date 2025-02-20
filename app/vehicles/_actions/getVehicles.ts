"use server";
//libs
import { createApiUrl, createUrl } from "@/lib/utils";
//types
import { Vehicle, VehiclesSearchParams } from "@/types/vehicle";
//constants
import { TAGS } from "@/constants";
import { fetchVehicles } from "@/lib/api";

export async function getVehiclesApi(
  searchParams: VehiclesSearchParams | undefined
): Promise<{ count: number; data: Vehicle[] }> {
  if (process.env.NODE_ENV === "production") {
    const query = searchParams?.query;
    const min = searchParams?.min ? Number(searchParams.min) : undefined;
    const max = searchParams?.max ? Number(searchParams.max) : undefined;
    const sort = searchParams?.sort || "price-asc";
    const page = searchParams?.page ? Number(searchParams.page) : 1;
    const limit = searchParams?.limit ? Number(searchParams.limit) : 10;

    return await fetchVehicles({ query, min, max, sort, page, limit });
  } else {
    // In development mode, call the API route via HTTP
    const queryString = searchParams
      ? createUrl(
          "",
          new URLSearchParams(searchParams as Record<string, string>)
        )
      : "";

    const res = await fetch(
      `${createApiUrl()}/vehicles${queryString}`,
      process.env.ENABLE_APP_CACHE
        ? {
            cache: "force-cache",
            next: { tags: [TAGS.vehicles] },
          }
        : {}
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch vehicles: ${res.statusText}`);
    }

    return await res.json();
  }
}
