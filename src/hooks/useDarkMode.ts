import {useEffect, useState} from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Vérifier d'abord si l'utilisateur a une préférence enregistrée
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      return saved === "true";
    }
    // Sinon, utiliser la préférence système
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Sauvegarder la préférence
    localStorage.setItem("darkMode", isDark.toString());
  }, [isDark]);

  // Écouter les changements de préférence système
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      // Ne changer que si l'utilisateur n'a pas défini de préférence manuelle
      const saved = localStorage.getItem("darkMode");
      if (saved === null) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return {isDark, setIsDark};
}
