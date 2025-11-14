import service from "@/services/dashboard/instance";

import { TopKeywordsProps } from "./types";
import { AIPerformanceBaseParamsProps } from "../../base";

export const getTopKeywords = async (params: AIPerformanceBaseParamsProps): Promise<TopKeywordsProps> => {
  const response = await service.get<TopKeywordsProps>('/ai-performance/top-keywords', { params });

  return response.data;
};
