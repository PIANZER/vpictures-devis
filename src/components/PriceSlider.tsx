import React from 'react';
import { SliderConfig } from '../types';

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
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-lg font-medium">{label}</label>
        <div className="flex items-center gap-4">
          <div className="px-4 py-1 bg-cyan-50 rounded border border-cyan-200">
            <span className="text-lg font-semibold text-cyan-700">
              {value} {unit}
            </span>
          </div>
          <div className="px-4 py-1 bg-green-50 rounded border border-green-200">
            <span className="text-lg font-semibold text-green-700">
              +{price.toFixed(2)}€
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
        className="w-full h-2 bg-cyan-100 rounded-lg appearance-none cursor-pointer accent-cyan-500"
      />
    </div>
  );
};