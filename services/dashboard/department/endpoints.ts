import service from "@/services/dashboard/instance";

import { GetDepartmentResponse } from "./types";

export const getDepartments = async (): Promise<GetDepartmentResponse> => {
  const response = await service.get<GetDepartmentResponse>("/departments");

  return response.data;
};