"use server";
//libs
import { createApiUrl } from "@/lib/utils";
//types
import { Vehicle } from "@/types/vehicle";
//constants
import { TAGS } from "@/constants";
import { fetchVehicleById } from "@/lib/api";

export async function getVehicleById(id: string): Promise<Vehicle> {
  if (process.env.NODE_ENV === "production") {
    // In production, use the shared function directly
    const vehicle = await fetchVehicleById(id);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }
    return vehicle;
  } else {
    const res = await fetch(
      `${createApiUrl()}/vehicles/${id}`,
      process.env.DISABLE_APP_CACHE
        ? {}
        : {
            cache: "force-cache",
            next: { tags: [TAGS.singleVehicle] },
          }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch vehicle with id ${id}`);
    }

    return await res.json();
  }
}
