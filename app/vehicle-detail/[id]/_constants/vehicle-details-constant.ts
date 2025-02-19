import { Vehicle } from "@/types/vehicle";

export const vehicleAttributesMapper: Partial<Record<keyof Vehicle, string>> = {
  year: "Year",
  seats: "Seats",
  kilometer_count: "Mileage (km)",
  range_km: "Range (km)",
  battery_capacity_kWh: "Battery Capacity (kWh)",
  charging_speed_kW: "Charging Speed (kW)",
  drivetrain: "Drivetrain",
  location: "Location",
  autopilot: "Autopilot",
  // accidents: "Accidents",
  // accident_description: "Accident Description",
};
