import React from "react";
import {Moon, Sun} from "lucide-react";

interface DarkModeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  isDark,
  onToggle,
}) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg border-2 border-cyan-200 dark:border-cyan-700 bg-white dark:bg-gray-800 hover:bg-cyan-50 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="w-6 h-6 text-yellow-500" />
      ) : (
        <Moon className="w-6 h-6 text-cyan-600" />
      )}
    </button>
  );
};
