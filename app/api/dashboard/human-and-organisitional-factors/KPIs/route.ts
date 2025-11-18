import { NextRequest, NextResponse } from "next/server";

import { ApiResponse, TenantSummaryBaseParamsProps } from "@/services/dashboard/base";
import { KPI } from "@/services/dashboard/human-and-organisitional-factors/KPIs";

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min: number, max: number, decimals = 1) {
  const val = Math.random() * (max - min) + min;
  return parseFloat(val.toFixed(decimals));
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const params: TenantSummaryBaseParamsProps = {
    dateRange: searchParams.get("dateRange") || undefined,
    company: searchParams.get("company") || undefined,
    module: searchParams.get("module") || undefined,
  };

  const base: KPI = {
    totalICAMCasesAnalysed: randInt(50, 300),
    organisitionalCauses: randInt(10, 100),
    avgControlEffectivenessScore: randFloat(1, 5),
  };

  let factor = 1;

  if (params.dateRange) factor += (params.dateRange.length % 5) * 0.01;
  if (params.company) factor += (params.company.length % 3) * 0.015;
  if (params.module) factor += (params.module.length % 4) * 0.02;

  factor = Math.min(Math.max(factor, 0.9), 1.25);

  const payload: KPI = {
    totalICAMCasesAnalysed: Math.round(
      base.totalICAMCasesAnalysed * factor
    ),

    organisitionalCauses: Math.round(
      base.organisitionalCauses * factor
    ),

    avgControlEffectivenessScore: parseFloat(
      Math.min(5, Math.max(1, base.avgControlEffectivenessScore * factor)).toFixed(1)
    ),
  };

  const response: ApiResponse<KPI> = {
    data: payload,
    success: true,
    message: "Human & Organisational Factors KPI metrics generated successfully",
  };

  return NextResponse.json(response);
}
