import { Stack, Typography } from "@mui/material";

import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";

import { KPICard } from "@/components/kpi-card";
import { KPI } from "@/services/dashboard/tenant-summary/KPIs";

export type TrendDirection = "up" | "down" | "flat";

export const NumberOfTokensUsed: React.FunctionComponent<{ data: KPI['numberOfTokensUsed'], trend: TrendDirection }> = ({
  data,
  trend
}) => {

  const isUp = trend === "up";
  const isDown = trend === "down";

  const TrendIcon = isUp
    ? ArrowUpwardRoundedIcon
    : isDown
      ? ArrowDownwardRoundedIcon
      : DragHandleRoundedIcon;

  const trendColor = isUp ? "#22c55e" : isDown ? "#ef4444" : "#fbbf24";

  return (
    <KPICard subtitle="Average daily token use" title="Tokens Used This Month">
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#2563eb", lineHeight: 1 }}>
          {data.value}
        </Typography>
        {data.changePercent !== undefined && (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <TrendIcon sx={{ fontSize: 20, color: trendColor }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: trendColor }}>
              {data.changePercent}%
            </Typography>
          </Stack>
        )}
      </Stack>
    </KPICard>
  );
}
