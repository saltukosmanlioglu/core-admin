export interface InvestigationTime {
  aiValue: number;
  humanValue: number
  month: string;
}

export type GetInvestigationTimeResponse = Array<InvestigationTime>