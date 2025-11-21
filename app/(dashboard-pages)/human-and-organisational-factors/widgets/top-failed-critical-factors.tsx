"use client";

import React, { useState } from "react";
import ReactECharts from "echarts-for-react";

import DashboardCard, { ChartChildProps } from "@/components/dashboard-card";

export type FailedControl = {
  name: string;
  value: number;
};

export interface TopFailedCriticalControlsProps {
  data: FailedControl[];
}

export const TopFailedCriticalControls: React.FunctionComponent<ChartChildProps & TopFailedCriticalControlsProps> = ({
  data,
  onChartReady
}) => {
  const [fullscreen, setFullscreen] = useState(false);

  const titleOfChart = "Top 10 Failed Critical Controls"

  const option = {
    title: {
      show: fullscreen,
      text: titleOfChart
    },
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
      inverse: true,
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
          color: "#c9782a",
          borderRadius: [4, 4, 4, 4],
        },
      },
    ],
  };

  return (
    <DashboardCard fullscreenOpen={fullscreen} onFullscreenOpenChange={setFullscreen} title={titleOfChart}>
      <ReactECharts
        onChartReady={onChartReady}
        option={option}
        style={{ minHeight: 320, height: "100%", width: "100%" }}
      />
    </DashboardCard>
  );
};

export default TopFailedCriticalControls;
