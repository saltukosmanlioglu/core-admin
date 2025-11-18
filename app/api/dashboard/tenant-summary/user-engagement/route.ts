import { NextRequest, NextResponse } from "next/server";

import { ApiResponse, TenantSummaryBaseParamsProps } from "@/services/dashboard/base";

export type EngagementSegment = {
  name: string;
  value: number;
  color: string;
  subtitle: string;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const params: TenantSummaryBaseParamsProps = {
    company: searchParams.get("company") || undefined,
    dateRange: searchParams.get("dateRange") || undefined,
    module: searchParams.get("module") || undefined,
  };

  const data: EngagementSegment[] = [
    {
      name: "Active",
      value: 40,
      color: "#22a26b",
      subtitle: "(last 7 days)",
    },
    {
      name: "Low Engagement",
      value: 30,
      color: "#2563eb",
      subtitle: "(8–30 days)",
    },
    {
      name: "Inactive",
      value: 25,
      color: "#e35151",
      subtitle: "(31–90 days)",
    },
    {
      name: "Invite Needed",
      value: 15,
      color: "#f5a623",
      subtitle: "Invite to upcoming release webinar",
    },
  ];

  const response: ApiResponse<EngagementSegment[]> = {
    data,
    success: true,
    message: "User engagement segments fetched successfully",
  };

  return NextResponse.json(response);
}
