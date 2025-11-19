import { NextRequest, NextResponse } from "next/server";

import {
  ApiResponse,
  InvestigationQualityBaseParamsProps
} from "@/services/dashboard/base";

import { KPI } from "@/services/dashboard/investigation-quality/KPIs";

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const params: InvestigationQualityBaseParamsProps = {
    category: searchParams.get("category") || undefined,
    dateRange: searchParams.get("dateRange") || undefined,
    mineSite: searchParams.get("mineSite") || undefined,
  };

  const base: KPI = {
    averageQualityScore: randInt(40, 95),
    numberOfInvestigationsReviewed: randInt(20, 150),
    highQualityInvestigations: randInt(20, 90),
  };

  let factor = 1;

  if (params.dateRange) factor += (params.dateRange.length % 5) * 0.01;
  if (params.category) factor += (params.category.length % 4) * 0.015;
  if (params.mineSite) factor += (params.mineSite.length % 3) * 0.02;

  factor = Math.min(Math.max(factor, 0.9), 1.25);

  const payload: KPI = {
    averageQualityScore: Math.max(
      0,
      Math.min(100, Math.round(base.averageQualityScore * factor))
    ),

    numberOfInvestigationsReviewed: Math.max(
      0,
      Math.round(base.numberOfInvestigationsReviewed * factor)
    ),

    highQualityInvestigations: Math.max(
      0,
      Math.min(100, Math.round(base.highQualityInvestigations * factor))
    ),
  };

  const response: ApiResponse<KPI> = {
    data: payload,
    success: true,
    message: "Investigation Quality KPI metrics generated successfully",
  };

  return NextResponse.json(response);
}
