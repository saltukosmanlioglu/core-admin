import { ApiResponse } from "@/services/dashboard/base";
import service from "@/services/dashboard/instance";

import { GetModuleResponse } from "./types";

export const getModules = async (): Promise<GetModuleResponse> => {
  const response = await service.get<ApiResponse<GetModuleResponse>>("/modules");

  return response.data.data;
};