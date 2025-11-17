import { Typography } from "@mui/material";

import { KPICard } from "@/components/kpi-card";
import { KPI } from "@/services/dashboard/ai-performance/KPIs";

export const TotalHumanReviewEdits: React.FunctionComponent<{ data: Pick<KPI, 'totalHumanReviewEdits'> }> = ({
  data
}) => {
  return (
    <KPICard title="Total Human Review Edits" tooltipTitle="Sum of edit actions across accepted AI outputs">
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, color: '#1f6feb', lineHeight: 1.1 }}
      >
        {data.totalHumanReviewEdits}
      </Typography>
    </KPICard>
  );
}
