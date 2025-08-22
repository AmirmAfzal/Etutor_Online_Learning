"use client";

import { useCallback, useState } from "react";

import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

type PriceRangeProps = {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: [number, number];
  value?: [number, number];
  onChange?: (range: [number, number]) => void;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function PriceRange({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = [min, max],
  value,
  onChange,
}: PriceRangeProps) {
  const isControlled = Array.isArray(value);
  const [internalRange, setInternalRange] = useState<[number, number]>(
    (value as [number, number]) ?? defaultValue
  );

  const range = (isControlled ? value : internalRange) ?? defaultValue;

  const handleSliderChange = useCallback(
    (newValues: number[]) => {
      const next: [number, number] = [
        clamp(newValues[0] ?? min, min, max),
        clamp(newValues[1] ?? max, min, max),
      ];
      if (!isControlled) setInternalRange(next);
      onChange?.(next);
    },
    [isControlled, max, min, onChange]
  );

  const [minValue, maxValue] = range;

  const handleMinInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextMin = clamp(Number(e.target.value || 0), min, maxValue);
      const next: [number, number] = [nextMin, maxValue];
      if (!isControlled) setInternalRange(next);
      onChange?.(next);
    },
    [isControlled, maxValue, min, onChange]
  );

  const handleMaxInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextMax = clamp(Number(e.target.value || 0), minValue, max);
      const next: [number, number] = [minValue, nextMax];
      if (!isControlled) setInternalRange(next);
      onChange?.(next);
    },
    [isControlled, max, minValue, onChange]
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
