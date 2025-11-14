import React from "react";
import * as echarts from "echarts/core";
import ReactECharts from "echarts-for-react";
import {
  TooltipComponent, type TooltipComponentOption,
  GridComponent, type GridComponentOption,
  TitleComponent, type TitleComponentOption,
} from "echarts/components";
import { LineChart, type LineSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

import { InvestigationTimeProps } from "@/services/dashboard/ai-performance/investigation-time";

import ChartCard from "./components/chart-card";
import { ChildProps } from "./types";

echarts.use([
  TooltipComponent,
  GridComponent,
  TitleComponent,
  LineChart,
  CanvasRenderer,
]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption |
  GridComponentOption |
  TitleComponentOption |
  LineSeriesOption
>;

const AIVsHumanInvestigationTime: React.FunctionComponent<ChildProps & { data: Array<InvestigationTimeProps> }> = ({
  data,
  onChartReady
}) => {
  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
      },
    },
    legend: {
      data: ["AI", "Human"],
      top: "bottom",
      left: "center",
      textStyle: {
        color: "#fff",
      },
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLabel: {
          color: "#fff",
        },
        data: data.map((d) => d.month),
      },
    ],
    yAxis: [
      {
        name: "Values",
        nameGap: 40,
        nameLocation: "center",
        nameTextStyle: { color: "#fff" },
        axisLabel: {
          color: "#fff",
        },
        type: "value",
        axisPointer: {
          label: { show: false },
        },
      },
    ],
    series: [
      {
        color: "#1D3A6B",
        name: "AI",
        type: "line",
        symbolSize: 8,
        lineStyle: {
          width: 2,
        },
        areaStyle: {
          opacity: 0.3,
        },
        emphasis: {
          focus: "series",
        },
        data: data.map((d) => d.aiValue)
      },
      {
        color: "#1F5A3A",
        name: "Human",
        type: "line",
        symbolSize: 8,
        lineStyle: {
          width: 3,
        },
        emphasis: {
          focus: "series",
        },
        data: data.map((d) => d.humanValue)
      },
    ],
  };

  return (
    <ChartCard title="AI vs Human Investigation Time Chart">
      <ReactECharts
        onChartReady={onChartReady}
        option={option}
        style={{ minHeight: 320, height: "100%", width: "100%" }}
      />
    </ChartCard>
  );
};

export default AIVsHumanInvestigationTime;
