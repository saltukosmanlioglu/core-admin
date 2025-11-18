import { NextRequest, NextResponse } from "next/server";

import {
  ApiResponse,
  TenantSummaryBaseParamsProps,
} from "@/services/dashboard/base";
import { KPI } from "@/services/dashboard/tenant-summary/KPIs";

function rand(min = 0, max = 10000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const params: TenantSummaryBaseParamsProps = {
    company: searchParams.get("company") || undefined,
    dateRange: searchParams.get("dateRange") || undefined,
    module: searchParams.get("module") || undefined,
  };

  // --- BASE KPI VALUES (mock) ---
  const baseActiveUsers = rand(80, 260);
  const baseInactiveUsers = rand(40, 180);
  const baseTokenMax = 2000;
  const baseTokenValue = rand(900, baseTokenMax);
  const baseTokensUsedValue = rand(1200, 2500);
  const baseChangePercent = rand(-15, 20);

  // --- FACTOR CALCULATION (params'a göre oynayan kısım) ---
  let factor = 1;

  if (params.dateRange) {
    const len = params.dateRange.length;
    factor += (len % 5) * 0.01;
  }

  if (params.company) {
    const len = params.company.length;
    factor += (len % 4) * 0.015;
  }

  if (params.module) {
    const len = params.module.length;
    factor += (len % 3) * 0.02;
  }

  factor = Math.min(Math.max(factor, 0.9), 1.3);

  // --- FINAL KPI VALUES ---
  const activeUsers = Math.max(0, Math.round(baseActiveUsers * factor));
  const inactiveUsers = Math.max(0, Math.round(baseInactiveUsers * (2 - factor)));

  const tokenValue = Math.min(
    baseTokenMax,
    Math.max(0, Math.round(baseTokenValue * factor))
  );

  const numberOfTokensUsedValue = Math.max(
    0,
    Math.round(baseTokensUsedValue * factor)
  );

  const changePercent = Math.max(
    -40,
    Math.min(40, Math.round(baseChangePercent * factor))
  );

  const payload: KPI = {
    activeUsers,
    inactiveUsers,
    company: {
      // tipten geliyor: Company
      name: params.company ?? "Global Mining Co.",
    },
    token: {
      value: tokenValue,
      maxValue: baseTokenMax,
    },
    numberOfTokensUsed: {
      value: numberOfTokensUsedValue,
      changePercent,
    },
  };

  const response: ApiResponse<KPI> = {
    data: payload,
    success: true,
    message: "Tenant summary KPI metrics generated successfully",
  };

  return NextResponse.json(response);
}
