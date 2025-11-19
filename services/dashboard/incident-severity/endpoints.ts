import { ApiResponse } from "@/services/dashboard/base";
import service from "@/services/dashboard/instance";

import { GetIncidentSeverityResponse } from "./types";

export const getIncidentSeverities = async (): Promise<GetIncidentSeverityResponse> => {
  const response = await service.get<ApiResponse<GetIncidentSeverityResponse>>("/incident-severity");

  return response.data.data;
};