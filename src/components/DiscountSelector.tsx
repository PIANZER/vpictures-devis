import React from "react";

interface DiscountSelectorProps {
  discount: number;
  onChange: (discount: number) => void;
}

export const DiscountSelector: React.FC<DiscountSelectorProps> = ({
  discount,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-lg font-medium dark:text-white">
        Réduction applicable
      </label>
      <select
        value={discount}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full p-3 border-2 border-cyan-200 dark:border-cyan-700 dark:bg-gray-800 dark:text-white rounded-lg text-lg focus:outline-none focus:border-cyan-400"
      >
        <option value={0}>Aucune réduction</option>
        <option value={10}>-10% de réduction</option>
        <option value={20}>-20% de réduction</option>
      </select>
      {discount > 0 && (
        <p className="text-sm text-green-600 dark:text-green-400 italic">
          Une réduction de {discount}% sera appliquée au total
        </p>
      )}
    </div>
  );
};
