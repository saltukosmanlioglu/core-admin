import { Company } from "@/services/dashboard/company";

export type KPIToken = { value: number; maxValue: number };
export type NumberOfTokensUsed = { changePercent: number; value: number; };

export interface KPI {
  activeUsers: number;
  company: Company;
  token: KPIToken;
  inactiveUsers: number;
  numberOfTokensUsed: NumberOfTokensUsed;
}

export type GetKPIResponse = KPI