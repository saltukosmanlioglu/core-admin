import type { EChartsType } from "echarts";

export type ChildProps = {
  onChartReady?: (inst: EChartsType) => void;
};

export interface WordCloudProps {
  data: Array<{
    name: string;
    value: number
  }>
  title: string;
}