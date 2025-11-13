"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

import ChartCard from "./components/chart-card";

const ReactECharts = dynamic(() => import("echarts-for-react"), {
  ssr: false,
}) as any;

echarts.use([TitleComponent, TooltipComponent, CanvasRenderer]);

interface WordCloudSeriesOption {
  type: "wordCloud";
  shape?: string;
  gridSize?: number;
  sizeRange?: [number, number];
  rotationRange?: [number, number];
  rotationStep?: number;
  textStyle?: {
    color?: string | (() => string);
  };
  emphasis?: any;
  data: Array<{ name: string; value: number }>;
}

type EChartsOption = echarts.EChartsCoreOption & {
  series: WordCloudSeriesOption[];
};

const TopKeywordsInAIFindings: React.FC = () => {
  useEffect(() => {
    require("echarts-wordcloud");
  }, []);

  const colors = ["#1f6feb", "#6aa7ff", "#c8a043", "#b58b35"];

  const data: WordCloudSeriesOption["data"] = [
    { name: "training", value: 45 },
    { name: "supervision", value: 60 },
    { name: "communication", value: 35 },
    { name: "fatigue", value: 65 },
    { name: "procedure", value: 55 },
    { name: "equipment", value: 42 },
    { name: "Jones", value: 25 },
    { name: "sustsorio", value: 50 },
    { name: "safety", value: 40 },
    { name: "data", value: 30 },
    { name: "report", value: 38 },
    { name: "monitoring", value: 48 },
    { name: "automation", value: 33 },
    { name: "inspection", value: 44 },
    { name: "compliance", value: 37 },
    { name: "oversight", value: 52 },
    { name: "maintenance", value: 43 },
    { name: "logging", value: 28 },
    { name: "analysis", value: 50 },
    { name: "workflow", value: 34 },
    { name: "alert", value: 32 },
    { name: "incident", value: 39 },
    { name: "review", value: 41 },
    { name: "validation", value: 29 },
    { name: "feedback", value: 36 },
    { name: "detection", value: 47 },
    { name: "integration", value: 31 },
    { name: "adjustment", value: 27 },
    { name: "modeling", value: 33 },
    { name: "execution", value: 35 },
    { name: "assessment", value: 46 },
    { name: "evaluation", value: 49 },
    { name: "response", value: 40 },
    { name: "alerting", value: 28 },
    { name: "prediction", value: 53 },
    { name: "error", value: 30 },
    { name: "alert", value: 37 },
    { name: "control", value: 44 },
    { name: "support", value: 42 },
    { name: "accuracy", value: 55 },
    { name: "review", value: 33 },
    { name: "operation", value: 39 },
    { name: "classification", value: 50 },
  ];

  const option: EChartsOption = {
    tooltip: {
      show: true,
      formatter: (params: any) => {
        const { name, value } = params;
        return `${name}: <b>${value}</b>`;
      },
    },
    series: [
      {
        type: "wordCloud",
        shape: "circle",
        gridSize: 6,
        sizeRange: [12, 46],
        rotationRange: [-90, 90],
        rotationStep: 90,
        textStyle: {
          color: () => colors[Math.floor(Math.random() * colors.length)],
        },
        emphasis: {
          focus: "self",
          textStyle: {
            shadowBlur: 8,
            shadowColor: "rgba(0,0,0,0.15)",
          },
        },
        data,
      },
    ],
  };

  return (
    <ChartCard title="Top Keywords in AI Findings">
      <ReactECharts option={option} style={{ height: 360, width: "100%" }} />
    </ChartCard>
  );
};

export default TopKeywordsInAIFindings;
