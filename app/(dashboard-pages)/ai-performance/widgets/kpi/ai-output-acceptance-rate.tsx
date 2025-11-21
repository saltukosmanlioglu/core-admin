import { Skeleton, Typography } from "@mui/material";

import { KPICard } from "@/components/kpi-card";

import { KPI } from "@/services/dashboard/ai-performance/KPIs";

export const AIOutputAcceptanceRate: React.FunctionComponent<{ data?: Pick<KPI, 'aiOutputAcceptanceRate'> }> = ({
  data
}) => {
  return (
    <KPICard title="AI Output Acceptance Rate" tooltipTitle="Percentage of AI outputs accepted without major edits">
      {data ? (
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#2da44e', lineHeight: 1.1 }}>
          {data.aiOutputAcceptanceRate}%
        </Typography>
      ) : (
        <Skeleton variant="text" animation="wave" />
      )}
    </KPICard>
  );
}
