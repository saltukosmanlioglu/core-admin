import { Typography } from "@mui/material";

import { KPICard } from "@/components/kpi-card";
import { KPI } from "@/services/dashboard/investigation-quality/KPIs";

export const AverageQualityScore: React.FunctionComponent<{ data: Pick<KPI, 'averageQualityScore'> }> = ({
  data
}) => {
  return (
    <KPICard title="Average Quality Score">
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, color: '#2da44e', lineHeight: 1.1 }}
      >
        {data.averageQualityScore}
      </Typography>
    </KPICard>
  );
}
