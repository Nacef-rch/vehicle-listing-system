import { NextResponse } from "next/server";

import { fetchVehicles } from "@/lib/api";

export async function GET(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || undefined;
    const min = searchParams.get("min")
      ? Number(searchParams.get("min"))
      : undefined;
    const max = searchParams.get("max")
      ? Number(searchParams.get("max"))
      : undefined;
    const sort = searchParams.get("sort") || "price-asc";
    const page = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    const limit = searchParams.get("limit")
      ? Number(searchParams.get("limit"))
      : 10;

    const result = await fetchVehicles({ query, min, max, sort, page, limit });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in GET /api/v1/vehicles:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
