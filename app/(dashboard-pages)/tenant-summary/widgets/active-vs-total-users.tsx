"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
import ChartCard from "@/components/chart-card";
import { ChildProps } from "./types";

export interface ActiveVsTotalUsersProps {
  percentage: number;
  daysUntilExpiry: number;
}

export const ActiveVsTotalUsers: React.FC<
  ChildProps & ActiveVsTotalUsersProps
> = ({ percentage, daysUntilExpiry, onChartReady }) => {

  const option = {
    tooltip: { show: false },

    // ✔ Legend tamamen kapatıldı
    legend: { show: false },

    series: [
      {
        name: "activeUsers",
        type: "gauge",

        // ✔ Grafik tam ortada
        center: ["50%", "55%"],   // biraz aşağı alındı, % yazısı dengeli gelsin
        radius: "85%",            // daha iyi görünüm

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
          offsetCenter: [0, "15%"], // yüzdelik yazısını da tam ortalıyor
          color: "#111827",
        },

        data: [{ value: percentage }],
      },
    ],
  };

  return (
    <ChartCard title="Active vs Total Users (%)">
      <ReactECharts
        onChartReady={onChartReady}
        option={option}
        style={{ minHeight: 320, height: "100%", width: "100%" }}
      />
    </ChartCard>
  );
};

export default ActiveVsTotalUsers;
