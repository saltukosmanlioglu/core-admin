import { AIPerformanceBaseParamsProps, ApiResponse } from "@/services/dashboard/base";
import service from "@/services/dashboard/instance";

import { GetTopKeywordsResponse } from "./types";

export const getTopKeywords = async (params: AIPerformanceBaseParamsProps): Promise<GetTopKeywordsResponse> => {
  const response = await service.get<ApiResponse<GetTopKeywordsResponse>>("/ai-performance/top-keywords", { params });

  return response.data.data;
};
