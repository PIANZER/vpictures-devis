import React, {useState} from "react";
import {Info} from "lucide-react";

interface TooltipProps {
  text: string;
}

export const Tooltip: React.FC<TooltipProps> = ({text}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="ml-2 text-cyan-500 hover:text-cyan-700 transition-colors"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={(e) => {
          e.preventDefault();
          setIsVisible(!isVisible);
        }}
      >
        <Info className="w-4 h-4" />
      </button>

      {isVisible && (
        <div className="absolute z-50 left-0 bottom-full mb-2 w-64 p-3 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg shadow-lg">
          <div className="absolute left-4 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
          {text}
        </div>
      )}
    </div>
  );
};
