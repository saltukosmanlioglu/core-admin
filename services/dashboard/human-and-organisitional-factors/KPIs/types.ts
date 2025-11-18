export interface KPI {
  totalICAMCasesAnalysed: number;
  organisitionalCauses: number
  avgControlEffectivenessScore: number;
}

export type GetKPIResponse = KPI