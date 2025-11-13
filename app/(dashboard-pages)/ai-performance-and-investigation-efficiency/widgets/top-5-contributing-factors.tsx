import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TitleComponentOption,
  GridComponent,
  GridComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from "echarts/components";
import { BarChart, BarSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { Card } from "@mui/material";

echarts.use([TitleComponent, GridComponent, TooltipComponent, BarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | GridComponentOption | TooltipComponentOption | BarSeriesOption
>;

const TopContributingFactorsChart: React.FC = () => {
  const categories = ["Fatigue", "Training", "Supervision", "Procedure", "Equipment"];
  const values = [40, 30, 20, 15, 10]; // Percentages

  const option: EChartsOption = {
    title: {
      text: "Top 5 Contributing Factors",
      left: "center",
      top: 6,
      textStyle: { fontSize: 16, fontWeight: 600, color: "#333" },
    },
    grid: {
      left: 100,
      right: 16,
      top: 48,
      bottom: 40,
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params: any) => `${params[0].name}: <b>${params[0].value}%</b>`,
    },
    xAxis: {
      type: "value",
      min: 0,
      max: 100,
      axisLabel: { formatter: "{value}%" },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "#e6e6e6" } },
    },
    yAxis: {
      type: "category",
      data: categories,
      inverse: true,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: "#444",
        fontWeight: 500,
      },
    },
    series: [
      {
        type: "bar",
        data: values,
        barWidth: 16,
        itemStyle: {
          color: "#c8a043",
          borderRadius: [4, 4, 4, 4],
        },
        label: {
          show: false, // no right-side value labels
        },
      },
    ],
  };

  return (
    <Card elevation={0} sx={{ borderRadius: 3 }}>
      <ReactECharts option={option} style={{ height: 320, width: "100%" }} />
    </Card>
  )
};

export default TopContributingFactorsChart;
