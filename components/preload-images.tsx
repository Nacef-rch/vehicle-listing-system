"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import React, { forwardRef, useState, useTransition } from "react";
import Image from "next/image";

// Global cache so that we don't render hidden divs more than once per image URL.
const prefetchedCache = new Set<string>();

type LinkProps = React.ComponentPropsWithoutRef<typeof NextLink> & {
  images: string[];
};

// This Component used to prefetch images before navigation so we can cache them on disk for faster load
const PreloadImagesLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, images = [], ...props }, ref) => {
    const router = useRouter();
    // State to hold the list of image URLs we need to render hidden.
    const [prefetchedImages, setPrefetchedImages] = useState<string[]>([]);
    // useTransition lets us schedule the state update without blocking UI.
    const [isPending, startTransition] = useTransition();

    const handleMouseEnter = () => {
      if (isPending) return;
      startTransition(() => {
        router.prefetch(String(props.href));
        // Only add new images that haven't been prefetched yet.
        const newImages = images.filter((src) => !prefetchedCache.has(src));
        if (newImages.length) {
          newImages.forEach((src) => prefetchedCache.add(src));
          setPrefetchedImages((prev) => [...prev, ...newImages]);
        }
      });
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const url = new URL(String(props.href), window.location.href);
      if (
        url.origin === window.location.origin &&
        e.button === 0 &&
        !e.altKey &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey
      ) {
        e.preventDefault();
        router.push(String(props.href));
      }
    };

    return (
      <>
        <NextLink
          ref={ref}
          prefetch={false}
          onMouseEnter={handleMouseEnter}
          onMouseDown={handleMouseDown}
          {...props}
        >
          {children}
        </NextLink>
        {prefetchedImages.map((src, index) => (
          <div
            key={src}
            style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              overflow: "hidden",
              opacity: 0,
            }}
          >
            {index === 0 && (
              <Image
                src={src}
                alt=""
                loading="eager"
                width={725}
                height={434}
                quality={75}
              />
            )}
            <Image
              src={src}
              alt=""
              loading="eager"
              width={317}
              height={175.5}
              quality={50}
            />
          </div>
        ))}
      </>
    );
  }
);

PreloadImagesLink.displayName = "PreloadImagesLink";

export { PreloadImagesLink };
