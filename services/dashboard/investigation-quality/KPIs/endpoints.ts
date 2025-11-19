import {
  ApiResponse,
  InvestigationQualityBaseParamsProps
} from "@/services/dashboard/base";
import service from "@/services/dashboard/instance";

import { GetKPIResponse } from "./types";

export const getKPIs = async (params: InvestigationQualityBaseParamsProps): Promise<GetKPIResponse> => {
  const response = await service.get<ApiResponse<GetKPIResponse>>('/investigation-quality/KPIs', { params });

  return response.data.data;
};
