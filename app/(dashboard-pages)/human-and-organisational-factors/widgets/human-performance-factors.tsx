"use client";

import React, { useState } from "react";
import ReactECharts from "echarts-for-react";

import DashboardCard, { ChartChildProps } from "@/components/dashboard-card";
import { GetHumanPerformanceFactorsResponse } from "@/services/dashboard/human-and-organisitional-factors/human-performance-factor";

export const HumanPerformanceFactors: React.FunctionComponent<ChartChildProps & { data: GetHumanPerformanceFactorsResponse }> = ({
  data,
  onChartReady
}) => {
  const [fullscreen, setFullscreen] = useState(false);

  const titleOfChart = "Human Performance Factors"

  const maxRowIndex =
    data.data.reduce((max, item) => (item.y > max ? item.y : max), 0) + 1;

  const option = {
    title: {
      show: fullscreen,
      text: titleOfChart
    },
    tooltip: { show: false },

    xAxis: {
      type: "category",
      data: data.categories,
      axisLabel: { color: "#555", fontSize: 12 },
      axisTick: { show: false },
      splitLine: { show: false },
    },

    yAxis: {
      name: "Frequency",
      nameGap: 14,
      nameLocation: "center",
      nameTextStyle: { color: "#000" },
      axisLabel: {
        color: "#000",
      },
      type: "category",
      data: Array.from({ length: maxRowIndex }, () => ""),
      axisTick: { show: false },
      splitLine: { show: false },
    },

    visualMap: {
      show: true,
      orient: "vertical",
      right: -14,
      top: "center",
      min: 0,
      max: 180,
      text: ["High", "Medium", "Low"],
      inRange: {
        color: ["#A6E39A", "#F3C76E", "#AA5A2A", "#4E0F0F"],
      },
      textStyle: {
        color: "#555",
      },
    },

    series: [
      {
        type: "heatmap",
        data: data.data.map(d => [d.x, d.y, d.value]),
        itemStyle: {
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.4)"
        },
        universalTransition: true,
        progressive: 0,
        aspectScale: 1
      }
    ]
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

export default HumanPerformanceFactors;
