import React from "react";
import Link from "next/link";
//libs
import { cn } from "@/lib/utils";
//types
import { SortFilterItem } from "@/types";
//hooks
import useAddQuery from "@/hooks/useAddQuery";

const SortItem = ({
  title,
  slug,
  index,
}: SortFilterItem & { index: number }) => {
  const { searchParams, addUrlParams } = useAddQuery();
  const sortBy = searchParams.get("sort");
  const active = sortBy === slug;

  const DynamicTag = active ? "p" : Link;

  return (
    <DynamicTag
      href={addUrlParams("sort", slug)}
      prefetch={!active ? false : undefined}
      className={cn("block px-4 py-2 text-sm text-gray-500", {
        "font-medium text-gray-900": active,
      })}
      role="menuitem"
      id={`menu-item-${index}`}
    >
      {title}
    </DynamicTag>
  );
};

export default SortItem;
