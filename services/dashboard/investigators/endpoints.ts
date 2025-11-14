import service from "@/services/dashboard/instance";

import { InvestigatorProps } from "./types";

export const getInvestigators = async (): Promise<InvestigatorProps> => {
  const response = await service.get<InvestigatorProps>('/investigators');

  return response.data;
};
