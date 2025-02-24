"use client";

import Form from "next/form";
import { useSearchParams } from "next/navigation";
//libs
import { Input } from "./input";
import { cn } from "@/lib/utils";
//components
import { SearchIcon } from "lucide-react";

type defaultProps = {
  formAction: string;
  searchParam: string;
  className?: string;
  placeHolder?: string;
  showButton?: boolean;
  showIcon?: boolean;
};

type SearchProps = defaultProps & React.ComponentProps<"input">;

const Search = ({
  formAction,
  searchParam,
  className,
  placeHolder = "",
  showButton = true,
  showIcon = true,
  ...rest
}: SearchProps) => {
  const searchParams = useSearchParams();

  return (
    <Form
      action={formAction ?? ""}
      className={cn("relative w-full xl:w-full", className)}
      role="search"
      aria-label="Search form"
    >
      <Input
        key={searchParams?.get(searchParam)}
        type="text"
        name={searchParam}
        placeholder={placeHolder}
        autoComplete="off"
        defaultValue={searchParams?.get(searchParam) || ""}
        aria-label={`Search input for ${searchParam}`}
        aria-placeholder={placeHolder}
        {...rest}
      />
      {showButton && (
        <button
          className="absolute right-0 top-0 mr-3 flex h-full cursor-pointer items-center"
          type="submit"
          aria-label="Submit search"
          tabIndex={0}
        >
          {showIcon && <SearchIcon className="h-4" />}
        </button>
      )}
    </Form>
  );
};

Search.displayName = "Search";

export { Search };
