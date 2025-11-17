import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import {
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  TitleComponent,
  TitleComponentOption,
} from "echarts/components";
import { ScatterChart, ScatterSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

import DashboardCard from "@/components/dashboard-card";
import { AIVsHumanEditsProps } from "@/services/dashboard/ai-performance/ai-vs-human-edits";

import { ChildProps } from "./types";

echarts.use([TooltipComponent, GridComponent, TitleComponent, ScatterChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | TitleComponentOption | ScatterSeriesOption
>;

const AIVsHumanEdits: React.FunctionComponent<ChildProps & { data: AIVsHumanEditsProps }> = ({ onChartReady, data }) => {
  const option: EChartsOption = {
    grid: { left: 50, right: 16, top: 46, bottom: 44, containLabel: true },
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
    <DashboardCard title="AI Confidence Vs Human Edits">
      <ReactECharts
        onChartReady={onChartReady}
        option={option}
        style={{ minHeight: 320, height: '100%', width: "100%" }}
      />
    </DashboardCard>
  )
};

export default AIVsHumanEdits;
