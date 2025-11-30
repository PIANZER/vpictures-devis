import {useState} from "react";
import {ProjectType} from "../types";

interface CopyDevisButtonProps {
  selectedTypes: ProjectType[];
}

export function CopyDevisButton({selectedTypes}: CopyDevisButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = async () => {
    if (selectedTypes.length === 0) return;

    setIsLoading(true);

    try {
      // Copier simplement l'URL actuelle
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Erreur lors de la copie:", error);
      // Fallback pour les navigateurs plus anciens
      try {
        const textArea = document.createElement("textarea");
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (fallbackError) {
        console.error("Erreur lors de la copie (fallback):", fallbackError);
      }
    }

    setIsLoading(false);
  };

  if (selectedTypes.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center space-y-3">
      <button
        onClick={handleCopy}
        disabled={isLoading}
        className={`
          inline-flex w-full items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2
          ${
            isCopied
              ? "bg-emerald-600 text-primary-foreground hover:bg-emerald-600/90"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }
        `}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Copie...</span>
          </div>
        ) : isCopied ? (
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Copié !</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            <span>Copier le lien du devis</span>
          </div>
        )}
      </button>

      <p className="text-sm text-muted-foreground text-center max-w-md">
        Partagez ce lien sur votre ticket Discord pour que les admins puissent
        voir votre devis et vous aider à le finaliser.
      </p>
    </div>
  );
}
