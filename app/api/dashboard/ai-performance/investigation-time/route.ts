import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/services/dashboard/base";
import { GetInvestigationTimeResponse } from "@/services/dashboard/ai-performance/investigation-time";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const dateRange = searchParams.get("dateRange");
  const investigator = searchParams.get("investigator");
  const department = searchParams.get("department");

  console.log(dateRange, investigator, department)

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const AI_MIN = 91;
  const AI_MAX = 282;

  const HUMAN_MIN = 126;
  const HUMAN_MAX = 297;

  function rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const generated: GetInvestigationTimeResponse = months.map((month) => ({
    month,
    aiValue: rand(AI_MIN, AI_MAX),
    humanValue: rand(HUMAN_MIN, HUMAN_MAX),
  }));

  const response: ApiResponse<GetInvestigationTimeResponse> = {
    data: generated,
    success: true,
    message: "Investigation time generated successfully",
  };

  return NextResponse.json(response);
}
