import { AIPerformanceBaseParamsProps, ApiResponse } from "@/services/dashboard/base";
import service from "@/services/dashboard/instance";

import { GetKPIResponse } from "./types";

export const getKPIs = async (params: AIPerformanceBaseParamsProps): Promise<GetKPIResponse> => {
  const response = await service.get<ApiResponse<GetKPIResponse>>('/ai-performance/KPIs', { params });

  return response.data.data;
};
