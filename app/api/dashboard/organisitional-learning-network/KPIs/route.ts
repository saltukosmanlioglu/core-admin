import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/services/dashboard/base";

import { KPI } from "@/services/dashboard/organisitional-learning-network/KPIs";

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const params = {
    incidentSeverity: searchParams.get("incidentSeverity") || undefined,
    dateRange: searchParams.get("dateRange") || undefined,
    mineSite: searchParams.get("mineSite") || undefined,
  };

  const base: KPI = {
    numberOfIncidentsMapped: randInt(50, 300),
    commonCauses: randInt(5, 80),
    sharedLearningsLinks: randInt(10, 150),
  };

  let factor = 1;

  if (params.incidentSeverity) factor += (params.incidentSeverity.length % 4) * 0.02;
  if (params.dateRange) factor += (params.dateRange.length % 5) * 0.015;
  if (params.mineSite) factor += (params.mineSite.length % 3) * 0.02;

  factor = Math.min(Math.max(factor, 0.9), 1.25);

  const payload: KPI = {
    numberOfIncidentsMapped: Math.round(base.numberOfIncidentsMapped * factor),
    commonCauses: Math.round(base.commonCauses * factor),
    sharedLearningsLinks: Math.round(base.sharedLearningsLinks * factor),
  };

  const response: ApiResponse<KPI> = {
    data: payload,
    success: true,
    message: "Organisational Learning Network KPI metrics generated successfully",
  };

  return NextResponse.json(response);
}
