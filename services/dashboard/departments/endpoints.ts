import service from "@/services/dashboard/instance";

import { DepartmentProps } from "./types";

export const getDepartments = async (): Promise<DepartmentProps> => {
  const response = await service.get<DepartmentProps>('/deparments');

  return response.data;
};
