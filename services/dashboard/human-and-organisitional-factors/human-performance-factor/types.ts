export interface HumanPerformanceFactorsData {
  value: number;
  x: number;
  y: number;
}

export interface HumanPerformanceFactors {
  categories: Array<string>;
  data: Array<HumanPerformanceFactorsData>;
  scoreLabels: Array<string>;
}

export type GetHumanPerformanceFactorsResponse = HumanPerformanceFactors