"use client";
import React, { useEffect, useRef, useState } from "react";
//libs
import { ChevronDown } from "lucide-react";
//types
import { SortFilterItem } from "@/types";
//components
import SortItem from "./sort-item";

type SortSelectProps = {
  title: string;
  sortList: SortFilterItem[];
};
//Creating a custom Select so we can have link as input and prefetch page for faster load time
const SortSelect = ({ title, sortList }: SortSelectProps) => {
  const [openSelect, setOpenSelect] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <div>
        <button
          type="button"
          className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
          id="menu-button"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={() => {
            setOpenSelect(!openSelect);
          }}
        >
          {title}
          <ChevronDown className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500" />
        </button>
      </div>

      {openSelect && (
        <div
          className="focus:outline-hidden absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {sortList.map((item: SortFilterItem, i) => (
              <SortItem
                key={item.slug}
                slug={item.slug}
                title={item.title}
                index={i}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortSelect;
