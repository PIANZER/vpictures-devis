import {ProjectType, PriceModifier} from "../types";

export const calculateDeliveryTime = (
  duration: number,
  isSocial: boolean
): number => {
  if (isSocial) {
    if (duration <= 0.5) return 2; // 30 sec
    if (duration <= 1) return 2; // 1 min
    if (duration <= 1.5) return 3; // 1min30
    if (duration <= 2) return 4; // 2 min
    return 4; // Default for longer social content
  } else {
    if (duration <= 1) return 10; // 1 min
    if (duration <= 2) return 15; // 2 min
    if (duration <= 3) return 20; // 3 min
    if (duration <= 3.5) return 25; // 3min30
    if (duration <= 4) return 30; // 4 min
    if (duration <= 5) return 35; // 5 min
    if (duration <= 6) return 40; // 6 min
    return 40; // Default for longer content
  }
};

export const calculateTotal = (
  selectedTypes: ProjectType[],
  priceModifiers: PriceModifier
): number => {
  let total = 0;

  // Project type base prices
  selectedTypes.forEach((type) => {
    switch (type) {
      case "server":
        total += 15;
        break;
      case "group":
        total -= 10;
        break;
      case "script":
        total += 10;
        break;
      case "social":
        total += 0;
        break;
    }
  });

  // Time price (2.5€ per 30 seconds)
  const isTikTok = selectedTypes.includes("social");
  const timeRate = isTikTok ? 10 : 5; // 10€ per 30 seconds for TikTok, 2.5€ otherwise
  total += Math.ceil((priceModifiers.duration * 60) / 30) * timeRate;

  // Actors price (11€ per actor)
  total += priceModifiers.actors * 11;

  // Extras price (2€ per extra)
  total += priceModifiers.extras * 2;

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
  if (isSocialOnly && total < 25) {
    return "Le prix minimum pour un format TikTok/Instagram est de 25€";
  }
  if (hasGroup && total < 30) {
    return "Le prix minimum pour une présentation de personnage est de 30€";
  }
  if (!isSocialOnly && !hasGroup && total < 40) {
    return "Le prix minimum pour ce type de contenu est de 40€";
  }
  return null;
};
