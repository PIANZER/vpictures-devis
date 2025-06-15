import React, {useState} from "react";
import {ProjectType, PriceModifier} from "../types";
import {copyDevisToClipboard} from "../utils/urlCode";

interface DevisData {
  selectedTypes: ProjectType[];
  priceModifiers: PriceModifier;
}

interface CopyUrlButtonProps {
  selectedTypes: ProjectType[];
  priceModifiers: PriceModifier;
}

export const CopyUrlButton: React.FC<CopyUrlButtonProps> = ({
  selectedTypes,
  priceModifiers,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = async () => {
    setIsLoading(true);

    const devisData: DevisData = {
      selectedTypes,
      priceModifiers,
    };

    const success = await copyDevisToClipboard(devisData);

    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }

    setIsLoading(false);
  };

  return (
    <button
      onClick={handleCopy}
      disabled={isLoading}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
        ${
          isCopied
            ? "bg-green-500 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }
        ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"}
      `}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Copie...
        </>
      ) : isCopied ? (
        <>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          URL copiée !
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copier le lien
        </>
      )}
    </button>
  );
};
