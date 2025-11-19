"use client";

import React from "react";
import ReactECharts from "echarts-for-react";

import DashboardCard from "@/components/dashboard-card";
import { GetRootCauseCategoriesResponse } from "@/services/dashboard/human-and-organisitional-factors/root-cause-category";

import { ChildProps } from "./types";

export interface RootCauseCategoriesProps {
  data: GetRootCauseCategoriesResponse;
}

export const RootCauseCategories: React.FunctionComponent<ChildProps & RootCauseCategoriesProps> = ({
  data,
  onChartReady,
}) => {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    legend: {
      top: 0,
      left: "center",
      textStyle: { color: "#475467", fontSize: 12 },
    },
    grid: {
      left: 40,
      right: 20,
      top: 40,
      bottom: 40,
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
    <DashboardCard title="Root Cause Categories">
      <ReactECharts
        onChartReady={onChartReady}
        option={option}
        style={{ minHeight: 320, height: '100%', width: "100%" }}
      />
    </DashboardCard>
  );
};

export default RootCauseCategories;
