"use client";

import React, { useState } from "react";
import ReactECharts from "echarts-for-react";

import DashboardCard, { ChartChildProps } from "@/components/dashboard-card";
import ChartLoader from "@/components/chart-loader";

export interface RecurringCauseSeries {
  name: string;
  data: number[];
}

export interface RecurringCauseChartProps {
  categories: string[];
  series: RecurringCauseSeries[];
}

const COLORS = [
  "#3B82F6",
  "#F59E0B",
  "#10B981",
  "#6366F1",
  "#EF4444",
  "#0EA5E9",
];

export const RecurringCauseFrequency: React.FunctionComponent<ChartChildProps & RecurringCauseChartProps> = ({
  categories,
  series,
  onChartReady
}) => {
  const [fullscreen, setFullscreen] = useState(false);

  const titleOfChart = "Recurring Cause Frequency Over Time"

  const option = {
    title: {
      show: fullscreen,
      text: titleOfChart
    },
    backgroundColor: "transparent",

    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(255,255,255,0.95)",
      borderColor: "#E5E7EB",
      textStyle: { color: "#111827" },
    },

    grid: {
      left: "4%",
      right: "4%",
      top: "12%",
      bottom: "10%",
    },

    xAxis: {
      type: "category",
      data: categories,
      axisLine: { lineStyle: { color: "#D1D5DB" } },
      axisLabel: { color: "#374151" },
    },

    yAxis: {
      type: "value",
      axisLine: { show: false },
      splitLine: { lineStyle: { color: "#E5E7EB" } },
      axisLabel: { color: "#374151" },
    },

    legend: {
      show: true,
      top: 0,
      left: 'center',
      textStyle: { color: "#111827", fontWeight: 500 },
    },

    series: series.map((s, index) => ({
      name: s.name,
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 7,

      lineStyle: {
        width: 3,
        color: COLORS[index % COLORS.length],
      },
      itemStyle: {
        color: COLORS[index % COLORS.length],
        borderColor: "#ffffff",
        borderWidth: 2,
      },

      data: s.data,
    })),
  };

  return (
    <DashboardCard fullscreenOpen={fullscreen} onFullscreenOpenChange={setFullscreen} title={titleOfChart}>
      {categories && categories.length !== 0 ? <ReactECharts
        onChartReady={onChartReady}
        option={option}
        style={{ minHeight: 320, height: '100%', width: '100%' }}
      /> :
        <ChartLoader />
      }
    </DashboardCard>
  );
};

export default RecurringCauseFrequency;
