import { NextResponse } from "next/server";

import { ApiResponse } from "@/services/dashboard/base";

type ModuleProps = {
  name: string;
};

export async function GET() {
  const modules: ApiResponse<Array<ModuleProps>> = {
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
