import React, { useState } from "react";
import ReactECharts from "echarts-for-react";

import DashboardCard, { ChartChildProps } from "@/components/dashboard-card";
import { GetInvestigationTimeResponse } from "@/services/dashboard/ai-performance/investigation-time";

const AIVsHumanInvestigationTime: React.FunctionComponent<ChartChildProps & { data: GetInvestigationTimeResponse }> = ({
  data = [],
  onChartReady
}) => {
  const [fullscreen, setFullscreen] = useState(false);

  const titleOfChart = 'AI vs Human Investigation Time Chart'

  const option = {
    title: {
      show: fullscreen,
      text: titleOfChart
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "line" },
    },
    legend: {
      data: ["AI", "Human"],
      top: "bottom",
      left: "center",
      textStyle: { color: "#000" },
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLabel: { color: "#000" },
        data: data.map((d) => d.month),
      },
    ],
    yAxis: [
      {
        name: "Values",
        nameGap: 40,
        nameLocation: "center",
        nameTextStyle: { color: "#000" },
        axisLabel: { color: "#000" },
        type: "value",
        axisPointer: { label: { show: false } },
      },
    ],
    series: [
      {
        color: "#1D3A6B",
        name: "AI",
        type: "line",
        symbolSize: 8,
        lineStyle: { width: 2 },
        areaStyle: { opacity: 0.3 },
        emphasis: { focus: "series" },
        data: data.map((d) => d.aiValue)
      },
      {
        color: "#1F5A3A",
        name: "Human",
        type: "line",
        symbolSize: 8,
        lineStyle: { width: 3 },
        emphasis: { focus: "series" },
        data: data.map((d) => d.humanValue)
      },
    ],
  };

  return (
    <DashboardCard
      fullscreenOpen={fullscreen}
      onFullscreenOpenChange={setFullscreen}
      title={titleOfChart}
    >
      <ReactECharts
        onChartReady={onChartReady}
        option={option}
        style={{ minHeight: 320, height: "100%", width: "100%" }}
      />
    </DashboardCard>
  );
};

export default AIVsHumanInvestigationTime;
