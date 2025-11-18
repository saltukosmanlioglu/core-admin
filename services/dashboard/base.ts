export interface ApiResponse<T> {
  data: T;
  success?: boolean;
  message?: string;
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