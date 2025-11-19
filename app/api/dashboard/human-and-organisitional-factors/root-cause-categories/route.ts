import { NextRequest, NextResponse } from "next/server";

import {
  ApiResponse,
  HumanAndOrganisitionalFactorsBaseParamsProps,
} from "@/services/dashboard/base";
import { GetRootCauseCategoriesResponse } from "@/services/dashboard/human-and-organisitional-factors/root-cause-category";

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const params: HumanAndOrganisitionalFactorsBaseParamsProps = {
    dateRange: searchParams.get("dateRange") || undefined,
    department: searchParams.get("department") || undefined,
    controlType: searchParams.get("controlType") || undefined,
    phmpArea: searchParams.get("phmpArea") || undefined,
  };

  let factor = 1;

  if (params.dateRange) factor += (params.dateRange.length % 5) * 0.01;
  if (params.department) factor += (params.department.length % 4) * 0.015;
  if (params.controlType) factor += (params.controlType.length % 3) * 0.02;
  if (params.phmpArea) factor += (params.phmpArea.length % 4) * 0.01;

  factor = Math.min(Math.max(factor, 0.9), 1.25);

  const quarters = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"];

  const baseData: GetRootCauseCategoriesResponse = quarters.map(() => ({
    quarter: "Q1",
    humanFactors: rand(5, 20),
    organisationalFactors: rand(10, 30),
    technicalFailures: rand(15, 40),
  }));

  const data: GetRootCauseCategoriesResponse = baseData.map((item, idx) => ({
    quarter: quarters[idx],
    humanFactors: Math.round(item.humanFactors * factor),
    organisationalFactors: Math.round(item.organisationalFactors * factor),
    technicalFailures: Math.round(item.technicalFailures * factor),
  }));

  const response: ApiResponse<GetRootCauseCategoriesResponse> = {
    data,
    success: true,
    message: "Root cause categories generated successfully",
  };

  return NextResponse.json(response);
}
