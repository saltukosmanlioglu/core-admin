import { NextResponse } from "next/server";

import { GetDepartmentResponse } from "@/services/dashboard/department";
import { ApiResponse } from "@/services/dashboard/base";

export async function GET() {
  const departments: ApiResponse<GetDepartmentResponse> = {
    data: [
      { name: "Data Science" },
      { name: "Forensics" },
      { name: "AI Analysis" },
    ],
    message: 'Response',
    success: true
  };


  return NextResponse.json(departments);
}
