import { AIPerformanceBaseParamsProps, ApiResponse } from "@/services/dashboard/base";
import service from "@/services/dashboard/instance";

import { GetInvestigationTimeResponse } from "./types";

export const getInvestigationTime = async (params: AIPerformanceBaseParamsProps): Promise<GetInvestigationTimeResponse> => {
  const response = await service.get<ApiResponse<GetInvestigationTimeResponse>>('/ai-performance/investigation-time', { params });

  return response.data.data;
};
