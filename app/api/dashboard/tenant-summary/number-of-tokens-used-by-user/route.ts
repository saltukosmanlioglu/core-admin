import { NextRequest, NextResponse } from "next/server";

import { ApiResponse, TenantSummaryBaseParamsProps } from "@/services/dashboard/base";
import { GetNumberOfTokenUsedByUserResponse, NumberOfTokenUsedByUser } from "@/services/dashboard/tenant-summary/number-of-tokens-used-by-user";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const params: TenantSummaryBaseParamsProps = {
    company: searchParams.get("company") || undefined,
    dateRange: searchParams.get("dateRange") || undefined,
    module: searchParams.get("module") || undefined,
  };

  console.log(params)

  const data: Array<NumberOfTokenUsedByUser> = [
    { label: "User 1", used: 5, limit: 10 },
    { label: "User 2", used: 15, limit: 20 },
    { label: "User 3", used: 25, limit: 30 },
    { label: "User 4", used: 40, limit: 45 },
    { label: "User 5", used: 12, limit: 18 },
    { label: "User 6", used: 8, limit: 14 },
    { label: "User 7", used: 33, limit: 40 },
    { label: "User 8", used: 17, limit: 22 },
  ];

  const response: ApiResponse<GetNumberOfTokenUsedByUserResponse> = {
    data,
    success: true,
    message: "Tokens used per user fetched successfully",
  };

  return NextResponse.json(response);
}
