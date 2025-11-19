import { HumanAndOrganisitionalFactorsBaseParamsProps, ApiResponse } from "@/services/dashboard/base";
import service from "@/services/dashboard/instance";

import { GetHumanPerformanceFactorsResponse } from "./types";

export const getHumanPerformanceFactors = async (params: HumanAndOrganisitionalFactorsBaseParamsProps): Promise<GetHumanPerformanceFactorsResponse> => {
    const response = await service.get<ApiResponse<GetHumanPerformanceFactorsResponse>>("/human-and-organisitional-factors/human-performance-factors", { params });

    return response.data.data;
};
