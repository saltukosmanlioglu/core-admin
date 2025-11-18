import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/services/dashboard/base";
import { GetTopKeywordsResponse } from "@/services/dashboard/ai-performance/top-keywords";

export async function GET(req: NextRequest) {
  const keywords = [
    "training", "supervision", "communication", "fatigue", "procedure",
    "equipment", "Jones", "sustsorio", "safety", "data", "report",
    "monitoring", "automation", "inspection", "compliance", "oversight",
    "maintenance", "logging", "analysis", "workflow", "alert", "incident",
    "review", "validation", "feedback", "detection", "integration",
    "adjustment", "modeling", "execution", "assessment", "evaluation",
    "response", "alerting", "prediction", "error", "alert", "control",
    "support", "accuracy", "review", "operation", "classification"
  ];

  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const generated: GetTopKeywordsResponse = keywords.map((name) => ({
    name,
    value: rand(10, 70),
  }));

  const response: ApiResponse<GetTopKeywordsResponse> = {
    data: generated,
    success: true,
    message: "Top keyword list generated successfully",
  };

  return NextResponse.json(response);
}
