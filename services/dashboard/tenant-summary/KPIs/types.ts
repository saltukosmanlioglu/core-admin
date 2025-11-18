import { Company } from "@/services/dashboard/company";

export interface KPI {
  activeUsers: number;
  company: Company;
  costPerToken: number;
  inactiveUsers: number;
  numberOfTokensUsed: number;
}

export type GetKPIResponse = KPI