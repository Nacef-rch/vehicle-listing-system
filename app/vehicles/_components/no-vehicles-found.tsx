import React from "react";

type NoVehiclesFoundProps = {
  text: string;
};

const NoVehiclesFound = ({ text }: NoVehiclesFoundProps) => {
  return (
    <div className="flex w-full items-center justify-center lg:col-span-3">
      <h2 className="text-center text-2xl font-bold text-slate-700">{text}</h2>
    </div>
  );
};

export default NoVehiclesFound;
