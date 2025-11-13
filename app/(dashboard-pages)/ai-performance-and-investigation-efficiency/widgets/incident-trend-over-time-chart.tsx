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
  LegendComponent,
  LegendComponentOption,
} from "echarts/components";
import { LineChart, BarChart, LineSeriesOption, BarSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { Card } from "@mui/material";

echarts.use([TooltipComponent, GridComponent, TitleComponent, LegendComponent, LineChart, BarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | TitleComponentOption | LegendComponentOption | LineSeriesOption | BarSeriesOption
>;

const IncidentTrendOverTimeChart: React.FC = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  const incidents = [10, 15, 20, 30, 45, 55, 70, 85, 100];

  const option: EChartsOption = {
    title: {
      text: "Incident Trend Over Time",
      left: "center",
      top: 6,
      textStyle: { fontSize: 16, fontWeight: 600, color: "#fff" },
    },
    grid: { left: 50, right: 16, top: 46, bottom: 36, containLabel: true },
    tooltip: {
      trigger: "axis",
      valueFormatter: (v) => `${v}`,
    },
    xAxis: [
      {
        type: "category",
        data: months,
        axisTick: { show: false },
        axisLine: { lineStyle: { color: "#c8c8c8" } },
      },
    ],
    yAxis: [
      {
        type: "value",
        min: 0,
        max: 120,
        splitNumber: 6,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: "#e6e6e6" } },
      },
    ],
    series: [
      // Base layer: bar background
      {
        type: "bar",
        data: incidents,
        barWidth: "80%",
        itemStyle: {
          color: (params) =>
            params.dataIndex < 3 ? "#b94c3c" : "#c8a043", // first few red, then gold tone
          opacity: 0.6,
          borderRadius: 3,
        },
        emphasis: { disabled: true },
        z: 1,
      },
      // Top layer: line overlay
      {
        type: "line",
        data: incidents,
        symbol: "circle",
        symbolSize: 8,
        smooth: true,
        lineStyle: {
          width: 4,
          color: "#c88a2e", // golden-orange
        },
        itemStyle: {
          color: "#c88a2e",
          borderColor: "#fff",
          borderWidth: 2,
        },
        z: 2,
      },
    ],
  };

  return (
    <Card elevation={0} sx={{ borderRadius: 3 }}>
      <ReactECharts option={option} style={{ height: 320, width: "100%" }} />
    </Card>
  )
};

export default IncidentTrendOverTimeChart;
