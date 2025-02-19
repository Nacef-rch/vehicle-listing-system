import React, { Suspense } from "react";
import Link from "next/link";
//components
import PriceFilter from "../_components/price-filter";
import { Search } from "@/components/search-input";
import Separator from "@/components/separator";

const SideBar = () => {
  return (
    <div className="flex flex-col gap-3 bg-white p-5">
      <Link
        className="float-right text-sm text-slate-700 underline hover:text-gray-900"
        href="/vehicles"
      >
        Clear Filters
      </Link>
      <Suspense fallback={null}>
        <Search
          formAction="/vehicles"
          searchParam="query"
          placeHolder="Search for vehicles.."
          name="search"
        />
        <Separator />
        <PriceFilter />
      </Suspense>
    </div>
  );
};

export default SideBar;
