export interface RootCauseCategory {
  humanFactors: number;
  organisationalFactors: number;
  quarter: string;
  technicalFailures: number;
}

export type GetRootCauseCategoriesResponse = Array<RootCauseCategory>;
