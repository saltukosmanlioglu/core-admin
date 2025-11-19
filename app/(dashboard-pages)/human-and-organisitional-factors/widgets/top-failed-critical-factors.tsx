"use client";

import React from "react";
import ReactECharts from "echarts-for-react";

import DashboardCard from "@/components/dashboard-card";

import { ChildProps } from "./types";

export type FailedControl = {
  name: string;
  value: number;
};

export interface TopFailedCriticalControlsProps {
  data: FailedControl[];
}

export const TopFailedCriticalControls: React.FC<
  ChildProps & TopFailedCriticalControlsProps
> = ({ data, onChartReady }) => {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params: any) => {
        const p = Array.isArray(params) ? params[0] : params;
        return `${p.name}: <b>${p.value}</b>`;
      },
    },
    grid: {
      left: 140,
      right: 40,
      top: 20,
      bottom: 40,
    },
    xAxis: {
      type: "value",
      axisLabel: {
        color: "#6b7280",
        formatter: "{value}",
      },
    },
    yAxis: {
      type: "category",
      inverse: true, // highest at top
      data: data.map((d) => d.name),
      axisLabel: {
        color: "#374151",
        fontSize: 12,
      },
    },
    series: [
      {
        type: "bar",
        data: data.map((d) => d.value),
        barWidth: 18,
        itemStyle: {
          color: "#c9782a", // warm orange-brown like the mock
          borderRadius: [4, 4, 4, 4],
        },
      },
    ],
  };

  return (
    <DashboardCard title="Top 10 Failed Critical Controls">
      <ReactECharts
        onChartReady={onChartReady}
        option={option}
        style={{ minHeight: 320, height: "100%", width: "100%" }}
      />
    </DashboardCard>
  );
};

export default TopFailedCriticalControls;
