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
      <div className="bg-cyan-50 p-4 rounded-lg border-2 border-cyan-200">
        <h3 className="text-lg font-semibold text-cyan-800 mb-2">
          Délai de livraison estimé :
        </h3>
        <div className="text-cyan-700">
          <strong>{deliveryTime} jours</strong>
          {isFastDelivery && (
            <span className="ml-2 text-green-600 font-medium">
              (Délai réduit grâce à la livraison rapide)
            </span>
          )}
        </div>
      </div>

      {priceWarning && (
        <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
          <div className="text-red-700 font-medium">⚠️ {priceWarning}</div>
        </div>
      )}
    </div>
  );
};
