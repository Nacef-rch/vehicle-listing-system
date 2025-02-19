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
    <div className="mt-1 flex items-center justify-between px-4 sm:px-0">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {vehicleTitle}
        </h1>
        <Badge className="text-xs">{condition}</Badge>
        <ColorLabel color={color} size={ColorSize.Medium} />
        <span
          aria-hidden="true"
          className={`size-${10} rounded-full border border-black/30 opacity-70`}
          style={{ backgroundColor: color.toLowerCase() }}
        ></span>
      </div>

      <p className="mr-5 flex items-center gap-1 text-2xl font-bold text-gray-900">
        {price} <EuroIcon />
      </p>
    </div>
  );
};

export default VehicleTitle;
