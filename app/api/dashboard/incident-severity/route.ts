import { NextResponse } from "next/server";

import { ApiResponse } from "@/services/dashboard/base";
import { GetIncidentSeverityResponse } from "@/services/dashboard/incident-severity";

export async function GET() {
  const incidentSeverities: ApiResponse<GetIncidentSeverityResponse> = {
    data: [
      { name: "Low" },
      { name: "Medium", },
      { name: "High", },
      { name: "Critical", }
    ],
    message: 'Response',
    success: true
  };

  return NextResponse.json(incidentSeverities);
}
