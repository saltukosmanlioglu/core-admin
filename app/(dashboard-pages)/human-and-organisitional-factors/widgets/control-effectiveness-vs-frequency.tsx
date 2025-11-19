"use client";

import React from "react";
import ReactECharts from "echarts-for-react";

import DashboardCard from "@/components/dashboard-card";

import { ChildProps } from "./types";

export type ControlBubblePoint = {
  label: string;
  frequency: number;
  effectiveness: number;
  size: number;
};

export interface ControlEffectivenessVsFrequencyProps {
  data: ControlBubblePoint[];
}

export const ControlEffectivenessVsFrequency: React.FunctionComponent<ChildProps & ControlEffectivenessVsFrequencyProps> = ({
  data,
  onChartReady
}) => {
  const option = {
    grid: {
      left: 70,
      right: 20,
      top: 30,
      bottom: 60,
    },
    tooltip: {
      trigger: "item",
      formatter: (params: any) => {
        const [freq, effectiveness, impact] = params.value as number[];
        return [
          `<strong>Frequency:</strong> ${freq}`,
          `<strong>Effectiveness:</strong> ${effectiveness}`,
          `<strong>Impact:</strong> ${impact}`,
        ].join("<br/>");
      },
    },
    xAxis: {
      type: "value",
      name: "Frequency",
      min: 0,
      max: 10,
      nameLocation: "middle",
      nameGap: 40,
      axisLine: { lineStyle: { color: "#9ca3af" } },
      axisTick: { show: false },
      axisLabel: { color: "#6b7280" },
      splitLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: {
      type: "value",
      name: "Effectiveness (0–5)",
      min: 0,
      max: 5,
      nameLocation: "middle",
      nameGap: 50,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#6b7280" },
      splitLine: { lineStyle: { color: "#e5e7eb" } },
    },
    series: [
      {
        type: "scatter",
        name: "Controls",
        data: [
          // [frequency, effectiveness, impact]
          [2, 3.2, 30],
          [4, 2.5, 60],
          [6, 4.1, 80],
          [8, 2.8, 100],
          [5, 3.7, 50],
        ],
        symbolSize: (val: unknown) => {
          const [, , rawImpact] = val as number[];

          // impact 20–100  →  bubble 24–80 px
          const minImpact = 20;
          const maxImpact = 100;
          const minSize = 24;
          const maxSize = 80;

          const clamped = Math.max(minImpact, Math.min(maxImpact, rawImpact));
          const t = (clamped - minImpact) / (maxImpact - minImpact);

          return minSize + t * (maxSize - minSize);
        },
        itemStyle: {
          color: "#c26f28",
          opacity: 0.9,
        },
        emphasis: {
          scale: 1.05,
          focus: "self",
        },
      },
    ],
  };


  return (
    <DashboardCard title="Control Effectiveness vs Frequency">
      <ReactECharts
        onChartReady={onChartReady}
        option={option}
        style={{ minHeight: 320, height: "100%", width: "100%" }}
      />
    </DashboardCard>
  );
};

export default ControlEffectivenessVsFrequency;
