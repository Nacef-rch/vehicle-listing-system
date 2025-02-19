import * as React from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/carousel";

export function VehicleCarousel({
  title,
  images,
}: {
  title: string;
  images: string[];
}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full max-w-xs"
    >
      <CarouselContent className="-ml-1 h-[450px]">
        {images.map((src, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Image
                loading={index < 3 ? "eager" : "lazy"}
                src={src}
                alt={`${title} - ${index + 1}`}
                width={317}
                height={175.5}
                quality={50}
                className="w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
