import { ApiResponse } from "@/services/dashboard/base";
import service from "@/services/dashboard/instance";

import { GetCategoryResponse } from "./types";

export const getCategories = async (): Promise<GetCategoryResponse> => {
  const response = await service.get<ApiResponse<GetCategoryResponse>>("/categories");

  return response.data.data;
};