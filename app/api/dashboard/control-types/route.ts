import { NextResponse } from "next/server";

import { ApiResponse } from "@/services/dashboard/base";
import { GetControlTypeResponse } from "@/services/dashboard/control-type";

export async function GET() {
  const controlTypes: ApiResponse<GetControlTypeResponse> = {
    data: [
      { name: "Engineering Controls" },
      { name: "Administrative Controls" },
      { name: "PPE" },
      { name: "Substitution" },
      { name: "Elimination" },
      { name: "Isolation" },
    ],
    success: true,
    message: "Control types loaded successfully",
  };

  return NextResponse.json(controlTypes);
}
