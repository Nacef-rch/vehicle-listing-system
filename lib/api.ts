//will export the getAllVehicles function + getVehicleById logic here to use api route in dev mode and server action in prod mode
//cause It requires the server to be running at (in the example above) localhost:3000.
//That is fulfilled during development mode and during runtime (next start), so the fetch works fine there.
//But during build, the server is not running, so the fetch fails.
//https://nextjs-faq.com/fetch-api-in-rsc

import vehiclesData from "@/mocks/vehicles.json";
import { Vehicle } from "@/types/vehicle";
import { delay } from "@/lib/utils";

export async function fetchVehicles({
  query,
  min,
  max,
  sort = "price-asc",
  page = 1,
  limit = 10,
}: {
  query?: string;
  min?: number;
  max?: number;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<{ count: number; data: Vehicle[] }> {
  let vehicles: Vehicle[] = vehiclesData.data;

  // Filter by search term if provided
  if (query) {
    vehicles = vehicles.filter((v) =>
      `${v.brand} ${v.model}`.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Filter by price range
  if (min !== undefined && !isNaN(min) && max !== undefined && !isNaN(max)) {
    vehicles = vehicles.filter((v) => v.price >= min && v.price <= max);
  } else if (min !== undefined && !isNaN(min)) {
    vehicles = vehicles.filter((v) => v.price >= min);
  } else if (max !== undefined && !isNaN(max)) {
    vehicles = vehicles.filter((v) => v.price <= max);
  }

  // Sort vehicles
  vehicles.sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "mileage-asc":
        return a.kilometer_count - b.kilometer_count;
      case "mileage-desc":
        return b.kilometer_count - a.kilometer_count;
      default:
        return 0;
    }
  });

  // Pagination
  const start = (page - 1) * limit;
  const end = start + limit;

  // Simulate delay if configured
  if (process.env.DELAY_MS) {
    await delay(Number(process.env.DELAY_MS));
  }

  return {
    count: vehicles.length,
    data: vehicles.slice(start, end),
  };
}

export async function fetchVehicleById(
  id: string
): Promise<Vehicle | undefined> {
  // Simulate delay if the env variable is set
  if (process.env.DELAY_MS) {
    await delay(Number(process.env.DELAY_MS));
  }

  return vehiclesData.data.find((v) => v.id === id);
}
