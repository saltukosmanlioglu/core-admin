export interface KPI {
  averageQualityScore: number;
  numberOfInvestigationsReviewed: number
  highQualityInvestigations: number;
}

export type GetKPIResponse = KPI