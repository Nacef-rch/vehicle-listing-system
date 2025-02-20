"use client";
import * as React from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/carousel";
import useMedia from "@/hooks/useMedia";
import { cn } from "@/lib/utils";

export function VehicleCarousel({
  title,
  images,
}: {
  title: string;
  images: string[];
}) {
  const isVertical = useMedia("(min-width: 1023px)", false);
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation={isVertical ? "vertical" : "horizontal"}
      className="mx-10 w-auto lg:w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label={`Image carousel for ${title}`}
    >
      <CarouselContent
        className={cn("-ml-1 w-full", {
          "h-[450px]": isVertical,
        })}
      >
        {images.map((src, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 pl-1 md:basis-1/3"
            tabIndex={index}
          >
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
      <CarouselPrevious aria-label="Previous image" />
      <CarouselNext aria-label="Next page" />
    </Carousel>
  );
}
