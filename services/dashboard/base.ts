export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface AIPerformanceBaseParamsProps {
  dateRange?: string;
  department?: string;
  investigator?: string;
}

export interface TenantSummaryBaseParamsProps {
  company?: string;
  dateRange?: string;
  module?: string;
}

export interface InvestigationQualityBaseParamsProps {
  category?: string;
  dateRange?: string;
  mineSite?: string;
}

export interface HumanAndOrganisitionalFactorsBaseParamsProps {
  controlType?: string;
  dateRange?: string;
  department?: string;
  phmpArea?: string;
}