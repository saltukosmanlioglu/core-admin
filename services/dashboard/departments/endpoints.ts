import service from "@/services/dashboard/instance";

import { DepartmentProps } from "./types";

export const getDepartments = async (): Promise<Array<DepartmentProps>> => {
  const response = await service.get<Array<DepartmentProps>>("/departments");

  return response.data;
};