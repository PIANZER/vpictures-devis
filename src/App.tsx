import {useState, useEffect, useRef} from "react";
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
  const isInitialMount = useRef(true);

  // Charger les données depuis l'URL au démarrage
  useEffect(() => {
    const devisFromUrl = decodeDevisFromUrl();
    if (devisFromUrl) {
      setSelectedTypes(devisFromUrl.selectedTypes);
      setPriceModifiers(devisFromUrl.priceModifiers);
    }
    // Marquer que le montage initial est terminé après le chargement
    setTimeout(() => {
      isInitialMount.current = false;
    }, 0);
  }, []);

  const isScriptOnly =
    selectedTypes.length === 1 && selectedTypes[0] === "script";
  const isSocialOnly =
    selectedTypes.length === 1 && selectedTypes[0] === "social";

  // Désactiver automatiquement les sous-titres si on change de type de projet et que ce n'est plus TikTok uniquement
  useEffect(() => {
    // Ne pas exécuter pendant le montage initial (pour ne pas écraser les données de l'URL)
    if (isInitialMount.current) {
      return;
    }

    if (!isSocialOnly) {
      setPriceModifiers((prev) => {
        if (prev.subtitles) {
          return {...prev, subtitles: false};
        }
        return prev;
      });
    }
  }, [isSocialOnly]);

  // Calculer les totaux
  const total = calculateTotal(selectedTypes, priceModifiers);
  const deposit = calculateDeposit(total, isSocialOnly);
  const deliveryTime = calculateDeliveryTime(
    priceModifiers.duration,
    isSocialOnly,
    priceModifiers.fastDelivery
  );
  const priceWarning = getMinimumPriceWarning(
    total,
    isSocialOnly,
    selectedTypes.includes("group")
  );

  // Calculer le prix avant réduction si une réduction est appliquée
  const totalWithoutDiscount =
    priceModifiers.discount && priceModifiers.discount > 0
      ? calculateTotal(selectedTypes, {...priceModifiers, discount: 0})
      : null;

  // Mettre à jour l'URL quand les paramètres changent
  useEffect(() => {
    if (selectedTypes.length > 0) {
      const newUrl = generateDevisUrl({selectedTypes, priceModifiers});
      window.history.replaceState({}, "", newUrl);
    }
  }, [selectedTypes, priceModifiers]);

  // Configuration des sliders avec leurs prix
  const sliderConfigs = [
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
    <div className="min-h-screen bg-background transition-colors duration-200 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="V-Pictures Logo" className="h-10" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Simulateur de devis
              </h1>
              <p className="text-sm text-muted-foreground">V-Pictures</p>
            </div>
          </div>
          <DarkModeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Info Alert */}
        <div className="mb-6 rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            ℹ️ Les prix affichés sont des estimations. Pour un devis précis,
            contactez-nous avec les détails de votre projet.
          </p>
        </div>

        {/* Desktop: 2 columns layout, Mobile: single column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Configuration */}
          <div className="space-y-6">
            {/* Project Type Card */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold leading-none tracking-tight mb-4">
                Type de projet
              </h2>
              <ProjectTypeSelector
                selectedTypes={selectedTypes}
                onTypeChange={setSelectedTypes}
              />
            </div>

            {selectedTypes.length > 0 && (
              <>
                {/* Sliders Card */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-6">
                  <h2 className="text-lg font-semibold leading-none tracking-tight">
                    Paramètres du projet
                  </h2>
                  {sliderConfigs.map((config) => (
                    <PriceSlider key={config.label} {...config} />
                  ))}
                </div>

                {/* Additional Options Card */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                  <h2 className="text-lg font-semibold leading-none tracking-tight mb-4">
                    Options supplémentaires
                  </h2>
                  <AdditionalOptions
                    priceModifiers={priceModifiers}
                    onChange={setPriceModifiers}
                    selectedTypes={selectedTypes}
                  />
                </div>

                {/* Discount Selector Card */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                  <DiscountSelector
                    discount={priceModifiers.discount || 0}
                    onChange={(discount) =>
                      setPriceModifiers({...priceModifiers, discount})
                    }
                  />
                </div>
              </>
            )}
          </div>

          {/* Right Column - Summary (sticky on desktop) */}
          {selectedTypes.length > 0 && (
            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              {/* Delivery Info Card */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <DeliveryInfo
                  deliveryTime={deliveryTime}
                  priceWarning={priceWarning}
                  isFastDelivery={priceModifiers.fastDelivery}
                />
              </div>

              {/* Price Summary Card */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-lg p-6 space-y-4">
                {/* Deposit Info */}
                {deposit && (
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-4 border-b">
                    <span className="text-sm font-medium text-muted-foreground">
                      Acompte à la commande (35%)
                    </span>
                    <span className="text-lg font-bold text-muted-foreground">
                      {deposit.min.toFixed(2)}€ - {deposit.max.toFixed(2)}€
                    </span>
                  </div>
                )}
                {/* Total Price Info */}

                {totalWithoutDiscount && (
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-4 border-b">
                    <span className="text-sm font-medium text-muted-foreground">
                      Prix avant réduction
                    </span>
                    <span className="text-lg font-bold text-muted-foreground line-through">
                      {totalWithoutDiscount.min.toFixed(2)}€ -{" "}
                      {totalWithoutDiscount.max.toFixed(2)}€
                    </span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold tracking-tight">
                      Total TTC
                    </span>
                    {(priceModifiers.discount ?? 0) > 0 && (
                      <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                        -{priceModifiers.discount}%
                      </span>
                    )}
                  </div>
                  <span className="text-3xl font-bold tracking-tighter">
                    {total.min.toFixed(2)}€ - {total.max.toFixed(2)}€
                  </span>
                </div>
              </div>

              {/* Copy Button Card */}
              <div className="rounded-lg border bg-muted dark:bg-gray-800 p-6">
                <CopyDevisButton selectedTypes={selectedTypes} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
