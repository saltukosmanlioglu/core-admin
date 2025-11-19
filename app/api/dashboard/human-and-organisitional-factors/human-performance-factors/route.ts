import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/services/dashboard/base";
import {
  GetHumanPerformanceFactorsResponse,
  HumanPerformanceFactorsData,
} from "@/services/dashboard/human-and-organisitional-factors/human-performance-factor";

export async function GET(req: NextRequest) {
  const categories = [
    "Fatigue",
    "Communication",
    "Procedure Adherence",
    "Training",
    "High",
  ];

  const scoreLabels = ["Low", "Medium", "High"];

  const ROWS = 12; // 🔥 100 yerine 50 → yarıya düşürüldü
  const COLS = categories.length;

  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const data: HumanPerformanceFactorsData[] = [];

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const bias = x / (COLS - 1);
      const value = rand(0, 50) + Math.round(bias * 80);

      data.push({ x, y, value });
    }
  }

  const response: ApiResponse<GetHumanPerformanceFactorsResponse> = {
    success: true,
    message: "Performance heatmap generated",
    data: {
      categories,
      scoreLabels,
      data,
    },
  };

  return NextResponse.json(response);
}
