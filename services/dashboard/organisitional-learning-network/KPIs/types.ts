export interface KPI {
  numberOfIncidentsMapped: number;
  commonCauses: number
  sharedLearningsLinks: number;
}

export type GetKPIResponse = KPI