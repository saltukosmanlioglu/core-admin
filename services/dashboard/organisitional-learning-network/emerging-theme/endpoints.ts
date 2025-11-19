import { AIPerformanceBaseParamsProps, ApiResponse } from "@/services/dashboard/base";
import service from "@/services/dashboard/instance";

import { GetEmergingThemeResponse } from "./types";

export const getEmergingThemes = async (params: AIPerformanceBaseParamsProps): Promise<GetEmergingThemeResponse> => {
  const response = await service.get<ApiResponse<GetEmergingThemeResponse>>("/organisitional-learning-network/emerging-themes", { params });

  return response.data.data;
};
