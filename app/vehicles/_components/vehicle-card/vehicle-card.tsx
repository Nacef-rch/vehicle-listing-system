import React from "react";

import NextImage from "next/image";
//components
import CardDescription from "./card-description";
import { PreloadImagesLink } from "@/components/preload-images";

type Props = {
  id: string;
  index: number;
  images: string[];
  title: string;
  color: string;
  price: number;
  seats: number;
  batteryCapacity: number;
  chargingSpeed: number;
  range: number;
};

const VehicleCard = ({ id, index, images, ...props }: Props) => {
  return (
    <PreloadImagesLink
      className="group text-gray-700"
      href={`/vehicle-detail/${id}`}
      prefetch={true}
      images={images.slice(1, 5)}
      aria-label={`View details of ${props.title}`}
      tabIndex={index}
    >
      <NextImage
        loading={index < 9 ? "eager" : "lazy"}
        decoding="sync"
        src={images[0]}
        alt={props.title}
        width={277}
        height={156}
        quality={65}
        className="xl:aspect-7/8 aspect-7/8 w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
      />
      <CardDescription {...props} />
    </PreloadImagesLink>
  );
};

export default VehicleCard;
