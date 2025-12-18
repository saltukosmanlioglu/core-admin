"use client";

import React, { useState } from "react";
import ReactECharts from "echarts-for-react";

import ChartLoader from "@/components/chart-loader";
import DashboardCard, { ChartChildProps } from "@/components/dashboard-card";

export type ControlBubblePoint = {
  label: string;
  frequency: number;
  effectiveness: number;
  size: number;
};

export interface ControlEffectivenessVsFrequencyProps {
  data: ControlBubblePoint[];
}

export const ControlEffectivenessVsFrequency: React.FunctionComponent<ChartChildProps & ControlEffectivenessVsFrequencyProps> = ({
  data,
  onChartReady
}) => {
  const [fullscreen, setFullscreen] = useState(false);

  const titleOfChart = "Control Effectiveness vs Frequency"

  const option = {
    title: {
      show: fullscreen,
      text: titleOfChart
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
          [2, 3.2, 30],
          [4, 2.5, 60],
          [6, 4.1, 80],
          [8, 2.8, 100],
          [5, 3.7, 50],
        ],
        symbolSize: (val: unknown) => {
          const [, , rawImpact] = val as number[];

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
    <DashboardCard fullscreenOpen={fullscreen} onFullscreenOpenChange={setFullscreen} title={titleOfChart}>
      {data && data.length !== 0 ? <ReactECharts
        onChartReady={onChartReady}
        option={option}
        style={{ minHeight: 320, height: '100%', width: '100%' }}
      /> :
        <ChartLoader />
      }
    </DashboardCard>
  );
};

export default ControlEffectivenessVsFrequency;
