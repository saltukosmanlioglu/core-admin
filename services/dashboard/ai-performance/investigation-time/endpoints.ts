import service from "@/services/dashboard/instance";

import { InvestigationTimeProps } from "./types";
import { AIPerformanceBaseParamsProps } from "../../base";

export const getInvestigationTime = async (params: AIPerformanceBaseParamsProps): Promise<InvestigationTimeProps> => {
  const response = await service.get<InvestigationTimeProps>('/ai-performance/investigation-time', { params });

  return response.data;
};
