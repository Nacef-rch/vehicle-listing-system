import React from "react";
//types
import { Vehicle } from "@/types/vehicle";
//constants
import { vehicleAttributesMapper } from "../_constants/vehicle-details-constant";

const VehicleDescription = ({ vehicle }: { vehicle: Vehicle }) => {
  return (
    <dl className="grid grid-cols-1 gap-4 divide-gray-200 sm:grid-cols-2">
      {Object.entries(vehicleAttributesMapper).map(([key, label]) => {
        const typedKey = key as keyof Vehicle;
        const value = vehicle[typedKey];
        return (
          <div
            key={`${vehicle.id}-${key}`}
            className={
              "flex items-center justify-between px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 md:gap-10"
            }
          >
            <dt className="text-base font-bold text-gray-900">{label}</dt>
            <dd className="mt-1 text-base text-gray-700 sm:col-span-2 sm:mt-0">
              {value ? value : "N/A"}
            </dd>
          </div>
        );
      })}
    </dl>
  );
};

export default VehicleDescription;
