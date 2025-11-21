"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import DashboardCard from "@/components/dashboard-card";

import { ChildProps, WordCloudProps } from "./types";

const ReactECharts = dynamic(() => import("echarts-for-react"), {
  ssr: false,
});

const WordCloud: React.FunctionComponent<ChildProps & WordCloudProps> = ({
  data,
  onChartReady,
  title
}) => {
  const [fullscreen, setFullscreen] = useState(false);

  const colors = ["#1f6feb", "#6aa7ff", "#c8a043", "#b58b35"];
  const titleOfChart = title

  useEffect(() => {
    require("echarts-wordcloud");
  }, []);

  const option = {
    title: {
      show: fullscreen,
      text: titleOfChart
    },
    tooltip: {
      show: true,
      formatter: (params: any) => { const { name, value } = params; return `${name}: <b>${value}</b>` },
    },
    series: [
      {
        type: "wordCloud",
        shape: "circle",
        gridSize: 6,
        sizeRange: [12, 46],
        rotationRange: [-90, 90],
        rotationStep: 90,
        textStyle: { color: () => colors[Math.floor(Math.random() * colors.length)] },
        emphasis: { focus: "self", textStyle: { shadowBlur: 8, shadowColor: "rgba(0,0,0,0.15)" } },
        data,
      },
    ],
  };

  return (
    <DashboardCard fullscreenOpen={fullscreen} onFullscreenOpenChange={setFullscreen} title={title}>
      <ReactECharts
        onChartReady={onChartReady}
        option={option}
        style={{ minHeight: 320, height: '100%', width: "100%" }}
      />
    </DashboardCard>
  );
};

export default WordCloud;
