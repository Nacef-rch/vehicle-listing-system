import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
//Actions
import { getVehicleById } from "./_actions/getVehicleById";
//libs
import { vehicleName } from "@/lib/utils";
//components
import VehicleTitle from "./_components/vehicle-title";
import { VehicleCarousel } from "./_components/carousel";
import VehicleDescription from "./_components/vehicle-description";
import AlertDialog from "@/components/alert-dialog";

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const id = (await params).id;
    if (!id) {
      redirect("/vehicles");
    }

    const vehicle = await getVehicleById(id);
    if (!vehicle) {
      redirect("/vehicles");
    }

    const vehicleTitle = vehicleName(vehicle?.brand, vehicle?.model);

    return (
      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl">
        <div className="lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <Image
            src={vehicle?.images[0]}
            loading="eager"
            priority
            alt={`${vehicleTitle} - 0`}
            className="col-span-2 size-full rounded-lg bg-gray-200 object-cover lg:block"
            width={725}
            height={434}
            quality={75}
          />

          <VehicleCarousel title={vehicleTitle} images={vehicle.images} />
        </div>
        <div className="px-10 lg:p-10">
          <VehicleTitle
            vehicleTitle={vehicleTitle}
            condition={vehicle.condition}
            color={vehicle.color}
            price={vehicle.price}
          />
          <div className="mt-6 border-t border-gray-200">
            <VehicleDescription vehicle={vehicle} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <AlertDialog
        title="Error"
        description={"Something went wrong, please try again later"}
      />
    );
  }
}
