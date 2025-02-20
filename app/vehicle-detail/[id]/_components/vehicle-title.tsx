import React from "react";
//libs
import { EuroIcon } from "lucide-react";
//components
import ColorLabel, { ColorSize } from "@/components/color-label";
import { Badge } from "@/components/badge";

type VehicleTitleProps = {
  vehicleTitle: string;
  condition: string;
  color: string;
  price: number;
};

const VehicleTitle = ({
  vehicleTitle,
  condition,
  color,
  price,
}: VehicleTitleProps) => {
  return (
    <div className="mt-1 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-0">
      <div className="flex flex-wrap gap-3 sm:items-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {vehicleTitle}
        </h1>
        <div className="flex items-center gap-3">
          <Badge className="text-xs">{condition}</Badge>
          <ColorLabel color={color} size={ColorSize.Medium} />
        </div>
      </div>

      <p className="mr-5 flex items-center gap-1 text-2xl font-bold text-gray-900">
        {price} <EuroIcon />
      </p>
    </div>
  );
};

export default VehicleTitle;
