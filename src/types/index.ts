export type ProjectType = "server" | "group" | "script" | "social";

export interface PriceModifier {
  actors: number;
  extras: number;
  duration: number;
  shootingServer: boolean;
  guideline: boolean;
  script: boolean;
  watermark: boolean;
  fastDelivery: boolean;
  verticalFormat: boolean;
  subtitles?: boolean;
  discount?: number;
}

export interface ProjectTypeInfo {
  id: ProjectType;
  label: string;
  percentageModifier: number;
}

export interface SliderConfig {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  price: number | {min: number; max: number};
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface AdditionalOption {
  id: keyof Pick<
    PriceModifier,
    | "shootingServer"
    | "guideline"
    | "script"
    | "watermark"
    | "fastDelivery"
    | "verticalFormat"
    | "subtitles"
  >;
  label: string;
  price: number;
  excludeForTiktok?: boolean;
  onlyForTiktok?: boolean;
  description?: string;
}
