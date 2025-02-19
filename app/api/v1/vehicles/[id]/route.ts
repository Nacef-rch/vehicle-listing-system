import { NextRequest, NextResponse } from "next/server";

import vehiclesData from "@/mocks/vehicles.json";
import { delay } from "@/lib/utils";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const vehicle = vehiclesData.data.find((v) => v.id === id);

    // Uncomment the env variable to simulate a delay
    if (process.env.DELAY_MS) {
      await delay(Number(process.env.DELAY_MS));
    }

    if (!vehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error("Error in GET /api/v1/vehicles/[id]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
