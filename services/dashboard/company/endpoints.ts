import service from "@/services/dashboard/instance";

import { GetCompanyResponse } from "./types";

export const getCompanies = async (): Promise<GetCompanyResponse> => {
  const response = await service.get<GetCompanyResponse>("/companies");

  return response.data;
};