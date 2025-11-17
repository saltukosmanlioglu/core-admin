"use client";

import React from "react";
import ReactECharts from "echarts-for-react";

import DashboardCard from "@/components/dashboard-card";

import { ChildProps } from "./types";

export interface ActiveVsTotalUsersProps {
  percentage: number;
  daysUntilExpiry: number;
}

export const ActiveVsTotalUsers: React.FunctionComponent<
  ChildProps & ActiveVsTotalUsersProps
> = ({ percentage, daysUntilExpiry, onChartReady }) => {

  const option = {
    tooltip: { show: false },
    legend: { show: false },
    series: [
      {
        name: "activeUsers",
        type: "gauge",
        center: ["50%", "55%"],
        radius: "85%",
        startAngle: 210,
        endAngle: -30,
        pointer: { show: false },
        progress: {
          show: true,
          width: 12,
          roundCap: true,
          itemStyle: { color: "#2563eb" },
        },
        axisLine: {
          lineStyle: {
            width: 12,
            color: [[1, "#f97316"]],
          },
        },
        splitLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        detail: {
          valueAnimation: true,
          formatter: "{value}%",
          fontSize: 36,
          fontWeight: 700,
          offsetCenter: [0, "15%"],
          color: "#111827",
        },
        data: [{ value: percentage }],
      },
    ],
  };

  return (
    <DashboardCard title="Active vs Total Users (%)">
      <ReactECharts
        onChartReady={onChartReady}
        option={option}
        style={{ minHeight: 320, height: "100%", width: "100%" }}
      />
    </DashboardCard>
  );
};

export default ActiveVsTotalUsers;
