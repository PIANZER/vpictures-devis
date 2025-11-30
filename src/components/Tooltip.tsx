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
        className="inline-flex items-center justify-center text-sm font-medium transition-colors hover:text-accent-foreground h-4 w-4 text-muted-foreground"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={(e) => {
          e.preventDefault();
          setIsVisible(!isVisible);
        }}
      >
        <Info className="h-4 w-4" />
      </button>

      {isVisible && (
        <div className="absolute z-50 left-0 bottom-full mb-2 w-64 rounded-md border bg-popover px-3 py-2 text-sm text-popover-foreground shadow-md">
          <div className="absolute left-4 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-border"></div>
          {text}
        </div>
      )}
    </div>
  );
};
