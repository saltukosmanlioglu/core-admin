import { ApiResponse } from "@/services/dashboard/base";
import service from "@/services/dashboard/instance";

import { GetMineSiteResponse } from "./types";

export const getMineSites = async (): Promise<GetMineSiteResponse> => {
  const response = await service.get<ApiResponse<GetMineSiteResponse>>("/mine-sites");

  return response.data.data;
};