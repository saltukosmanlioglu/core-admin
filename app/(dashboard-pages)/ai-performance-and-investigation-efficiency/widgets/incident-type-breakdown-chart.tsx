import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import {
  TooltipComponent,
  TooltipComponentOption,
  TitleComponent,
  TitleComponentOption,
  LegendComponent,
  LegendComponentOption,
} from "echarts/components";
import { PieChart, PieSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { Card } from "@mui/material";

echarts.use([TooltipComponent, TitleComponent, LegendComponent, PieChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | TitleComponentOption | LegendComponentOption | PieSeriesOption
>;

const IncidentTypeBreakdownChart: React.FC = () => {
  const option: EChartsOption = {
    title: {
      text: "Incident Type Breakdown",
      left: "center",
      top: 6,
      textStyle: { fontSize: 16, fontWeight: 600, color: "#fff" },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      right: 40,
      top: "center",
      textStyle: { color: "#444", fontSize: 13 },
      itemWidth: 14,
      itemHeight: 14,
    },
    series: [
      {
        type: "pie",
        radius: ["60%", "80%"], // donut shape
        avoidLabelOverlap: false,
        label: { show: false },
        labelLine: { show: false },
        data: [
          { value: 20, name: "Aeehl 20p" },
          { value: 35, name: "Injury" },
          { value: 45, name: "Near Miss" },
        ],
        itemStyle: {
          color: (params) => {
            const colors = ["#b89450", "#cfa047", "#e1b76b"];
            return colors[params.dataIndex % colors.length];
          },
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

export default IncidentTypeBreakdownChart;
