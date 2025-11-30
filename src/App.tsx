import {useState, useEffect} from "react";
import {ProjectType, PriceModifier} from "./types";
import {
  calculateDeliveryTime,
  calculateDeposit,
  calculateTotal,
  getMinimumPriceWarning,
} from "./utils/calculations";
import {decodeDevisFromUrl, generateDevisUrl} from "./utils/urlCode";
import {ProjectTypeSelector} from "./components/ProjectTypeSelector";
import {PriceSlider} from "./components/PriceSlider";
import {AdditionalOptions} from "./components/AdditionalOptions";
import {DeliveryInfo} from "./components/DeliveryInfo";
import {CopyDevisButton} from "./components/CopyDevisButton";
import {DiscountSelector} from "./components/DiscountSelector";
import {DarkModeToggle} from "./components/DarkModeToggle";
import {useDarkMode} from "./hooks/useDarkMode";
import logo from "./assets/logo.svg";
import background from "./assets/background.png";
import {SLIDER_CONFIGS, PRICES} from "./config/appConfig";

function App() {
  const {isDark, setIsDark} = useDarkMode();
  const [selectedTypes, setSelectedTypes] = useState<ProjectType[]>([]);
  const [priceModifiers, setPriceModifiers] = useState<PriceModifier>({
    actors: 0,
    extras: 1,
    duration: 0.5,
    shootingServer: false,
    guideline: false,
    script: false,
    watermark: false,
    fastDelivery: false,
    verticalFormat: false,
    subtitles: false,
    discount: 0,
  });

  // Charger les données depuis l'URL au démarrage
  useEffect(() => {
    const devisFromUrl = decodeDevisFromUrl();
    if (devisFromUrl) {
      setSelectedTypes(devisFromUrl.selectedTypes);
      setPriceModifiers(devisFromUrl.priceModifiers);
    }
  }, []);

  const isScriptOnly =
    selectedTypes.length === 1 && selectedTypes[0] === "script";
  const isSocialOnly =
    selectedTypes.length === 1 && selectedTypes[0] === "social";
  const hasGroup = selectedTypes.includes("group");
  const total = calculateTotal(selectedTypes, priceModifiers);
  const deposit = calculateDeposit(total, isSocialOnly);

  // Calculer le prix sans réduction pour l'affichage
  const totalWithoutDiscount =
    priceModifiers.discount && priceModifiers.discount > 0
      ? {
          min: total.min / (1 - priceModifiers.discount / 100),
          max: total.max / (1 - priceModifiers.discount / 100),
        }
      : null;

  const deliveryTime = calculateDeliveryTime(
    priceModifiers.duration,
    isSocialOnly,
    priceModifiers.fastDelivery
  );
  const priceWarning = getMinimumPriceWarning(total, isSocialOnly, hasGroup);

  // Gérer les changements de type de projet
  useEffect(() => {
    setPriceModifiers((prev) => ({
      ...prev,
      // Réinitialiser la durée en fonction du type
      duration: isSocialOnly
        ? Math.min(prev.duration, SLIDER_CONFIGS.DURATION.SOCIAL.max)
        : Math.min(prev.duration, SLIDER_CONFIGS.DURATION.DEFAULT.max),
      // Gérer les extras pour le type script
      extras: isScriptOnly
        ? Math.max(prev.extras, SLIDER_CONFIGS.EXTRAS.SCRIPT.min)
        : Math.max(prev.extras, SLIDER_CONFIGS.EXTRAS.DEFAULT.min),
    }));
  }, [selectedTypes, isScriptOnly, isSocialOnly]);

  // Mettre à jour l'URL automatiquement à chaque changement
  useEffect(() => {
    if (selectedTypes.length > 0) {
      const devisData = {selectedTypes, priceModifiers};
      const newUrl = generateDevisUrl(devisData);

      // Mettre à jour l'URL sans recharger la page
      window.history.replaceState({}, "", newUrl);
    }
  }, [selectedTypes, priceModifiers]);

  const sliders = [
    {
      label: "Durée de la vidéo",
      value: priceModifiers.duration,
      unit: "min",
      min: SLIDER_CONFIGS.DURATION[isSocialOnly ? "SOCIAL" : "DEFAULT"].min,
      max: SLIDER_CONFIGS.DURATION[isSocialOnly ? "SOCIAL" : "DEFAULT"].max,
      step: SLIDER_CONFIGS.DURATION[isSocialOnly ? "SOCIAL" : "DEFAULT"].step,
      onChange: (value: number) =>
        setPriceModifiers({...priceModifiers, duration: value}),
      price: {
        min:
          Math.ceil((priceModifiers.duration * 60) / 30) *
          (isSocialOnly
            ? PRICES.TIME_RATES.SOCIAL.min
            : PRICES.TIME_RATES.DEFAULT.min),
        max:
          Math.ceil((priceModifiers.duration * 60) / 30) *
          (isSocialOnly
            ? PRICES.TIME_RATES.SOCIAL.max
            : PRICES.TIME_RATES.DEFAULT.max),
      },
    },
    {
      label: "Nombre de doubleurs",
      value: priceModifiers.actors,
      unit: "",
      min: SLIDER_CONFIGS.ACTORS.min,
      max: SLIDER_CONFIGS.ACTORS.max,
      step: SLIDER_CONFIGS.ACTORS.step,
      onChange: (value: number) =>
        setPriceModifiers({...priceModifiers, actors: value}),
      price: {
        min: priceModifiers.actors * PRICES.ACTOR.min,
        max: priceModifiers.actors * PRICES.ACTOR.max,
      },
    },
    {
      label: "Nombre de figurants",
      value: priceModifiers.extras,
      unit: "",
      min: SLIDER_CONFIGS.EXTRAS[isScriptOnly ? "SCRIPT" : "DEFAULT"].min,
      max: SLIDER_CONFIGS.EXTRAS[isScriptOnly ? "SCRIPT" : "DEFAULT"].max,
      step: SLIDER_CONFIGS.EXTRAS[isScriptOnly ? "SCRIPT" : "DEFAULT"].step,
      onChange: (value: number) =>
        setPriceModifiers({...priceModifiers, extras: value}),
      price:
        priceModifiers.extras < PRICES.FREE_EXTRAS
          ? 0
          : (priceModifiers.extras - PRICES.FREE_EXTRAS) * PRICES.EXTRA,
    },
  ];

  return (
    <div
      className="min-h-screen bg-center bg-no-repeat bg-fixed bg-cover md:bg-[length:800px_auto] dark:bg-gray-900"
      style={{
        backgroundImage: isDark ? "none" : "url(" + background + ")",
      }}
    >
      <div className="min-h-screen p-8 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <div className="flex flex-col items-center mb-6 md:flex-row md:justify-between">
              <div className="flex flex-col-reverse items-center md:flex-row md:items-center">
                <h1 className="text-3xl mt-4 md:mt-0 md:text-5xl font-bold text-cyan-500 dark:text-cyan-400 tracking-wider text-center md:text-left">
                  SIMULATEUR DE DEVIS
                </h1>
                <div className="flex items-center md:ml-4">
                  <img
                    src={logo}
                    alt="V Pictures Logo"
                    className="h-24 w-auto"
                  />
                </div>
              </div>
              <DarkModeToggle
                isDark={isDark}
                onToggle={() => setIsDark(!isDark)}
              />
            </div>
            <div className="space-y-2 text-gray-600 dark:text-gray-300 italic">
              <p>
                Ce simulateur n'a pour but que de vous donner une estimation de
                Tarif moyen que nous serions amenées a vous proposer.
              </p>
              <p>
                Si vous souhaitez avoir plus d'informations, nous vous invitons
                a ouvrir un ticket sur le discord VPictures !
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <ProjectTypeSelector
              selectedTypes={selectedTypes}
              onTypeChange={setSelectedTypes}
            />

            {selectedTypes.length > 0 && (
              <>
                <div className="space-y-8">
                  {sliders.map((slider) => (
                    <PriceSlider key={slider.label} {...slider} />
                  ))}
                </div>{" "}
                <AdditionalOptions
                  priceModifiers={priceModifiers}
                  onChange={setPriceModifiers}
                  selectedTypes={selectedTypes}
                />{" "}
                <DiscountSelector
                  discount={priceModifiers.discount || 0}
                  onChange={(discount) =>
                    setPriceModifiers({...priceModifiers, discount})
                  }
                />{" "}
                <DeliveryInfo
                  deliveryTime={deliveryTime}
                  priceWarning={priceWarning}
                  isFastDelivery={priceModifiers.fastDelivery}
                />
                {!isSocialOnly && (
                  <div className="flex justify-between items-center pt-4 border-t border-cyan-100 dark:border-cyan-800">
                    <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                      Accompte (35%) :
                    </span>
                    <span className="text-2xl font-bold text-orange-500 dark:text-orange-400">
                      {deposit.min.toFixed(2)}€ - {deposit.max.toFixed(2)}€
                    </span>
                  </div>
                )}{" "}
                {totalWithoutDiscount && (
                  <div className="flex justify-between items-center pt-4 border-t border-cyan-100 dark:border-cyan-800">
                    <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                      Prix avant réduction :
                    </span>
                    <span className="text-2xl font-bold text-gray-500 dark:text-gray-400 line-through">
                      {totalWithoutDiscount.min.toFixed(2)}€ -{" "}
                      {totalWithoutDiscount.max.toFixed(2)}€
                    </span>
                  </div>
                )}{" "}
                <div className="flex justify-between items-center pt-6 mt-8 border-t-2 border-cyan-200 dark:border-cyan-700">
                  <span className="text-2xl font-bold dark:text-white">
                    Total TTC
                    {(priceModifiers.discount ?? 0) > 0 && (
                      <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                        -{priceModifiers.discount}%
                      </span>
                    )}
                    :
                  </span>
                  <span className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">
                    {total.min.toFixed(2)}€ - {total.max.toFixed(2)}€
                  </span>
                </div>{" "}
                {/* Bouton de copie du devis */}
                <div className="pt-6 mt-6 border-t border-gray-200">
                  <CopyDevisButton selectedTypes={selectedTypes} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
