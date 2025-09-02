"use client";

import { useCallback, useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";

type PriceRangeProps = {
  min?: number;
  max?: number;
  step?: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function PriceRange({
  min = 0,
  max = 100,
  step = 1,
}: PriceRangeProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentMinPrice = searchParams.get("min_price");
  const currentMaxPrice = searchParams.get("max_price");

  const initialMin = currentMinPrice ? parseFloat(currentMinPrice) : min;
  const initialMax = currentMaxPrice ? parseFloat(currentMaxPrice) : max;

  const [internalRange, setInternalRange] = useState<[number, number]>([
    initialMin,
    initialMax,
  ]);

  useEffect(() => {
    // Sync internal state with URL params
    const syncedMin = currentMinPrice ? parseFloat(currentMinPrice) : min;
    const syncedMax = currentMaxPrice ? parseFloat(currentMaxPrice) : max;
    setInternalRange([syncedMin, syncedMax]);
  }, [currentMinPrice, currentMaxPrice, min, max]);

  const [minValue, maxValue] = internalRange;

  const handleApplyFilter = useCallback(
    (newMin: number, newMax: number) => {
      const newSearchParams = new URLSearchParams(
        Array.from(searchParams.entries())
      );
      newSearchParams.set("minPrice", newMin.toString());
      newSearchParams.set("maxPrice", newMax.toString());

      router.push(`/courses?${newSearchParams.toString()}`, {
        scroll: false,
      });
    },
    [searchParams, router]
  );

  const handleSliderChange = useCallback(
    (newValues: number[]) => {
      const next: [number, number] = [
        clamp(newValues[0] ?? min, min, max),
        clamp(newValues[1] ?? max, min, max),
      ];
      setInternalRange(next);
      handleApplyFilter(next[0], next[1]);
    },
    [handleApplyFilter, max, min]
  );

  const handleMinInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextMin = clamp(Number(e.target.value || 0), min, maxValue);
      const next: [number, number] = [nextMin, maxValue];
      setInternalRange(next);
      handleApplyFilter(next[0], next[1]);
    },
    [handleApplyFilter, maxValue, min]
  );

  const handleMaxInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextMax = clamp(Number(e.target.value || 0), minValue, max);
      const next: [number, number] = [minValue, nextMax];
      setInternalRange(next);
      handleApplyFilter(next[0], next[1]);
    },
    [handleApplyFilter, max, minValue]
  );

  return (
    <div className="flex flex-col gap-3">
      <Slider
        min={min}
        max={max}
        step={step}
        value={[minValue, maxValue]}
        onValueChange={handleSliderChange}
      />
      <div className="flex items-center gap-2">
        <div className="flex w-full items-center gap-1">
          <Input
            type="number"
            inputMode="numeric"
            value={minValue}
            min={min}
            max={maxValue}
            onChange={handleMinInput}
            placeholder="min"
          />
        </div>
        <span className="text-base-content/70 text-xs">to</span>
        <div className="flex w-full items-center gap-1">
          <Input
            type="number"
            inputMode="numeric"
            value={maxValue}
            min={minValue}
            max={max}
            onChange={handleMaxInput}
            placeholder="max"
          />
        </div>
      </div>
    </div>
  );
}
