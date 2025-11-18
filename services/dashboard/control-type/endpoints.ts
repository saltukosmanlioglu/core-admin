import { ApiResponse } from "@/services/dashboard/base";
import service from "@/services/dashboard/instance";

import { GetControlTypeResponse } from "./types";

export const getControlTypes = async (): Promise<GetControlTypeResponse> => {
  const response = await service.get<ApiResponse<GetControlTypeResponse>>("/control-types");

  return response.data.data;
};
