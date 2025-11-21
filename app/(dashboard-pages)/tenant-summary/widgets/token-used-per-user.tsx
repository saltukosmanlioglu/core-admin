"use client";

import React, { useState } from "react";
import ReactECharts from "echarts-for-react";

import DashboardCard, { ChartChildProps } from "@/components/dashboard-card";

export type TokensUsedPoint = {
  label: string;
  used: number;
  limit: number;
};

export interface TokensUsedPerUserProps {
  data: TokensUsedPoint[];
}

export const TokensUsedPerUser: React.FunctionComponent<ChartChildProps & TokensUsedPerUserProps> = ({
  data,
  onChartReady,
}) => {
  const [fullscreen, setFullscreen] = useState(false);

  const titleOfChart = "Tokens Used per User (Last 30 Days)"

  const option = {
    title: {
      show: fullscreen,
      text: titleOfChart
    },
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    xAxis: {
      type: "category",
      data: data.map((d) => d.label),
      axisLine: { lineStyle: { color: "#d1d5db" } },
      axisLabel: { color: "#6b7280" },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      splitLine: { lineStyle: { color: "#e5e7eb" } },
      axisLabel: { color: "#6b7280" },
    },
    series: [
      {
        name: "Tokens Used",
        type: "bar",
        barWidth: "45%",
        data: data.map((d) => d.used),
        itemStyle: { color: "#2563eb", borderRadius: [4, 4, 0, 0] },
      },
      {
        name: "Allocated Limit",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        data: data.map((d) => d.limit),
        lineStyle: { width: 2, color: "#0f766e" },
        itemStyle: { color: "#0f766e" },
      },
    ],
  };

  return (
    <DashboardCard fullscreenOpen={fullscreen} onFullscreenOpenChange={setFullscreen} title={titleOfChart}>
      <ReactECharts
        onChartReady={onChartReady}
        option={option}
        style={{ minHeight: 320, height: '100%', width: "100%" }}
      />
    </DashboardCard>
  );
};

export default TokensUsedPerUser;
