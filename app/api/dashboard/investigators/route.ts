import { NextResponse } from "next/server";

import { ApiResponse } from "@/services/dashboard/base";
import { GetInvestigatorResponse } from "@/services/dashboard/investigator";

export async function GET() {
  const investigators: ApiResponse<GetInvestigatorResponse> = {
    data: [
      { name: "Dr. Eleanor Matthews" },
      { name: "Dr. Sarah Connor" },
      { name: "James Wilson" },
    ],
    message: 'Response',
    success: true
  };

  return NextResponse.json(investigators);
}
