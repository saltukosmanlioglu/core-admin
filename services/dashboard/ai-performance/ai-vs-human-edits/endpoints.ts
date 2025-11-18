import { AIPerformanceBaseParamsProps, ApiResponse } from "@/services/dashboard/base";
import service from "@/services/dashboard/instance";

import { GetAIVsHumanEditsResponse } from "./types";

export const getAIVsHumanEdits = async (params: AIPerformanceBaseParamsProps): Promise<GetAIVsHumanEditsResponse> => {
  const response = await service.get<ApiResponse<GetAIVsHumanEditsResponse>>('/ai-performance/ai-vs-human-edits', { params });

  return response.data.data;
};
