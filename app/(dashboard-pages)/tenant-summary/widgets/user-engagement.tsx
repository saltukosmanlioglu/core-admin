"use client";

import React from "react";
import ReactECharts from "echarts-for-react";

import DashboardCard from "@/components/dashboard-card";

import { ChildProps } from "./types";

export type EngagementSegment = {
  name: string;
  value: number;
  color: string;
  subtitle: string;
};

export interface UserEngagementProps {
  data: Array<EngagementSegment>;
}

export const UserEngagement: React.FunctionComponent<ChildProps & UserEngagementProps> = ({
  data,
  onChartReady,
}) => {
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    series: [
      {
        name: "Engagement",
        type: "pie",
        radius: "50%",
        center: ["50%", "50%"],
        label: {
          show: true,
          formatter: "{b}",
          fontSize: 14,
        },
        labelLine: {
          show: true,
          length: 15,
          length2: 10,
        },
        data: data.map((item) => ({
          value: item.value,
          name: item.name,
          itemStyle: { color: item.color },
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0,0,0,0.5)",
          },
        },
      },
    ],
  };

  return (
    <DashboardCard title="User Engagement Segments">
      <ReactECharts
        onChartReady={onChartReady}
        option={option}
        style={{ minHeight: 320, height: "100%", width: "100%" }}
      />
    </DashboardCard>
  );
};

export default UserEngagement;
