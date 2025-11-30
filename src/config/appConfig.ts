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
    percentageModifier: 5,
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
    DEFAULT: {min: 20, max: 40}, // Fourchette de prix par segment de 30 secondes pour contenu standard
    SOCIAL: {min: 20, max: 40}, // Fourchette de prix par segment de 30 secondes pour contenu social
  },
  ACTOR: {min: 15, max: 25}, // Fourchette de prix par acteur
  EXTRA: 5, // Prix par figurant
  FREE_EXTRAS: 2, // Nombre de figurants gratuits
  ADDITIONAL_SERVICES: {
    SHOOTING_SERVER: 5, // Prix pour le serveur de tournage
    GUIDELINE: 10, // Prix pour la ligne directrice
    SCRIPT: 10, // Prix pour le script
    WATERMARK_REMOVAL: 40, // Prix pour retrait du logo VPictures
    FAST_DELIVERY: 70, // Prix pour la livraison rapide
    VERTICAL_FORMAT: 15, // Prix pour le format vertical
    SUBTITLES: 10, // Prix pour le sous-titrage (TikTok uniquement)
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
    description:
      "Mise à disposition d'un serveur privé pour réaliser votre tournage dans les meilleures conditions.",
  },
  {
    id: "guideline",
    label: "Création de la ligne directrice",
    price: PRICES.ADDITIONAL_SERVICES.GUIDELINE,
    description:
      "Élaboration d'un document détaillant l'orientation créative et les choix artistiques de votre projet.",
  },
  {
    id: "script",
    label: "Création du script",
    price: PRICES.ADDITIONAL_SERVICES.SCRIPT,
    description:
      "Rédaction complète du scénario avec dialogues et indications scéniques pour votre vidéo.",
  },
  {
    id: "watermark",
    label: "Retrait du logo VPictures",
    price: PRICES.ADDITIONAL_SERVICES.WATERMARK_REMOVAL,
    description:
      "Suppression du filigrane VPictures sur votre vidéo finale pour un rendu 100% personnalisé.",
  },
  {
    id: "fastDelivery",
    label: "Livraison rapide",
    price: PRICES.ADDITIONAL_SERVICES.FAST_DELIVERY,
    description:
      "Réduction de 50% du délai de livraison standard pour obtenir votre vidéo plus rapidement.",
  },
  {
    id: "verticalFormat",
    label: "Format vertical",
    price: PRICES.ADDITIONAL_SERVICES.VERTICAL_FORMAT,
    excludeForTiktok: true,
    description:
      "Adaptation de votre vidéo au format vertical (9:16) idéal pour les réseaux sociaux mobiles.",
  },
  {
    id: "subtitles",
    label: "Sous-titrage",
    price: PRICES.ADDITIONAL_SERVICES.SUBTITLES,
    onlyForTiktok: true,
    description:
      "Ajout de sous-titres dynamiques et stylisés pour une meilleure accessibilité et engagement.",
  },
];

// Minimum price thresholds
export const MINIMUM_PRICES = {
  SOCIAL: 30,
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
