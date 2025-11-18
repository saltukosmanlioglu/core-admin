import { AIPerformanceBaseParamsProps, ApiResponse } from "@/services/dashboard/base";
import service from "@/services/dashboard/instance";

import { GetNumberOfTokenUsedByUserResponse } from "./types";

export const getNumberOfTokenUsedByUser = async (params: AIPerformanceBaseParamsProps): Promise<GetNumberOfTokenUsedByUserResponse> => {
    const response = await service.get<ApiResponse<GetNumberOfTokenUsedByUserResponse>>('/tenant-summary/number-of-tokens-used-by-user', { params });

    return response.data.data;
};
