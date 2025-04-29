import {ProjectTypeInfo, AdditionalOption} from "../types";

// Project type configurations
export const PROJECT_TYPES: ProjectTypeInfo[] = [
  {id: "server", label: "Présentation de Serveur", price: 15},
  {id: "group", label: "Présentation de Groupe/Personnage", price: -10},
  {id: "script", label: "Présentation de Script/Mapping", price: 10},
  {id: "social", label: "Format Tiktok/Instagram", price: 0},
];

// Price rate configurations (per 30 seconds)
export const PRICES = {
  TIME_RATES: {
    DEFAULT: 5, // Regular content: 5€ per 30 seconds
    SOCIAL: 10, // TikTok/Instagram: 10€ per 30 seconds
  },
  ACTOR: 11, // 11€ per actor
  EXTRA: 2, // 2€ per extra
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

// Additional service options
export const ADDITIONAL_OPTIONS: AdditionalOption[] = [
  {id: "shootingServer", label: "Serveur de tournage", price: 5},
  {id: "guideline", label: "Création de la ligne directrice", price: 5},
  {id: "script", label: "Création du script", price: 5},
];

// Minimum price thresholds
export const MINIMUM_PRICES = {
  SOCIAL: 25, // 25€ minimum for TikTok/Instagram
  GROUP: 30, // 30€ minimum for Group/Character presentation
  DEFAULT: 40, // 40€ minimum for other content types
};

// Default delivery times (in days)
export const DELIVERY_TIMES = {
  SOCIAL: {
    "0.5": 2, // 30 sec = 2 days
    "1": 2, // 1 min = 2 days
    "1.5": 3, // 1min30 = 3 days
    "2": 4, // 2 min = 4 days
    DEFAULT: 4, // Default for longer social content
  },
  DEFAULT: {
    "1": 10, // 1 min = 10 days
    "2": 15, // 2 min = 15 days
    "3": 20, // 3 min = 20 days
    "3.5": 25, // 3min30 = 25 days
    "4": 30, // 4 min = 30 days
    "5": 35, // 5 min = 35 days
    "6": 40, // 6 min = 40 days
    DEFAULT: 40, // Default for longer content
  },
};
