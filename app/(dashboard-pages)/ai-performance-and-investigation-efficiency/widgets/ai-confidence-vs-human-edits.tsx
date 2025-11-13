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

import ChartCard from "./components/chart-card";
import { ChildProps } from "./types";

echarts.use([TooltipComponent, GridComponent, TitleComponent, ScatterChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | TitleComponentOption | ScatterSeriesOption
>;

const AIConfidenceVsHumanEdits: React.FunctionComponent<ChildProps> = ({ onChartReady }) => {
  const points: Array<[number, number]> = [
    [2, 9.5], [3, 8.8], [5, 7.2], [6, 9.9], [8, 6.4], [9, 7.6], [10, 5.1],
    [11, 6.9], [12, 4.8], [13, 3.9], [14, 4.2], [15, 3.7], [16, 4.0],
    [17, 2.8], [18, 3.1], [19, 2.5], [20, 2.2], [21, 3.3], [22, 2.9],
    [23, 1.8], [24, 2.7], [25, 2.6], [26, 3.0], [27, 2.4], [28, 1.6],
    [29, 3.2], [30, 2.0], [31, 1.4], [12, 9.1], [18, 8.3], [22, 7.0],
    [26, 6.8], [28, 5.5], [30, 4.7], [7, 3.1], [9, 2.2], [11, 3.6],
    [13, 3.0], [15, 2.9], [17, 2.6], [19, 2.8], [21, 2.3], [23, 2.1],
    [25, 1.9], [27, 2.7], [29, 2.0], [31, 1.7], [33, 2.9], [35, 2.6],
    [37, 2.4], [39, 2.2], [41, 1.9], [43, 1.6], [45, 1.8], [18, 10.0],
    [34, 3.1], [38, 2.8], [42, 2.5], [46, 2.2],
  ];

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
        color: "#fff"
      }
    },
    xAxis: {
      type: "value",
      name: "Human Edits Count",
      nameLocation: "middle",
      nameGap: 28,
      nameTextStyle: {
        color: '#fff'
      },
      axisLabel: {
        color: "#fff"
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
        color: '#fff'
      },
      min: 0,
      max: 10,
      axisLabel: { formatter: "{value}%", color: '#fff' },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "#e6e6e6" } },
    },
    series: [
      {
        type: "scatter",
        data: points,
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
    <ChartCard title="AI Confidence Vs Human Edits">
      <ReactECharts
        onChartReady={onChartReady}
        option={option}
        style={{ minHeight: 320, height: '100%', width: "100%" }} />
    </ChartCard>
  )
};

export default AIConfidenceVsHumanEdits;
