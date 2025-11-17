export interface KPI {
  aiOutputAcceptanceRate: number;
  averageTimeSavedPerCase: number;
  reportsGeneratedByAI: number;
  totalHumanReviewEdits: number;
}

export type GetKPIResponse = KPI