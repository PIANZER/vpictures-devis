import React from "react";
import {SliderConfig} from "../types";

export const PriceSlider: React.FC<SliderConfig> = ({
  label,
  value,
  unit,
  min,
  max,
  step,
  onChange,
  price,
}) => {
  const isPriceRange =
    typeof price === "object" &&
    price !== null &&
    "min" in price &&
    "max" in price;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-lg font-medium dark:text-white">{label}</label>
        <div className="flex items-center gap-4">
          <div className="px-4 py-1 bg-cyan-50 dark:bg-cyan-900 rounded border border-cyan-200 dark:border-cyan-700">
            <span className="text-lg font-semibold text-cyan-700 dark:text-cyan-300">
              {value} {unit}
            </span>
          </div>
          <div className="px-4 py-1 bg-green-50 dark:bg-green-900 rounded border border-green-200 dark:border-green-700">
            <span className="text-lg font-semibold text-green-700 dark:text-green-300">
              {isPriceRange && typeof price === "object" && price !== null
                ? `${(price as {min: number; max: number}).min.toFixed(
                    2
                  )}€ - ${(price as {min: number; max: number}).max.toFixed(
                    2
                  )}€`
                : `+${typeof price === "number" ? price.toFixed(2) : "0.00"}€`}
            </span>
          </div>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg appearance-none cursor-pointer accent-cyan-500"
      />
    </div>
  );
};
