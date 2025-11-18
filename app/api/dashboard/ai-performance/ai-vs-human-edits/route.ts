import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/services/dashboard/base";
import { GetAIVsHumanEditsResponse } from "@/services/dashboard/ai-performance/ai-vs-human-edits";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const dateRange = searchParams.get("dateRange");
  const investigator = searchParams.get("investigator");
  const department = searchParams.get("department");

  const X_MIN = 2;
  const X_MAX = 46;
  const Y_MIN = 1.4;
  const Y_MAX = 10.0;

  function rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const count = 50;

  const data: GetAIVsHumanEditsResponse = Array.from({ length: count }, () => {
    const x = rand(X_MIN, X_MAX);
    const y = rand(Y_MIN, Y_MAX);
    return [parseFloat(x.toFixed(2)), parseFloat(y.toFixed(2))];
  });

  const response: ApiResponse<GetAIVsHumanEditsResponse> = {
    data,
    success: true,
    message: "AI vs Human edits generated",
  };

  return NextResponse.json(response);
}
