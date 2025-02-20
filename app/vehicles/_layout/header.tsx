import React from "react";
import { SELECT_SORTING } from "@/constants";
import SortSelect from "@/components/sort-select/sort-select";

type HeaderProps = {
  title: string;
};

export const experimental_ppr = true;

const Header = ({ title }: HeaderProps) => {
  return (
    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        {title}
      </h1>
      <SortSelect title="Sort by" sortList={SELECT_SORTING} />
    </div>
  );
};

export default Header;
