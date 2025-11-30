import React from "react";

interface DeliveryInfoProps {
  deliveryTime: number;
  priceWarning: string | null;
  isFastDelivery: boolean;
}

export const DeliveryInfo: React.FC<DeliveryInfoProps> = ({
  deliveryTime,
  priceWarning,
  isFastDelivery,
}) => {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-5">
        <h3 className="font-semibold leading-none tracking-tight mb-2">
          Délai de livraison estimé :
        </h3>
        <div className="text-sm text-muted-foreground">
          <strong className="text-primary">{deliveryTime} jours</strong>
          {isFastDelivery && (
            <span className="ml-2 text-emerald-600 dark:text-emerald-400">
              (Délai réduit grâce à la livraison rapide)
            </span>
          )}
        </div>
      </div>

      {priceWarning && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <div className="text-sm font-medium text-destructive">
            ⚠️ {priceWarning}
          </div>
        </div>
      )}
    </div>
  );
};
