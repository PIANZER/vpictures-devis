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
  price: number;
}

export interface AdditionalOption {
  id: keyof Pick<
    PriceModifier,
    "shootingServer" | "guideline" | "script" | "watermark" | "fastDelivery"
  >;
  label: string;
  price: number;
}
