import {calculateTotal} from "./calculations";
import {PriceModifier} from "../types";
import {PRICES} from "../config/appConfig";

describe("calculateTotal", () => {
  const baseModifiers: PriceModifier = {
    duration: 1,
    actors: 1,
    extras: 0,
    shootingServer: false,
    guideline: false,
    script: false,
    watermark: false,
    fastDelivery: false,
  };

  test("applique correctement le pourcentage pour Présentation de Serveur (+10%)", () => {
    // Calculer d'abord le prix de base sans modificateur
    const noTypeTotal = calculateTotal([], baseModifiers);

    // Ensuite calculer avec le type "server"
    const withTypeTotal = calculateTotal(["server"], baseModifiers);

    // Vérifier que le prix final est bien le prix de base + 10%
    expect(withTypeTotal).toBeCloseTo(noTypeTotal * 1.1);

    // Log pour débogage
    console.log(`Prix de base: ${noTypeTotal}€`);
    console.log(`Prix avec modificateur de serveur (+10%): ${withTypeTotal}€`);
    console.log(`Différence: ${withTypeTotal - noTypeTotal}€`);
  });

  test("applique correctement le pourcentage pour Présentation de Groupe (-5%)", () => {
    const noTypeTotal = calculateTotal([], baseModifiers);
    const withTypeTotal = calculateTotal(["group"], baseModifiers);

    expect(withTypeTotal).toBeCloseTo(noTypeTotal * 0.95);

    console.log(`Prix de base: ${noTypeTotal}€`);
    console.log(`Prix avec modificateur de groupe (-5%): ${withTypeTotal}€`);
    console.log(`Différence: ${withTypeTotal - noTypeTotal}€`);
  });

  test("le prix est adapté pour les réseaux sociaux", () => {
    const noTypeTotal = calculateTotal([], baseModifiers);
    const withSocialTypeTotal = calculateTotal(["social"], baseModifiers);

    // Expect double rate due to SOCIAL time rate being used
    expect(withSocialTypeTotal).toBeCloseTo(noTypeTotal + 20);
  });

  test("le prix est correctement calculé avec plusieurs options", () => {
    const complexModifiers: PriceModifier = {
      ...baseModifiers,
      duration: 2,
      actors: 3,
      extras: 5, // 2 extras payants (au-delà des 3 gratuits)
      watermark: true,
      fastDelivery: true,
    };

    // Calculer le prix attendu manuellement
    const expectedBasePrice =
      // Temps (2 min = 4 segments de 30 sec)
      Math.ceil((2 * 60) / 30) * PRICES.TIME_RATES.DEFAULT +
      // Acteurs (3 × 15€)
      3 * PRICES.ACTOR +
      // Extras (2 payants × 5€)
      2 * PRICES.EXTRA +
      // Options (watermark 40€ + fastDelivery 70€)
      40 +
      70;

    // Prix avec type serveur (+10%)
    const expectedServerPrice = expectedBasePrice * 1.1;
    const actualServerPrice = calculateTotal(["server"], complexModifiers);

    expect(actualServerPrice).toBeCloseTo(expectedServerPrice);

    console.log(`Prix de base calculé manuellement: ${expectedBasePrice}€`);
    console.log(`Prix calculé avec modificateur +10%: ${expectedServerPrice}€`);
    console.log(`Prix calculé par la fonction: ${actualServerPrice}€`);
  });
});
