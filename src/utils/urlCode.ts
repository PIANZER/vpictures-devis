import {ProjectType, PriceModifier} from "../types";

interface DevisData {
  selectedTypes: ProjectType[];
  priceModifiers: PriceModifier;
}

// Mapping compact pour les types de projet
const PROJECT_TYPES: ProjectType[] = ["server", "group", "script", "social"];

/**
 * Génère un code compact pour l'URL basé sur les paramètres du devis
 * Le même devis générera toujours le même code
 */
export function generateDevisCode(data: DevisData): string {
  const parts: string[] = [];

  // Types de projet (bits pour chaque type)
  let typesBits = 0;
  data.selectedTypes.forEach((type) => {
    const index = PROJECT_TYPES.indexOf(type);
    if (index >= 0) typesBits |= 1 << index;
  });
  parts.push(typesBits.toString(36));

  // Valeurs numériques
  parts.push(Math.round(data.priceModifiers.actors).toString(36));
  parts.push(Math.round(data.priceModifiers.extras * 10).toString(36)); // *10 pour garder 1 décimale
  parts.push(Math.round(data.priceModifiers.duration * 10).toString(36)); // *10 pour garder 1 décimale

  // Options booléennes (bits)
  let optionsBits = 0;
  if (data.priceModifiers.shootingServer) optionsBits |= 1;
  if (data.priceModifiers.guideline) optionsBits |= 2;
  if (data.priceModifiers.script) optionsBits |= 4;
  if (data.priceModifiers.watermark) optionsBits |= 8;
  if (data.priceModifiers.fastDelivery) optionsBits |= 16;
  if (data.priceModifiers.verticalFormat) optionsBits |= 32;
  parts.push(optionsBits.toString(36));

  // Joindre avec un séparateur court
  return parts.join("-");
}

/**
 * Décode un code de devis depuis l'URL
 */
export function parseDevisCode(code: string): Partial<DevisData> | null {
  try {
    const parts = code.split("-");
    if (parts.length < 5) return null;

    // Types de projet (premier élément)
    const typesBits = parseInt(parts[0], 36);
    const selectedTypes: ProjectType[] = [];
    PROJECT_TYPES.forEach((type, i) => {
      if (typesBits & (1 << i)) selectedTypes.push(type);
    });

    // Acteurs (deuxième élément)
    const actors = parseInt(parts[1], 36);

    // Extras (troisième élément, diviser par 10 pour récupérer la décimale)
    const extras = parseInt(parts[2], 36) / 10;

    // Durée (quatrième élément, diviser par 10 pour récupérer la décimale)
    const duration = parseInt(parts[3], 36) / 10;

    // Options booléennes (cinquième élément)
    const optionsBits = parseInt(parts[4], 36);

    return {
      selectedTypes,
      priceModifiers: {
        actors,
        extras,
        duration,
        shootingServer: (optionsBits & 1) !== 0,
        guideline: (optionsBits & 2) !== 0,
        script: (optionsBits & 4) !== 0,
        watermark: (optionsBits & 8) !== 0,
        fastDelivery: (optionsBits & 16) !== 0,
        verticalFormat: (optionsBits & 32) !== 0,
      },
    };
  } catch (error) {
    console.error("Erreur lors du décodage du devis:", error);
    return null;
  }
}

/**
 * Décode un devis depuis l'URL actuelle
 */
export function decodeDevisFromUrl(): DevisData | null {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("d"); // Paramètre court 'd' pour devis

    if (!code) return null;

    return parseDevisCode(code) as DevisData;
  } catch (error) {
    console.error("Erreur lors du décodage du devis depuis l'URL:", error);
    return null;
  }
}

/**
 * Génère l'URL complète avec le code du devis
 */
export function generateDevisUrl(data: DevisData): string {
  const code = generateDevisCode(data);

  // Déterminer l'URL de base selon l'environnement
  const baseUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:5173/vpictures-devis/"
      : "https://pianzer.github.io/vpictures-devis/";

  // Un seul paramètre avec le code compact
  const params = new URLSearchParams({d: code});

  return `${baseUrl}?${params.toString()}`;
}
/**
 * Copie l'URL du devis dans le presse-papiers
 */
export async function copyDevisToClipboard(data: DevisData): Promise<boolean> {
  try {
    const url = generateDevisUrl(data);
    await navigator.clipboard.writeText(url);
    return true;
  } catch (error) {
    console.error("Erreur lors de la copie:", error);
    // Fallback pour les navigateurs plus anciens
    try {
      const url = generateDevisUrl(data);
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    } catch (fallbackError) {
      console.error("Erreur lors de la copie (fallback):", fallbackError);
      return false;
    }
  }
}
