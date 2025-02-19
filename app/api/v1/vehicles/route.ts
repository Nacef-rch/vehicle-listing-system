import { NextResponse } from "next/server";

import { Vehicle } from "@/types/vehicle";
import vehiclesData from "@/mocks/vehicles.json";
import { delay } from "@/lib/utils";

export async function GET(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("query");
    const minStr = searchParams.get("min");
    const maxStr = searchParams.get("max");
    const sort = searchParams.get("sort") || "price-asc";
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    let vehicles: Vehicle[] = vehiclesData.data;

    // Filter by search term if provided
    if (search) {
      vehicles = vehicles.filter((v) =>
        `${v.brand} ${v.model}`.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Convert string parameters to numbers
    const min = minStr ? Number(minStr) : undefined;
    const max = maxStr ? Number(maxStr) : undefined;

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

    // Uncomment the env variable to simulate a delay
    if (process.env.DELAY_MS) {
      await delay(Number(process.env.DELAY_MS));
    }

    return NextResponse.json({
      count: vehicles.length,
      data: vehicles.slice(start, end),
    });
  } catch (error) {
    console.error("Error in GET /api/v1/vehicles:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
