import { NextResponse } from "next/server";

import { ApiResponse } from "@/services/dashboard/base";

type CompanyProps = {
  name: string;
};

export async function GET() {
  const companies: ApiResponse<Array<CompanyProps>> = {
    data: [
      { name: 'Company 1' },
      { name: 'Company 2' },
      { name: 'Company 3' },
    ],
    message: 'Response',
    success: true
  };

  return NextResponse.json(companies);
}
