import React from 'react';
import { PriceModifier, AdditionalOption } from '../types';

interface AdditionalOptionsProps {
  priceModifiers: PriceModifier;
  onChange: (modifiers: PriceModifier) => void;
}

const additionalOptions: AdditionalOption[] = [
  { id: 'shootingServer', label: 'Serveur de tournage', price: 5 },
  { id: 'guideline', label: 'Création de la ligne directrice', price: 5 },
  { id: 'script', label: 'Création du script', price: 5 }
];

export const AdditionalOptions: React.FC<AdditionalOptionsProps> = ({
  priceModifiers,
  onChange,
}) => {
  return (
    <div className="space-y-3">
      {additionalOptions.map((option) => (
        <div
          key={option.id}
          className="flex items-center justify-between border-2 border-cyan-200 rounded p-3 bg-white"
        >
          <label className="flex items-center gap-3 cursor-pointer w-full">
            <input
              type="checkbox"
              checked={priceModifiers[option.id]}
              onChange={(e) => onChange({...priceModifiers, [option.id]: e.target.checked})}
              className="w-5 h-5 rounded border-cyan-300 text-cyan-500"
            />
            <span className="text-lg">{option.label}</span>
          </label>
          <span className="font-bold text-lg text-green-500">
            +{option.price}€
          </span>
        </div>
      ))}
    </div>
  );
};