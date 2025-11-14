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
import { BarChart, BarSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

import ChartCard from "./components/chart-card";
import { ChildProps } from "./types";

echarts.use([TooltipComponent, GridComponent, TitleComponent, BarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | TitleComponentOption | BarSeriesOption
>;

const AcceptanceRateByInvestigators: React.FunctionComponent<ChildProps> = ({ onChartReady }) => {
  const option: EChartsOption = {
    title: {
      show: false,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      bottom: 0,
      left: 'center',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Oct', 'Nov', 'Dec'],
      textStyle: {
        color: '#000',
      }
    },
    xAxis: [
      {
        axisLabel: {
          color: "#000"
        },
        type: 'category',
        axisTick: { show: false },
        data: ['Dr. Sarah Connor', 'James Wilson', 'Dr. Eleanor']
      }
    ],
    yAxis: [
      {
        axisLabel: {
          color: "#000"
        },
        name: "Acceptance Rate (%)",
        nameLocation: "middle",
        nameTextStyle: { color: '#000' },
        nameGap: 40,
        nameRotate: 90,
        type: 'value'
      }
    ],
    series: [
      {
        name: "Jan",
        type: "bar",
        barGap: 0,
        emphasis: { focus: "series" },
        data: [120, 98, 245, 65, 230, 154, 299, 210, 88, 176, 267, 132]
      },
      {
        name: "Feb",
        type: "bar",
        emphasis: { focus: "series" },
        data: [190, 85, 274, 232, 97, 111, 256, 201, 134, 154, 288, 76]
      },
      {
        name: "Mar",
        type: "bar",
        emphasis: { focus: "series" },
        data: [78, 202, 140, 254, 119, 211, 264, 233, 280, 192, 175, 142]
      },
      {
        name: "Apr",
        type: "bar",
        emphasis: { focus: "series" },
        data: [255, 178, 230, 88, 176, 243, 200, 212, 190, 150, 269, 201]
      },
      {
        name: "May",
        type: "bar",
        emphasis: { focus: "series" },
        data: [167, 91, 288, 102, 251, 232, 273, 110, 145, 208, 260, 185]
      },
      {
        name: "Jun",
        type: "bar",
        emphasis: { focus: "series" },
        data: [240, 150, 208, 272, 191, 233, 214, 286, 108, 126, 184, 265]
      },
      {
        name: "Jul",
        type: "bar",
        emphasis: { focus: "series" },
        data: [184, 277, 98, 160, 270, 133, 190, 280, 249, 156, 175, 291]
      },
      {
        name: "Aug",
        type: "bar",
        emphasis: { focus: "series" },
        data: [208, 298, 265, 112, 187, 266, 195, 214, 158, 292, 110, 227]
      },
      {
        name: "Sep",
        type: "bar",
        emphasis: { focus: "series" },
        data: [265, 243, 160, 90, 188, 267, 281, 145, 298, 270, 184, 102]
      },
      {
        name: "Oct",
        type: "bar",
        emphasis: { focus: "series" },
        data: [177, 292, 284, 126, 255, 274, 142, 261, 280, 169, 198, 120]
      },
      {
        name: "Nov",
        type: "bar",
        emphasis: { focus: "series" },
        data: [91, 276, 150, 277, 133, 192, 282, 208, 186, 258, 239, 225]
      },
      {
        name: "Dec",
        type: "bar",
        emphasis: { focus: "series" },
        data: [190, 222, 275, 297, 126, 241, 284, 208, 233, 265, 172, 289]
      }
    ]

  };

  return (
    <ChartCard title="AI Output Acceptance Rate By Investigator">
      <ReactECharts
        onChartReady={onChartReady}
        option={option}
        style={{ minHeight: 320, height: '100%', width: '100%' }}
      />
    </ChartCard>
  );
};

export default AcceptanceRateByInvestigators;
