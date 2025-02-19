import React from "react";
//libs
import { Vehicle } from "@/types/vehicle";
import { vehicleName } from "@/lib/utils";
//components
import VehicleCard from "./vehicle-card/vehicle-card";

const VehiclesList = ({ data }: { data: Vehicle[] }) => {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
      {data.map((car, index) => (
        <VehicleCard
          key={car.id}
          id={car.id}
          index={index}
          images={car.images}
          title={vehicleName(car.brand, car.model)}
          seats={car.seats}
          color={car.color}
          price={car.price}
          batteryCapacity={car.battery_capacity_kWh}
          chargingSpeed={car.charging_speed_kW}
          range={car.range_km}
        />
      ))}
    </div>
  );
};

export default VehiclesList;
