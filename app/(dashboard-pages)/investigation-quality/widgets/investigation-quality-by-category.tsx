"use client";

import React from "react";
import ReactECharts from "echarts-for-react";

import DashboardCard from "@/components/dashboard-card";

import { ChildProps } from "./types";

export interface InvestigationQualityCategoryPoint {
  category: string;
  value: number;
}

export interface InvestigationQualityByCategoryProps {
  data: InvestigationQualityCategoryPoint[];
}

export const InvestigationQualityByCategory: React.FC<
  ChildProps & InvestigationQualityByCategoryProps
> = ({ data, onChartReady }) => {
  const categories = data.map((d) => d.category);
  const values = data.map((d) => d.value);

  const option = {
    tooltip: { trigger: "item" },

    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },

    radar: {
      radius: "70%",
      center: ["50%", "55%"],
      splitNumber: 4,

      axisName: {
        color: "#374151",
        fontSize: 13,
        fontWeight: 500,
      },

      splitArea: {
        areaStyle: {
          color: [
            "rgba(0,150,200,0.10)",
            "rgba(0,150,200,0.15)",
            "rgba(0,150,200,0.20)",
            "rgba(0,150,200,0.25)",
          ],
        },
      },

      splitLine: {
        lineStyle: { color: "rgba(0,0,0,0.15)" },
      },

      axisLine: {
        lineStyle: {
          color: "rgba(0,0,0,0.15)",
        },
      },

      indicator: categories.map((c) => ({
        name: c,
        max: 100,
      })),
    },

    series: [
      {
        type: "radar",
        data: [
          {
            value: values,
            areaStyle: {
              color: "rgba(80,200,200,0.35)",
            },
            lineStyle: {
              color: "#53d4d4",
              width: 2,
            },
            symbol: "circle",
            symbolSize: 7,
            itemStyle: {
              color: "#53d4d4",
              borderColor: "#ffffff",
              borderWidth: 1.5,
            },
          },
        ],
      },
    ],
  };

  return (
    <DashboardCard title="Investigation Quality by Category">
      <div style={{ width: "100%", height: "100%" }}>
        <ReactECharts
          onChartReady={onChartReady}
          option={option}
          style={{
            width: "100%",
            minHeight: '100%',
          }}
        />
      </div>
    </DashboardCard>
  );
};

export default InvestigationQualityByCategory;
