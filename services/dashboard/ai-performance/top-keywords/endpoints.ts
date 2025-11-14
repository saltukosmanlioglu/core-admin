import service from "@/services/dashboard/instance";

import { TopKeywordsProps } from "./types";
import { AIPerformanceBaseParamsProps } from "../../base";

export const getTopKeywords = async (params: AIPerformanceBaseParamsProps): Promise<Array<TopKeywordsProps>> => {
  const response = await service.get<Array<TopKeywordsProps>>("/ai-performance/top-keywords", { params });

  return response.data;
};
