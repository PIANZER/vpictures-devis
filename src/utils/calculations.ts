import {ProjectType, PriceModifier} from "../types";
import {
  PROJECT_TYPES,
  PRICES,
  MINIMUM_PRICES,
  DELIVERY_TIMES,
} from "../config/appConfig";

export const calculateDeliveryTime = (
  duration: number,
  isSocial: boolean
): number => {
  const times = isSocial ? DELIVERY_TIMES.SOCIAL : DELIVERY_TIMES.DEFAULT;

  // Check for exact time matches
  const exactTime = times[duration.toString() as keyof typeof times];
  if (exactTime) return exactTime;

  // Return default value if no exact match
  return times.DEFAULT;
};

export const calculateTotal = (
  selectedTypes: ProjectType[],
  priceModifiers: PriceModifier
): number => {
  let total = 0;

  // Project type base prices
  selectedTypes.forEach((type) => {
    const projectType = PROJECT_TYPES.find((pt) => pt.id === type);
    if (projectType) {
      total += projectType.price;
    }
  });

  // Time price
  const isTikTok = selectedTypes.includes("social");
  const timeRate = isTikTok
    ? PRICES.TIME_RATES.SOCIAL
    : PRICES.TIME_RATES.DEFAULT;
  total += Math.ceil((priceModifiers.duration * 60) / 30) * timeRate;

  // Actors price
  total += priceModifiers.actors * PRICES.ACTOR;

  // Extras price
  total += priceModifiers.extras * PRICES.EXTRA;

  // Additional services
  if (priceModifiers.shootingServer) total += 5;
  if (priceModifiers.guideline) total += 5;
  if (priceModifiers.script) total += 5;

  return total;
};

export const getMinimumPriceWarning = (
  total: number,
  isSocialOnly: boolean,
  hasGroup: boolean
): string | null => {
  if (isSocialOnly && total < MINIMUM_PRICES.SOCIAL) {
    return `Le prix minimum pour un format TikTok/Instagram est de ${MINIMUM_PRICES.SOCIAL}€`;
  }
  if (hasGroup && total < MINIMUM_PRICES.GROUP) {
    return `Le prix minimum pour une présentation de personnage est de ${MINIMUM_PRICES.GROUP}€`;
  }
  if (!isSocialOnly && !hasGroup && total < MINIMUM_PRICES.DEFAULT) {
    return `Le prix minimum pour ce type de contenu est de ${MINIMUM_PRICES.DEFAULT}€`;
  }
  return null;
};
