import { NextRequest, NextResponse } from "next/server";

import { ApiResponse, TenantSummaryBaseParamsProps } from "@/services/dashboard/base";

export type UserActivityPoint = {
  date: string;
  primary: number;
  secondary: number;
};

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const params: TenantSummaryBaseParamsProps = {
    company: searchParams.get("company") || undefined,
    dateRange: searchParams.get("dateRange") || undefined,
    module: searchParams.get("module") || undefined,
  };

  const today = new Date();
  const days = 90;

  const data: UserActivityPoint[] = [];

  let primary = 18;
  let secondary = 12;

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);

    if (i !== days - 1) {
      primary += Math.floor(Math.random() * 3);
      secondary += Math.floor(Math.random() * 2);
    }

    data.push({
      date: formatDate(d),
      primary,
      secondary,
    });
  }

  const response: ApiResponse<UserActivityPoint[]> = {
    data,
    success: true,
    message: "User activity over last 90 days",
  };

  return NextResponse.json(response);
}
