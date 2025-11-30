import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {Tooltip} from "@/components/Tooltip";

interface DiscountSelectorProps {
  discount: number;
  onChange: (discount: number) => void;
}

export const DiscountSelector: React.FC<DiscountSelectorProps> = ({
  discount,
  onChange,
}) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1">
        Réduction applicable
        <Tooltip text="Uniquement accordées si V-Pictures vous a accordé une réduction au préalable." />
      </label>
      <Select
        value={discount.toString()}
        onValueChange={(value) => onChange(parseFloat(value))}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Aucune réduction</SelectItem>
          <SelectItem value="10">-10% de réduction</SelectItem>
          <SelectItem value="20">-20% de réduction</SelectItem>
        </SelectContent>
      </Select>
      {discount > 0 && (
        <p className="text-sm text-muted-foreground">
          Une réduction de {discount}% sera appliquée au total
        </p>
      )}
    </div>
  );
};
