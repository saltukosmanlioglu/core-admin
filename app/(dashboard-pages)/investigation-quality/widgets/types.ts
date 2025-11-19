import type { EChartsType } from "echarts";
import { LineSeriesOption } from "echarts/charts";
import type {
  GridComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
} from "echarts/components";

export type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption |
  GridComponentOption |
  TitleComponentOption |
  LineSeriesOption
>;

export type ChildProps = {
  onChartReady?: (inst: EChartsType) => void;
};