export type ProjectType = 'server' | 'group' | 'script' | 'social';

export interface PriceModifier {
  actors: number;
  extras: number;
  duration: number;
  shootingServer: boolean;
  guideline: boolean;
  script: boolean;
}

export interface ProjectTypeInfo {
  id: ProjectType;
  label: string;
  price: number;
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
  id: keyof Pick<PriceModifier, 'shootingServer' | 'guideline' | 'script'>;
  label: string;
  price: number;
}