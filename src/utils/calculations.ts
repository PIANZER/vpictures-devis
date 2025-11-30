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
): {min: number; max: number} => {
  // Calculer d'abord le prix de base sans les modificateurs de type
  let minTotal = 0;
  let maxTotal = 0;

  // Prix du temps
  const isTikTok = selectedTypes.includes("social");
  const segments = Math.ceil((priceModifiers.duration * 60) / 30);

  if (isTikTok) {
    minTotal += segments * PRICES.TIME_RATES.SOCIAL.min;
    maxTotal += segments * PRICES.TIME_RATES.SOCIAL.max;
  } else {
    minTotal += segments * PRICES.TIME_RATES.DEFAULT.min;
    maxTotal += segments * PRICES.TIME_RATES.DEFAULT.max;
  } // Prix des acteurs
  minTotal += priceModifiers.actors * PRICES.ACTOR.min;
  maxTotal += priceModifiers.actors * PRICES.ACTOR.max;

  // Prix des figurants (2 premiers gratuits)
  const extrasCount = Math.max(0, priceModifiers.extras - PRICES.FREE_EXTRAS);
  minTotal += extrasCount * PRICES.EXTRA;
  maxTotal += extrasCount * PRICES.EXTRA;

  // Services additionnels - utiliser les références aux prix centralisés
  if (priceModifiers.shootingServer) {
    minTotal += PRICES.ADDITIONAL_SERVICES.SHOOTING_SERVER;
    maxTotal += PRICES.ADDITIONAL_SERVICES.SHOOTING_SERVER;
  }
  if (priceModifiers.guideline) {
    minTotal += PRICES.ADDITIONAL_SERVICES.GUIDELINE;
    maxTotal += PRICES.ADDITIONAL_SERVICES.GUIDELINE;
  }
  if (priceModifiers.script) {
    minTotal += PRICES.ADDITIONAL_SERVICES.SCRIPT;
    maxTotal += PRICES.ADDITIONAL_SERVICES.SCRIPT;
  }
  if (priceModifiers.watermark) {
    minTotal += PRICES.ADDITIONAL_SERVICES.WATERMARK_REMOVAL;
    maxTotal += PRICES.ADDITIONAL_SERVICES.WATERMARK_REMOVAL;
  }
  if (priceModifiers.fastDelivery) {
    minTotal += PRICES.ADDITIONAL_SERVICES.FAST_DELIVERY;
    maxTotal += PRICES.ADDITIONAL_SERVICES.FAST_DELIVERY;
  }
  if (priceModifiers.verticalFormat) {
    minTotal += PRICES.ADDITIONAL_SERVICES.VERTICAL_FORMAT;
    maxTotal += PRICES.ADDITIONAL_SERVICES.VERTICAL_FORMAT;
  }
  if (priceModifiers.subtitles) {
    minTotal += PRICES.ADDITIONAL_SERVICES.SUBTITLES;
    maxTotal += PRICES.ADDITIONAL_SERVICES.SUBTITLES;
  }

  // Appliquer le modificateur de pourcentage du type de projet
  selectedTypes.forEach((type) => {
    const projectType = PROJECT_TYPES.find((pt) => pt.id === type);
    if (projectType) {
      // Appliquer le modificateur de pourcentage
      minTotal *= 1 + projectType.percentageModifier / 100;
      maxTotal *= 1 + projectType.percentageModifier / 100;
    }
  });

  // Appliquer la réduction si applicable
  if (priceModifiers.discount) {
    minTotal *= 1 - priceModifiers.discount / 100;
    maxTotal *= 1 - priceModifiers.discount / 100;
  }

  return {min: minTotal, max: maxTotal};
};

export const getMinimumPriceWarning = (
  total: {min: number; max: number},
  isSocialOnly: boolean,
  hasGroup: boolean
): string | null => {
  const minPrice = total.min;

  if (isSocialOnly && minPrice < MINIMUM_PRICES.SOCIAL) {
    return `Le prix minimum pour un format TikTok/Instagram est de ${MINIMUM_PRICES.SOCIAL}€`;
  }
  if (hasGroup && minPrice < MINIMUM_PRICES.GROUP) {
    return `Le prix minimum pour une présentation de personnage est de ${MINIMUM_PRICES.GROUP}€`;
  }
  if (!isSocialOnly && !hasGroup && minPrice < MINIMUM_PRICES.DEFAULT) {
    return `Le prix minimum pour ce type de contenu est de ${MINIMUM_PRICES.DEFAULT}€`;
  }
  return null;
};

export const calculateDeposit = (
  total: {min: number; max: number},
  isTiktokOnly: boolean
): {min: number; max: number} => {
  if (isTiktokOnly) {
    return {min: 0, max: 0}; // Pas d'accompte pour TikTok
  }
  return {min: total.min * 0.35, max: total.max * 0.35}; // 35% d'accompte
};
