import React, { useState } from "react";
import ReactECharts from "echarts-for-react";

import DashboardCard, { ChartChildProps } from "@/components/dashboard-card";
import { GetAIVsHumanEditsResponse } from "@/services/dashboard/ai-performance/ai-vs-human-edits";

const AIVsHumanEdits: React.FunctionComponent<ChartChildProps & { data: GetAIVsHumanEditsResponse }> = ({ onChartReady, data }) => {
  const [fullscreen, setFullscreen] = useState(false);

  const titleOfChart = 'AI Confidence Vs Human Edits'

  const option = {
    title: {
      show: fullscreen,
      text: titleOfChart
    },
    tooltip: {
      trigger: "item",
      formatter: (p: any) => {
        const [edits, conf] = p.data as [number, number];
        return `Human Edits: <b>${edits}</b><br/>AI Confidence: <b>${conf}%</b>`;
      },
    },
    legend: {
      top: 0,
      left: "center",
      textStyle: {
        color: "#000"
      }
    },
    xAxis: {
      type: "value",
      name: "Human Edits Count",
      nameLocation: "middle",
      nameGap: 28,
      nameTextStyle: {
        color: '#000'
      },
      axisLabel: {
        color: "#000"
      },
      min: 0,
    },
    yAxis: {
      type: "value",
      name: "AI Confidence (%)",
      nameLocation: "middle",
      nameGap: 38,
      nameRotate: 90,
      nameTextStyle: {
        color: '#000'
      },
      min: 0,
      max: 10,
      axisLabel: { formatter: "{value}%", color: '#000' },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "#e6e6e6" } },
    },
    series: [
      {
        type: "scatter",
        data: data,
        symbolSize: 6.5,
        itemStyle: {
          color: "#c8a043",
          opacity: 0.95,
        },
        emphasis: {
          itemStyle: { borderColor: "#c8a043", borderWidth: 1.5 },
        },
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
  )
};

export default AIVsHumanEdits;
