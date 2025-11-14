import service from "@/services/dashboard/instance";

import { KPIProps } from "./types";
import { AIPerformanceBaseParamsProps } from "../../base";

export const getKPIs = async (params: AIPerformanceBaseParamsProps): Promise<KPIProps> => {
  const response = await service.get<KPIProps>('/ai-performance/KPIs', { params });

  return response.data;
};
