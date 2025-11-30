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
    <div className="space-y-2">
      <div className="bg-cyan-50 dark:bg-cyan-900 p-4 rounded-lg border-2 border-cyan-200 dark:border-cyan-700">
        <h3 className="text-lg font-semibold text-cyan-800 dark:text-cyan-300 mb-2">
          Délai de livraison estimé :
        </h3>
        <div className="text-cyan-700 dark:text-cyan-300">
          <strong>{deliveryTime} jours</strong>
          {isFastDelivery && (
            <span className="ml-2 text-green-600 dark:text-green-400 font-medium">
              (Délai réduit grâce à la livraison rapide)
            </span>
          )}
        </div>
      </div>

      {priceWarning && (
        <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg border-2 border-red-200 dark:border-red-700">
          <div className="text-red-700 dark:text-red-300 font-medium">
            ⚠️ {priceWarning}
          </div>
        </div>
      )}
    </div>
  );
};
