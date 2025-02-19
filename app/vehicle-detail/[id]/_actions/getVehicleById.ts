"use server";
//libs
import { createApiUrl } from "@/lib/utils";
//types
import { Vehicle } from "@/types/vehicle";
//constants
import { TAGS } from "@/constants";

export async function getVehicleById(id: string): Promise<Vehicle> {
  const res = await fetch(
    `${createApiUrl()}/vehicles/${id}`,
    process.env.ENABLE_APP_CACHE
      ? {
          cache: "force-cache",
          next: { tags: [TAGS.singleVehicle] },
        }
      : {}
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch vehicle with id ${id}`);
  }

  return await res.json();
}
