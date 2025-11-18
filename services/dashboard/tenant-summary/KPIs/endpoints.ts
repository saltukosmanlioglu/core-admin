import { ApiResponse, TenantSummaryBaseParamsProps } from "@/services/dashboard/base";
import service from "@/services/dashboard/instance";

import { GetKPIResponse } from "./types";

export const getKPIs = async (params: TenantSummaryBaseParamsProps): Promise<GetKPIResponse> => {
  const response = await service.get<ApiResponse<GetKPIResponse>>('/tenant-summary/KPIs', { params });

  return response.data.data;
};
