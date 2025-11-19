import service from "@/services/dashboard/instance";
import {
  HumanAndOrganisitionalFactorsBaseParamsProps,
  ApiResponse,
} from "@/services/dashboard/base";
import {
  RootCauseCategory,
  GetRootCauseCategoriesResponse,
} from "./types";

export const getRootCauseCategories = async (params: HumanAndOrganisitionalFactorsBaseParamsProps): Promise<GetRootCauseCategoriesResponse> => {
  const response = await service.get<ApiResponse<RootCauseCategory[]>>("/human-and-organisitional-factors/root-cause-categories", { params });

  return response.data.data;
};
