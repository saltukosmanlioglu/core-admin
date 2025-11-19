import { NextResponse } from "next/server";

import { ApiResponse } from "@/services/dashboard/base";
import { GetCategoryResponse } from "@/services/dashboard/category";

export async function GET() {
  const categories: ApiResponse<GetCategoryResponse> = {
    data: [
      { name: "Category 1" },
      { name: "Category 2" },
      { name: "Category 3" },
    ],
    message: 'Response',
    success: true
  };

  return NextResponse.json(categories);
}
