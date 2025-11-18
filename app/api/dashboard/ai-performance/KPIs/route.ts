import { NextRequest, NextResponse } from "next/server";

import { AIPerformanceBaseParamsProps, ApiResponse } from "@/services/dashboard/base";
import { KPI } from "@/services/dashboard/ai-performance/KPIs";

function rand(min = 0, max = 10000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const params: AIPerformanceBaseParamsProps = {
    dateRange: searchParams.get("dateRange") || undefined,
    department: searchParams.get("department") || undefined,
    investigator: searchParams.get("investigator") || undefined,
  };

  let base: KPI = {
    aiOutputAcceptanceRate: rand(60, 99),
    reportsGeneratedByAI: rand(0, 10000),
    averageTimeSavedPerCase: rand(0, 10000),
    totalHumanReviewEdits: rand(0, 10000),
  };

  let factor = 1;

  if (params.dateRange) {
    const length = params.dateRange.length;
    factor += (length % 5) * 0.01;
  }

  if (params.department) {
    const depLen = params.department.length;
    factor += (depLen % 3) * 0.02;
  }

  if (params.investigator) {
    const invLen = params.investigator.length;
    factor += (invLen % 4) * 0.015;
  }

  factor = Math.min(Math.max(factor, 0.9), 1.3);

  const aiOutputAcceptanceRate = Math.max(
    60,
    Math.min(99, Math.round(base.aiOutputAcceptanceRate * factor))
  );

  const averageTimeSavedPerCase = Math.max(
    10,
    Math.round(base.averageTimeSavedPerCase * factor)
  );

  const reportsGeneratedByAI = Math.max(
    100,
    Math.round(base.reportsGeneratedByAI * factor)
  );

  const totalHumanReviewEdits = Math.max(
    50,
    Math.round(base.totalHumanReviewEdits * factor)
  );

  const payload: KPI = {
    aiOutputAcceptanceRate,
    averageTimeSavedPerCase,
    reportsGeneratedByAI,
    totalHumanReviewEdits,
  };

  const response: ApiResponse<KPI> = {
    data: payload,
    success: true,
    message: "KPI metrics generated successfully",
  };

  return NextResponse.json(response);
}
