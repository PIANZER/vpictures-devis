import React from "react";
import {PriceModifier, ProjectType} from "../types";
import {ADDITIONAL_OPTIONS} from "../config/appConfig";
import {Tooltip} from "./Tooltip";
import {Switch} from "./ui/switch";

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
    <div className="space-y-2">
      {availableOptions.map((option) => (
        <div
          key={option.id}
          className="flex items-center justify-between space-x-4 rounded-lg border p-4 hover:bg-accent transition-colors"
        >
          <label className="flex items-center gap-3 cursor-pointer flex-1">
            <Switch
              checked={priceModifiers[option.id] || false}
              onCheckedChange={(checked) =>
                onChange({...priceModifiers, [option.id]: checked})
              }
            />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {option.label}
              </span>
              {option.description && <Tooltip text={option.description} />}
            </div>
          </label>
          <span className="text-sm font-semibold text-muted-foreground">
            +{option.price}€
          </span>
        </div>
      ))}
    </div>
  );
};
