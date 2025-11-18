import { ApiResponse } from '@/services/dashboard/base';
import service from '@/services/dashboard/instance';

import { GetInvestigatorResponse } from "./types";

export const getInvestigators = async (): Promise<GetInvestigatorResponse> => {
  const response = await service.get<ApiResponse<GetInvestigatorResponse>>("/investigators");

  return response.data.data;
};