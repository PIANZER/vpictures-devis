import React from "react";
import {ChevronDown, ChevronUp} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import {ProjectType} from "../types";
import {PROJECT_TYPES} from "../config/appConfig";

interface ProjectTypeSelectorProps {
  selectedTypes: ProjectType[];
  onTypeChange: (types: ProjectType[]) => void;
}

export const ProjectTypeSelector: React.FC<ProjectTypeSelectorProps> = ({
  selectedTypes,
  onTypeChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  // Get the currently selected type (or null if none)
  const selectedType = selectedTypes.length > 0 ? selectedTypes[0] : null;

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold mb-4">Type de projet</h2>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`w-full flex items-center justify-between p-4 rounded-lg border-2 ${
          selectedType
            ? "border-cyan-200 bg-white"
            : "border-orange-300 bg-orange-50"
        } hover:border-cyan-400 transition-colors duration-200`}
      >
        <span className="text-lg">
          {!selectedType
            ? "Sélectionner le type de projet"
            : PROJECT_TYPES.find((type) => type.id === selectedType)?.label ||
              "Type de projet"}
        </span>
        {isDropdownOpen ? (
          <ChevronUp className="text-cyan-500" />
        ) : (
          <ChevronDown className="text-cyan-500" />
        )}
      </button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{opacity: 0, y: -10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -10}}
            transition={{duration: 0.2}}
            className="absolute z-10 w-full mt-2 bg-white rounded-lg border-2 border-cyan-200 shadow-lg overflow-hidden"
          >
            <div className="divide-y divide-cyan-100">
              <div
                key="none"
                className={`
                  flex items-center justify-between p-4 hover:bg-cyan-50 transition-colors duration-200
                  ${selectedType === null ? "bg-cyan-50" : ""}
                `}
                onClick={() => {
                  onTypeChange([]);
                  setIsDropdownOpen(false);
                }}
              >
                <label className="flex items-center gap-3 cursor-pointer w-full">
                  <input
                    type="radio"
                    checked={selectedType === null}
                    onChange={() => {
                      onTypeChange([]);
                      setIsDropdownOpen(false);
                    }}
                    className="w-5 h-5 rounded-full border-cyan-300 text-cyan-500"
                  />
                  <span className="text-lg">Aucun type sélectionné</span>
                </label>
                <span className="font-bold text-lg text-gray-500">0€</span>
              </div>
              {PROJECT_TYPES.map((type) => (
                <div
                  key={type.id}
                  className={`
                    flex items-center justify-between p-4 hover:bg-cyan-50 transition-colors duration-200
                    ${selectedType === type.id ? "bg-cyan-50" : ""}
                  `}
                  onClick={() => {
                    onTypeChange([type.id]);
                    setIsDropdownOpen(false);
                  }}
                >
                  <label className="flex items-center gap-3 cursor-pointer w-full">
                    <input
                      type="radio"
                      checked={selectedType === type.id}
                      onChange={() => {
                        onTypeChange([type.id]);
                        setIsDropdownOpen(false);
                      }}
                      className="w-5 h-5 rounded-full border-cyan-300 text-cyan-500"
                    />
                    <span className="text-lg">{type.label}</span>
                  </label>
                  <span
                    className={`font-bold text-lg ${
                      type.price > 0
                        ? "text-green-500"
                        : type.price < 0
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {type.price > 0
                      ? `+${type.price}€`
                      : type.price < 0
                      ? `${type.price}€`
                      : "0€"}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
