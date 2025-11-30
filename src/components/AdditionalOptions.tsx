import React from "react";
import {PriceModifier, ProjectType} from "../types";
import {ADDITIONAL_OPTIONS} from "../config/appConfig";
import {Tooltip} from "./Tooltip";

interface AdditionalOptionsProps {
  priceModifiers: PriceModifier;
  onChange: (modifiers: PriceModifier) => void;
  selectedTypes: ProjectType[];
}

export const AdditionalOptions: React.FC<AdditionalOptionsProps> = ({
  priceModifiers,
  onChange,
  selectedTypes,
}) => {
  const isTiktokOnly =
    selectedTypes.length === 1 && selectedTypes[0] === "social";

  // Filtrer les options selon le type de projet
  const availableOptions = ADDITIONAL_OPTIONS.filter((option) => {
    if (option.excludeForTiktok && isTiktokOnly) return false;
    if (option.onlyForTiktok && !isTiktokOnly) return false;
    return true;
  });

  return (
    <div className="space-y-3">
      {availableOptions.map((option) => (
        <div
          key={option.id}
          className="flex items-center justify-between border-2 border-cyan-200 dark:border-cyan-700 rounded p-3 bg-white dark:bg-gray-800"
        >
          <label className="flex items-center gap-3 cursor-pointer w-full">
            <input
              type="checkbox"
              checked={priceModifiers[option.id] || false}
              onChange={(e) =>
                onChange({...priceModifiers, [option.id]: e.target.checked})
              }
              className="w-5 h-5 rounded border-cyan-300 text-cyan-500"
            />
            <div className="flex items-center">
              <span className="text-lg dark:text-white">{option.label}</span>
              {option.description && <Tooltip text={option.description} />}
            </div>
          </label>
          <span className="font-bold text-lg text-green-500 dark:text-green-400">
            +{option.price}€
          </span>
        </div>
      ))}
    </div>
  );
};
