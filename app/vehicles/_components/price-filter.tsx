"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
//hooks
import useDebounce from "@/hooks/useDebounce";
import useAddQuery from "@/hooks/useAddQuery";
import useMounted from "@/hooks/useMounted";
//libs
import { createUrl, formatMoney } from "@/lib/utils";
//constants
import { MIN_MAX_VALUES } from "../_constants";
//components
import { DualRangeSlider } from "@/components/slider";

const PriceFilter = () => {
  const router = useRouter();
  const { pathname, searchParams } = useAddQuery();
  //Check if component is mounted to display a heavy calculation
  //Using the useMounted hook here cause the useRef hook does a hydration on double rerender
  const isMounted = useMounted()();

  // Memoize the heavy calculation so that it only runs once.
  const heavyCalculation = useMemo(() => {
    let total = 0;
    for (let i = 0; i < 100_000; i++) {
      total += i;
    }
    return total;
  }, []);

  //get default values from link above
  const [values, setValues] = useState<[number, number]>([
    +(searchParams.get("min") ?? MIN_MAX_VALUES[0]),
    +(searchParams.get("max") ?? MIN_MAX_VALUES[1]),
  ]);
  const debounceUrlUpdate = useDebounce((value) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("min", Math.min(...value).toString());
    newParams.set("max", Math.max(...value).toString());
    router.push(createUrl(pathname, newParams));
  }, 300);

  const handleValueChange = useCallback(
    (newValues: [number, number]) => {
      setValues(newValues);
      debounceUrlUpdate(newValues);
    },
    [debounceUrlUpdate]
  );

  return (
    <div className="mt-3 rounded-md border border-gray-200 bg-slate-50 p-1">
      <p className="text-sm text-muted-foreground">Price Filter</p>
      <div className="mt-10 w-full p-2">
        <DualRangeSlider
          label={(value) => {
            return formatMoney(value);
          }}
          value={values}
          onValueChange={handleValueChange}
          min={MIN_MAX_VALUES[0]}
          max={MIN_MAX_VALUES[1]}
          step={999}
        />
      </div>
      {isMounted && <MemorizedComponent heavyCalculation={heavyCalculation} />}
    </div>
  );
};

const HeavyComponent = ({ heavyCalculation }: { heavyCalculation: number }) => {
  // Track the number of renders using our custom hook.
  const countRef = React.useRef(0);
  const renderTimes = countRef.current++;

  return (
    <>
      <p className="mt-14 text-xs">Memorized Inside The Range slider:</p>
      <p className="mt-5 rounded-md bg-slate-900 p-4 text-white">
        Rerender count: {renderTimes}
      </p>
      <p className="mt-5 text-white">Heavy Calculation: {heavyCalculation}</p>
    </>
  );
};

const MemorizedComponent = React.memo(HeavyComponent);

export default PriceFilter;
