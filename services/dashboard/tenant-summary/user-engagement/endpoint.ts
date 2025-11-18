import { AIPerformanceBaseParamsProps, ApiResponse } from "@/services/dashboard/base";
import service from "@/services/dashboard/instance";

import { GetUserEngagementResponse } from "./types";

export const getUserEngagements = async (params: AIPerformanceBaseParamsProps): Promise<GetUserEngagementResponse> => {
    const response = await service.get<ApiResponse<GetUserEngagementResponse>>('/tenant-summary/user-engagement', { params });

    return response.data.data;
};
