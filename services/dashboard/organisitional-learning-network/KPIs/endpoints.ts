import {
  ApiResponse,
  HumanAndOrganisitionalFactorsBaseParamsProps,
} from "@/services/dashboard/base";
import service from "@/services/dashboard/instance";

import { GetKPIResponse } from "./types";

export const getKPIs = async (params: HumanAndOrganisitionalFactorsBaseParamsProps): Promise<GetKPIResponse> => {
  const response = await service.get<ApiResponse<GetKPIResponse>>('/organisitional-learning-network/KPIs', { params });

  return response.data.data;
};
