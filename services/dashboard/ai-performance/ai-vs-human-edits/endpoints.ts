import service from "@/services/dashboard/instance";

import { AIVsHumanEditsProps } from "./types";
import { AIPerformanceBaseParamsProps } from "../../base";

export const getAIVsHumanEdits = async (params: AIPerformanceBaseParamsProps): Promise<AIVsHumanEditsProps> => {
  const response = await service.get<AIVsHumanEditsProps>('/ai-performance/ai-vs-human-edits', { params });

  return response.data;
};
