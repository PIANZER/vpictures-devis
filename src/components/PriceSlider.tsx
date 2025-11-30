import React from "react";
import {SliderConfig} from "../types";
import {Slider} from "./ui/slider";

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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
            {value} {unit}
          </div>
          <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
            {isPriceRange && typeof price === "object" && price !== null
              ? `${(price as {min: number; max: number}).min.toFixed(2)}€ - ${(
                  price as {min: number; max: number}
                ).max.toFixed(2)}€`
              : `+${typeof price === "number" ? price.toFixed(2) : "0.00"}€`}
          </div>
        </div>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        className="w-full"
      />
    </div>
  );
};
