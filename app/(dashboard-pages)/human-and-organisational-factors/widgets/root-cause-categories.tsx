"use client";

import React, { useState } from "react";
import ReactECharts from "echarts-for-react";

import DashboardCard, { ChartChildProps } from "@/components/dashboard-card";
import { GetRootCauseCategoriesResponse } from "@/services/dashboard/human-and-organisitional-factors/root-cause-category";

export interface RootCauseCategoriesProps {
  data: GetRootCauseCategoriesResponse;
}

export const RootCauseCategories: React.FunctionComponent<ChartChildProps & RootCauseCategoriesProps> = ({
  data,
  onChartReady,
}) => {
  const [fullscreen, setFullscreen] = useState(false);

  const titleOfChart = "Root Cause Categories"

  const option = {
    title: {
      show: fullscreen,
      text: titleOfChart
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    legend: {
      bottom: 0,
      left: "center",
      textStyle: { color: "#475467", fontSize: 12 },
      itemGap: 12
    },
    xAxis: {
      type: "category",
      data: data.map((d) => d.quarter),
      axisLine: { lineStyle: { color: "#d1d5db" } },
      axisLabel: { color: "#6b7280" },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value}%",
        color: "#6b7280",
      },
      splitLine: { lineStyle: { color: "#e5e7eb" } },
    },
    series: [
      {
        name: "Human Factors",
        type: "bar",
        stack: "total",
        itemStyle: { color: "#8d8d8d" },
        data: data.map((d) => d.humanFactors),
      },
      {
        name: "Organisational Factors",
        type: "bar",
        stack: "total",
        itemStyle: { color: "#c9a26e" },
        data: data.map((d) => d.organisationalFactors),
      },
      {
        name: "Technical Failures",
        type: "bar",
        stack: "total",
        itemStyle: { color: "#d08a2e" },
        data: data.map((d) => d.technicalFailures),
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

export default RootCauseCategories;
