"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/utils";

const useAddQuery = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());

  const addUrlParams = (key: string, value: string | number) => {
    newParams.set(key, value.toString());
    return createUrl(pathname, newParams);
  };
  return {
    pathname,
    searchParams,
    addUrlParams,
  };
};

export default useAddQuery;
