"use client";

import React, { useState } from "react";
import ReactECharts from "echarts-for-react";

import ChartLoader from "@/components/chart-loader";
import DashboardCard, { ChartChildProps } from "@/components/dashboard-card";

export interface InvestigationQualityCategoryPoint {
  category: string;
  value: number;
}

export interface InvestigationQualityByCategoryProps {
  data: InvestigationQualityCategoryPoint[];
}

export const InvestigationQualityByCategory: React.FunctionComponent<ChartChildProps & InvestigationQualityByCategoryProps> = ({
  data,
  onChartReady
}) => {
  const [fullscreen, setFullscreen] = useState(false);

  const titleOfChart = "Investigation Quality by Category"

  const option = {
    title: {
      show: fullscreen,
      text: titleOfChart
    },
    tooltip: { trigger: "item" },

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

      indicator: data.map((d) => d.category).map((c) => ({
        name: c,
        max: 100,
      })),
    },

    series: [
      {
        type: "radar",
        data: [
          {
            value: data.map((d) => d.value),
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
    <DashboardCard fullscreenOpen={fullscreen} onFullscreenOpenChange={setFullscreen} title={titleOfChart}>
      {data && data.length !== 0 ? <div style={{ width: "100%", height: "100%" }}>
        <ReactECharts
          onChartReady={onChartReady}
          option={option}
          style={{ minHeight: 320, height: '100%', width: '100%' }}
        />
      </div>
        :
        <ChartLoader />
      }
    </DashboardCard>
  );
};

export default InvestigationQualityByCategory;
