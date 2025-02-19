import React from "react";
import dynamic from "next/dynamic";
//Actions
import { getVehiclesApi } from "./_actions/getVehicles";
//Types
import { VehiclesSearchParams } from "@/types/vehicle";
//Components
import VehiclePagination from "./_components/pagination";
import NoVehiclesFound from "./_components/no-vehicles-found";

const DynamicVehiclesList = dynamic(
  () => import("./_components/vehicles-list")
);

type VehiclesPageProps = {
  searchParams?: Promise<VehiclesSearchParams>;
};

const VehiclesPage = async (props: VehiclesPageProps) => {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const pageLimit = Number(searchParams?.limit) || 10;

  const { data, count } = await getVehiclesApi(searchParams);

  if (data.length === 0) {
    return <NoVehiclesFound text="No vehicles found" />;
  }

  return (
    <div className="lg:col-span-3">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-2 sm:py-0 lg:max-w-7xl lg:px-1">
        <DynamicVehiclesList data={data} />
        <VehiclePagination
          totalPages={Math.ceil(count / pageLimit)}
          currentPage={currentPage}
          limit={pageLimit}
        />
      </div>
    </div>
  );
};

export default VehiclesPage;
