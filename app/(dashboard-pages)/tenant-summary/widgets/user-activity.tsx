"use client";

import React, { useState } from "react";
import ReactECharts from "echarts-for-react";

import DashboardCard, { ChartChildProps } from "@/components/dashboard-card";

export type UserActivityPoint = {
  date: string;
  primary: number;
  secondary: number;
};

export interface UserActivityChartProps {
  data: UserActivityPoint[];
}

export const UserActivityChart: React.FunctionComponent<ChartChildProps & UserActivityChartProps> = ({
  data,
  onChartReady
}) => {
  const [fullscreen, setFullscreen] = useState(false);

  const titleOfChart = "User Activity Over Time (Last 90 Days)"

  const option = {
    title: {
      show: fullscreen,
      text: titleOfChart
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "line" },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data.map((d) => d.date),
      axisLine: { lineStyle: { color: "#d1d5db" } },
      axisTick: { show: false },
      axisLabel: { color: "#6b7280" },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      splitLine: { lineStyle: { color: "#e5e7eb" } },
      axisLabel: { color: "#6b7280" },
    },
    series: [
      {
        name: "Active Users",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 4,
        data: data.map((d) => d.primary),
        lineStyle: { width: 3, color: "#1f6feb" },
        itemStyle: { color: "#1f6feb" },
        areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(31,111,235,0.25)" }, { offset: 1, color: "rgba(31,111,235,0.02)" }], }, },
      },
      {
        name: "Baseline",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 4,
        data: data.map((d) => d.secondary),
        lineStyle: { width: 3, color: "#f59e0b" },
        itemStyle: { color: "#f59e0b" },
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

export default UserActivityChart;
