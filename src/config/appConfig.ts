import {ProjectTypeInfo, AdditionalOption} from "../types";

// Project type configurations
export const PROJECT_TYPES: ProjectTypeInfo[] = [
  {
    id: "server",
    label: "Présentation de Serveur",
    percentageModifier: 10,
  },
  {
    id: "group",
    label: "Présentation de Groupe/Personnage",
    percentageModifier: -5,
  },
  {
    id: "script",
    label: "Présentation de Script/Mapping/Modèle",
    percentageModifier: 0,
  },
  {
    id: "social",
    label: "Format Tiktok/Instagram/Clip",
    percentageModifier: 0,
  },
];

// Centralisation de tous les prix dans une structure unique
export const PRICES = {
  TIME_RATES: {
    DEFAULT: 10, // Prix par segment de 30 secondes pour contenu standard
    SOCIAL: 20, // Prix par segment de 30 secondes pour contenu social
  },
  ACTOR: 15, // Prix par acteur
  EXTRA: 5, // Prix par figurant
  FREE_EXTRAS: 3, // Nombre de figurants gratuits
  ADDITIONAL_SERVICES: {
    SHOOTING_SERVER: 5, // Prix pour le serveur de tournage
    GUIDELINE: 5, // Prix pour la ligne directrice
    SCRIPT: 5, // Prix pour le script
    WATERMARK_REMOVAL: 40, // Prix pour retrait du filigrane
    FAST_DELIVERY: 70, // Prix pour la livraison rapide
  },
  FAST_DELIVERY_FACTOR: 0.5, // Facteur de réduction du temps pour livraison rapide
};

// Slider configurations by project type
export const SLIDER_CONFIGS = {
  DURATION: {
    DEFAULT: {
      min: 0.5,
      max: 6,
      step: 0.5,
    },
    SOCIAL: {
      min: 0.5,
      max: 2,
      step: 0.5,
    },
  },
  ACTORS: {
    min: 0,
    max: 10,
    step: 1,
  },
  EXTRAS: {
    DEFAULT: {
      min: 1,
      max: 15,
      step: 1,
    },
    SCRIPT: {
      min: 0,
      max: 15,
      step: 1,
    },
  },
};

// Additional service options - utilise les prix centralisés
export const ADDITIONAL_OPTIONS: AdditionalOption[] = [
  {
    id: "shootingServer",
    label: "Serveur de tournage",
    price: PRICES.ADDITIONAL_SERVICES.SHOOTING_SERVER,
  },
  {
    id: "guideline",
    label: "Création de la ligne directrice",
    price: PRICES.ADDITIONAL_SERVICES.GUIDELINE,
  },
  {
    id: "script",
    label: "Création du script",
    price: PRICES.ADDITIONAL_SERVICES.SCRIPT,
  },
  {
    id: "watermark",
    label: "Retrait du filigrane",
    price: PRICES.ADDITIONAL_SERVICES.WATERMARK_REMOVAL,
  },
  {
    id: "fastDelivery",
    label: "Livraison rapide",
    price: PRICES.ADDITIONAL_SERVICES.FAST_DELIVERY,
  },
];

// Minimum price thresholds
export const MINIMUM_PRICES = {
  SOCIAL: 25,
  GROUP: 30,
  DEFAULT: 40,
};

// Default delivery times (in days)
export const DELIVERY_TIMES = {
  SOCIAL: {
    "0.5": 2, // 30 seconds = 2 jours
    "1": 2, // 1 minute = 2 jours
    "1.5": 3, // 1.5 minutes = 3 jours
    "2": 4, // 2 minutes = 4 jours
    DEFAULT: 4,
  },
  DEFAULT: {
    "0.5": 10, // 30 seconds = 10 jours
    "1": 10, // 1 minute = 10 jours
    "1.5": 15, // 1.5 minutes = 15 jours
    "2": 15, // 2 minutes = 15 jours
    "2.5": 20, // 2.5 minutes = 20 jours
    "3": 20, // 3 minutes = 20 jours
    "3.5": 25, // 3.5 minutes = 25 jours
    "4": 30, // 4 minutes = 30 jours
    "4.5": 35, // 4.5 minutes = 35 jours
    "5": 35, // 5 minutes = 35 jours
    "5.5": 40, // 5.5 minutes = 40 jours
    "6": 40, // 6 minutes = 40 jours
    DEFAULT: 40, // Si en dehors de la plage
  },
};
