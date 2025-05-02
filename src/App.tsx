import {useState, useEffect} from "react";
import {ProjectType, PriceModifier} from "./types";
import {
  calculateDeliveryTime,
  calculateTotal,
  getMinimumPriceWarning,
} from "./utils/calculations";
import {ProjectTypeSelector} from "./components/ProjectTypeSelector";
import {PriceSlider} from "./components/PriceSlider";
import {AdditionalOptions} from "./components/AdditionalOptions";
import {DeliveryInfo} from "./components/DeliveryInfo";
import logo from "./assets/logo.svg";
import background from "./assets/background.png";
import {SLIDER_CONFIGS, PRICES} from "./config/appConfig";

function App() {
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
  });

  const isScriptOnly =
    selectedTypes.length === 1 && selectedTypes[0] === "script";
  const isSocialOnly =
    selectedTypes.length === 1 && selectedTypes[0] === "social";
  const hasGroup = selectedTypes.includes("group");

  const total = calculateTotal(selectedTypes, priceModifiers);
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
      price:
        Math.ceil((priceModifiers.duration * 60) / 30) *
        (isSocialOnly ? PRICES.TIME_RATES.SOCIAL : PRICES.TIME_RATES.DEFAULT),
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
      price: priceModifiers.actors * PRICES.ACTOR,
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
        priceModifiers.extras < 3
          ? 0
          : (priceModifiers.extras - 3) * PRICES.EXTRA,
    },
  ];

  return (
    <div
      className="min-h-screen bg-center bg-no-repeat bg-fixed bg-cover md:bg-[length:800px_auto]"
      style={{
        backgroundImage: "url(" + background + ")",
      }}
    >
      <div className="min-h-screen p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <div className="flex flex-col items-center mb-6 md:flex-row md:justify-between">
              <div className="flex flex-col-reverse items-center md:flex-row md:items-center">
                <h1 className="text-3xl mt-4 md:mt-0 md:text-5xl font-bold text-cyan-500 tracking-wider text-center md:text-left">
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
            </div>
            <div className="space-y-2 text-gray-600 italic">
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
                </div>

                <AdditionalOptions
                  priceModifiers={priceModifiers}
                  onChange={setPriceModifiers}
                />

                <DeliveryInfo
                  deliveryTime={deliveryTime}
                  priceWarning={priceWarning}
                  isFastDelivery={priceModifiers.fastDelivery}
                />

                <div className="flex justify-between items-center pt-6 mt-8 border-t-2 border-cyan-200">
                  <span className="text-2xl font-bold">Total TTC :</span>
                  <span className="text-4xl font-bold text-cyan-600">
                    {total.toFixed(2)}€
                  </span>
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
