import { NextResponse } from "next/server";

import { ApiResponse } from "@/services/dashboard/base";
import { GetModuleResponse } from "@/services/dashboard/module";

export async function GET() {
  const modules: ApiResponse<GetModuleResponse> = {
    data: [
      { name: 'Incident AI' },
      { name: 'SHMS AI' },
      { name: 'Critical Control AI' },
    ],
    message: 'Response',
    success: true
  };

  return NextResponse.json(modules);
}
