"use server";
//libs
import { createApiUrl, createUrl } from "@/lib/utils";
//types
import { Vehicle, VehiclesSearchParams } from "@/types/vehicle";
//constants
import { TAGS } from "@/constants";

export async function getVehiclesApi(
  searchParams: VehiclesSearchParams | undefined
): Promise<{ count: number; data: Vehicle[] }> {
  const queryString = searchParams
    ? createUrl("", new URLSearchParams(searchParams as Record<string, string>))
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
    // You might throw an error or handle it accordingly
    throw new Error(`Failed to fetch vehicles: ${res.statusText}`);
  }

  return await res.json();
}
