"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

import DashboardCard from "@/components/dashboard-card";

import { ChildProps } from "./types";

const ReactECharts = dynamic(() => import("echarts-for-react"), {
  ssr: false,
});

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

const TopKeywords: React.FunctionComponent<ChildProps & { data: WordCloudSeriesOption["data"] }> = ({
  data,
  onChartReady
}) => {

  useEffect(() => {
    require("echarts-wordcloud");
  }, []);

  const colors = ["#1f6feb", "#6aa7ff", "#c8a043", "#b58b35"];

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
    <DashboardCard title="Top Keywords in AI Findings">
      <ReactECharts
        onChartReady={onChartReady}
        option={option}
        style={{ minHeight: 320, height: '100%', width: "100%" }}
      />
    </DashboardCard>
  );
};

export default TopKeywords;
