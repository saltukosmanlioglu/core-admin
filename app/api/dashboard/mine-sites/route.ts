import { NextResponse } from "next/server";

import { ApiResponse } from "@/services/dashboard/base";
import { GetMineSiteResponse } from "@/services/dashboard/mine-site";

export async function GET() {
  const mineSites: ApiResponse<GetMineSiteResponse> = {
    data: [
      { name: "Mine Site 1" },
      { name: "Mine Site 2" },
      { name: "Mine Site 3" },
    ],
    message: 'Response',
    success: true
  };

  return NextResponse.json(mineSites);
}
