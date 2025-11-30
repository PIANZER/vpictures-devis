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
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Get the currently selected type (or null if none)
  const selectedType = selectedTypes.length > 0 ? selectedTypes[0] : null;

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          !selectedType
            ? "border-destructive text-destructive"
            : "hover:bg-accent hover:text-accent-foreground"
        }`}
      >
        <span className="font-medium">
          {!selectedType
            ? "Sélectionner le type de projet"
            : PROJECT_TYPES.find((type) => type.id === selectedType)?.label ||
              "Type de projet"}
        </span>
        {isDropdownOpen ? (
          <ChevronUp className="h-4 w-4 opacity-50" />
        ) : (
          <ChevronDown className="h-4 w-4 opacity-50" />
        )}
      </button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{opacity: 0, y: -10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -10}}
            transition={{duration: 0.2}}
            className="absolute z-50 w-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md overflow-hidden"
          >
            <div className="p-1">
              <div
                key="none"
                className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground ${
                  selectedType === null ? "bg-accent" : ""
                }`}
                onClick={() => {
                  onTypeChange([]);
                  setIsDropdownOpen(false);
                }}
              >
                <label className="flex items-center gap-2 cursor-pointer w-full">
                  <input
                    type="radio"
                    checked={selectedType === null}
                    onChange={() => {
                      onTypeChange([]);
                      setIsDropdownOpen(false);
                    }}
                    className="h-4 w-4 rounded-full border-input accent-primary"
                  />
                  <span className="text-sm">Aucun type sélectionné</span>
                </label>
              </div>
              {PROJECT_TYPES.map((type) => (
                <div
                  key={type.id}
                  className={`relative flex cursor-pointer select-none items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground ${
                    selectedType === type.id ? "bg-accent" : ""
                  }`}
                  onClick={() => {
                    onTypeChange([type.id]);
                    setIsDropdownOpen(false);
                  }}
                >
                  <label className="flex items-center gap-2 cursor-pointer flex-1">
                    <input
                      type="radio"
                      checked={selectedType === type.id}
                      onChange={() => {
                        onTypeChange([type.id]);
                        setIsDropdownOpen(false);
                      }}
                      className="h-4 w-4 rounded-full border-input accent-primary"
                    />
                    <span className="text-sm">{type.label}</span>
                  </label>
                  <span
                    className={`text-xs font-semibold ${
                      type.percentageModifier > 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : type.percentageModifier < 0
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {type.percentageModifier > 0
                      ? `+${type.percentageModifier}%`
                      : type.percentageModifier < 0
                      ? `${type.percentageModifier}%`
                      : "0%"}
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
