import { ApiResponse } from "@/services/dashboard/base";
import service from "@/services/dashboard/instance";

import { GetPHMPAreaResponse } from "./types";

export const getPHMPAreas = async (): Promise<GetPHMPAreaResponse> => {
  const response = await service.get<ApiResponse<GetPHMPAreaResponse>>("/phmp-areas");

  return response.data.data;
};
