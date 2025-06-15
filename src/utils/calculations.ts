import {ProjectType, PriceModifier} from "../types";
import {
  PROJECT_TYPES,
  PRICES,
  MINIMUM_PRICES,
  DELIVERY_TIMES,
} from "../config/appConfig";

export const calculateDeliveryTime = (
  duration: number,
  isSocial: boolean,
  fastDelivery: boolean = false
): number => {
  const times = isSocial ? DELIVERY_TIMES.SOCIAL : DELIVERY_TIMES.DEFAULT;

  // Récupérer le temps standard
  let standardTime: number;
  const exactTime = times[duration.toString() as keyof typeof times];
  if (exactTime) {
    standardTime = exactTime;
  } else {
    standardTime = times.DEFAULT;
  }

  // Appliquer la réduction si livraison rapide
  if (fastDelivery) {
    return Math.ceil(standardTime * PRICES.FAST_DELIVERY_FACTOR);
  }

  return standardTime;
};

export const calculateTotal = (
  selectedTypes: ProjectType[],
  priceModifiers: PriceModifier
): number => {
  // Calculer d'abord le prix de base sans les modificateurs de type
  let baseTotal = 0;

  // Prix du temps
  const isTikTok = selectedTypes.includes("social");
  const timeRate = isTikTok
    ? PRICES.TIME_RATES.SOCIAL
    : PRICES.TIME_RATES.DEFAULT;
  baseTotal += Math.ceil((priceModifiers.duration * 60) / 30) * timeRate;

  // Prix des acteurs
  baseTotal += priceModifiers.actors * PRICES.ACTOR;

  // Prix des figurants (3 premiers gratuits)
  const extrasCount = Math.max(0, priceModifiers.extras - PRICES.FREE_EXTRAS);
  baseTotal += extrasCount * PRICES.EXTRA;
  // Services additionnels - utiliser les références aux prix centralisés
  if (priceModifiers.shootingServer)
    baseTotal += PRICES.ADDITIONAL_SERVICES.SHOOTING_SERVER;
  if (priceModifiers.guideline)
    baseTotal += PRICES.ADDITIONAL_SERVICES.GUIDELINE;
  if (priceModifiers.script) baseTotal += PRICES.ADDITIONAL_SERVICES.SCRIPT;
  if (priceModifiers.watermark)
    baseTotal += PRICES.ADDITIONAL_SERVICES.WATERMARK_REMOVAL;
  if (priceModifiers.fastDelivery)
    baseTotal += PRICES.ADDITIONAL_SERVICES.FAST_DELIVERY;
  if (priceModifiers.verticalFormat)
    baseTotal += PRICES.ADDITIONAL_SERVICES.VERTICAL_FORMAT;

  // Appliquer le modificateur de pourcentage du type de projet
  let finalTotal = baseTotal;
  selectedTypes.forEach((type) => {
    const projectType = PROJECT_TYPES.find((pt) => pt.id === type);
    if (projectType) {
      // Appliquer le modificateur de pourcentage
      finalTotal *= 1 + projectType.percentageModifier / 100;
    }
  });

  return finalTotal;
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

export const calculateDeposit = (
  total: number,
  isTiktokOnly: boolean
): number => {
  if (isTiktokOnly) {
    return 0; // Pas d'accompte pour TikTok
  }
  return total * 0.35; // 35% d'accompte
};
