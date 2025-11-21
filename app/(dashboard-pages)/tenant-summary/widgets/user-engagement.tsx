"use client";

import React, { useState } from "react";
import ReactECharts from "echarts-for-react";

import DashboardCard, { ChartChildProps } from "@/components/dashboard-card";
import { GetUserEngagementResponse } from "@/services/dashboard/tenant-summary/user-engagement";

export const UserEngagement: React.FunctionComponent<ChartChildProps & { data: GetUserEngagementResponse }> = ({
  data,
  onChartReady,
}) => {
  const [fullscreen, setFullscreen] = useState(false);

  const titleOfChart = "User Engagement Segments"

  const option = {
    title: {
      show: fullscreen,
      text: titleOfChart
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    series: [
      {
        name: "Engagement",
        type: "pie",
        radius: "50%",
        center: ["50%", "50%"],
        label: { show: true, formatter: "{b}", fontSize: 14 },
        labelLine: { show: true, length: 15, length2: 10, },
        data: data.map((item) => ({
          value: item.value,
          name: item.name,
          itemStyle: { color: item.color },
        })),
        emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: "rgba(0,0,0,0.5)" } },
      },
    ],
  };

  return (
    <DashboardCard fullscreenOpen={fullscreen} onFullscreenOpenChange={setFullscreen} title={titleOfChart}>
      <ReactECharts
        onChartReady={onChartReady}
        option={option}
        style={{ minHeight: 320, height: "100%", width: "100%" }}
      />
    </DashboardCard>
  );
};

export default UserEngagement;
