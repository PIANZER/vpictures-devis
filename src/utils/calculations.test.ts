import {calculateTotal, calculateDeliveryTime} from "./calculations";
import {PriceModifier} from "../types";

describe("Scénarios de tarification et délais", () => {
  // Configuration commune pour les tests
  const fullOptionsModifiers: PriceModifier = {
    duration: 2, // 2 minutes
    actors: 1, // 1 acteur
    extras: 4, // 4 figurants (1 payant après les 3 gratuits)
    shootingServer: true,
    guideline: true,
    script: true,
    watermark: true,
    fastDelivery: true,
  };

  test("Scénario 1: Présentation de Serveur (+10%)", () => {
    // Calculer le prix
    const total = calculateTotal(["server"], fullOptionsModifiers);
    // Calculer le délai de livraison
    const deliveryTime = calculateDeliveryTime(
      fullOptionsModifiers.duration,
      false, // non social
      fullOptionsModifiers.fastDelivery
    );

    // Vérifier que le prix est correct (203.5€)
    expect(total).toBeCloseTo(203.5);

    // Vérifier que le délai est correct (8 jours)
    expect(deliveryTime).toBe(8);

    console.log(
      `Serveur (+10%): ${total.toFixed(2)}€, livraison en ${deliveryTime} jours`
    );
  });

  test("Scénario 2a: Format Tiktok/Instagram (0%)", () => {
    // Calculer le prix
    const total = calculateTotal(["social"], fullOptionsModifiers);
    // Calculer le délai de livraison
    const deliveryTime = calculateDeliveryTime(
      fullOptionsModifiers.duration,
      true, // social
      fullOptionsModifiers.fastDelivery
    );

    // Vérifier que le prix est correct (225€)
    expect(total).toBeCloseTo(225);

    // Vérifier que le délai est correct (2 jours)
    expect(deliveryTime).toBe(2);

    console.log(
      `Social (0%): ${total.toFixed(2)}€, livraison en ${deliveryTime} jours`
    );
  });

  test("Scénario 2b: Présentation de Script/Mapping (0%)", () => {
    // Calculer le prix
    const total = calculateTotal(["script"], fullOptionsModifiers);
    // Calculer le délai de livraison
    const deliveryTime = calculateDeliveryTime(
      fullOptionsModifiers.duration,
      false, // non social
      fullOptionsModifiers.fastDelivery
    );

    // Vérifier que le prix est correct (185€)
    expect(total).toBeCloseTo(185);

    // Vérifier que le délai est correct (8 jours)
    expect(deliveryTime).toBe(8);

    console.log(
      `Script (0%): ${total.toFixed(2)}€, livraison en ${deliveryTime} jours`
    );
  });

  test("Scénario 3: Présentation de Groupe/Personnage (-5%)", () => {
    // Calculer le prix
    const total = calculateTotal(["group"], fullOptionsModifiers);
    // Calculer le délai de livraison
    const deliveryTime = calculateDeliveryTime(
      fullOptionsModifiers.duration,
      false, // non social
      fullOptionsModifiers.fastDelivery
    );

    // Vérifier que le prix est correct (175.75€)
    expect(total).toBeCloseTo(175.75);

    // Vérifier que le délai est correct (8 jours)
    expect(deliveryTime).toBe(8);

    console.log(
      `Groupe (-5%): ${total.toFixed(2)}€, livraison en ${deliveryTime} jours`
    );
  });
});
