import { NextResponse } from "next/server";

import { ApiResponse } from "@/services/dashboard/base";
import { GetCompanyResponse } from "@/services/dashboard/company";

export async function GET() {
  const companies: ApiResponse<GetCompanyResponse> = {
    data: [
      { name: "Company 1" },
      { name: "Company 2" },
      { name: "Company 3" },
    ],
    message: 'Response',
    success: true
  };

  return NextResponse.json(companies);
}
