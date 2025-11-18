import { NextResponse } from "next/server";

import { ApiResponse } from "@/services/dashboard/base";
import { GetPHMPAreaResponse } from "@/services/dashboard/phmp-area";

export async function GET() {
  const areas: ApiResponse<GetPHMPAreaResponse> = {
    data: [
      { name: "Manual Tasks" },
      { name: "Working at Heights" },
      { name: "Hazardous Substances" },
      { name: "Confined Spaces" },
      { name: "Electrical Safety" },
      { name: "Fire & Explosion" },
      { name: "Isolation & Lockout" },
      { name: "Road Safety" },
    ],
    success: true,
    message: "PHMP Areas loaded successfully",
  };

  return NextResponse.json(areas);
}
