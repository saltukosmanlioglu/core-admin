import { AIPerformanceBaseParamsProps, ApiResponse } from "@/services/dashboard/base";
import service from "@/services/dashboard/instance";

import { GetUserActivityResponse } from "./types";

export const getUserActivities = async (params: AIPerformanceBaseParamsProps): Promise<GetUserActivityResponse> => {
    const response = await service.get<ApiResponse<GetUserActivityResponse>>('/tenant-summary/user-activities', { params });

    return response.data.data;
};
