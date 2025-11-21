"use client";

import React, { useState } from "react";
import ReactECharts from "echarts-for-react";

import DashboardCard, { ChartChildProps } from "@/components/dashboard-card";
import ChartLoader from "@/components/chart-loader";

export interface KnowledgeWebNode {
  id: string;
  name: string;
  value: number;
  symbolSize: number;
  x: number;
  y: number;
  category: number;
}

export interface KnowledgeWebLink {
  source: string;
  target: string;
}

export interface KnowledgeWebCategory {
  name: string;
}

export interface KnowledgeWebData {
  nodes: KnowledgeWebNode[];
  links: KnowledgeWebLink[];
  categories: KnowledgeWebCategory[];
}

export interface KnowledgeWebProps {
  data: KnowledgeWebData;
}

export const KnowledgeWeb: React.FunctionComponent<ChartChildProps & KnowledgeWebProps> = ({
  data,
  onChartReady,
}) => {
  const [fullscreen, setFullscreen] = useState(false);

  const titleOfChart = "Knowledge Web"

  const option = {
    title: {
      show: fullscreen,
      text: titleOfChart
    },
    backgroundColor: "transparent",

    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(255,255,255,0.95)",
      borderColor: "#e5e7eb",
      textStyle: { color: "#111827", fontSize: 12 },
      formatter: (params: any) => {
        if (params.dataType === "node") {
          return `
            <div><strong>${params.data.name}</strong></div>
            <div>Importance: ${params.data.value}</div>
            <div>Category: ${data.categories[params.data.category].name}</div>
          `;
        }
        return "Connection";
      },
    },

    legend: {
      top: 10,
      right: 10,
      data: data.categories.map((c) => c.name),
      textStyle: { color: "#111827", fontSize: 11 },
      itemWidth: 12,
      itemHeight: 12,
    },

    series: [
      {
        type: "graph",
        layout: "force",

        data: data.nodes.map((node) => ({
          ...node,
          category: node.category,
          x: node.x,
          y: node.y,
        })),

        links: data.links.map((link) => ({
          source: link.source,
          target: link.target,
        })),

        categories: data.categories,

        roam: true,
        draggable: false,
        focusNodeAdjacency: true,

        label: {
          show: false,
          position: "right",
          color: "#374151",
          fontSize: 10,
        },

        force: {
          repulsion: 140,
          edgeLength: [40, 140],
          gravity: 0.05,
        },

        lineStyle: {
          color: "rgba(148,163,184,0.42)",
          curveness: 0.2,
        },

        itemStyle: {
          borderColor: "#ffffff",
          borderWidth: 1.5,
        },

        emphasis: {
          scale: true,
          label: { show: true },
          lineStyle: { width: 2 },
          itemStyle: {
            shadowBlur: 12,
            shadowColor: "rgba(0,0,0,0.18)",
          },
        },
      },
    ],
  };

  return (
    <DashboardCard fullscreenOpen={fullscreen} onFullscreenOpenChange={setFullscreen} title={titleOfChart}>
      {data && data.nodes.length !== 0 ? <ReactECharts
        onChartReady={onChartReady}
        option={option}
        style={{ minHeight: 480, height: '100%', width: '100%' }}
      /> :
        <ChartLoader height={480} />
      }
    </DashboardCard>
  );
};

export default KnowledgeWeb;
