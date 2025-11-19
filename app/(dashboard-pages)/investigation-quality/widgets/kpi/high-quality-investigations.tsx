import { Typography } from "@mui/material";

import { KPICard } from "@/components/kpi-card";
import { KPI } from "@/services/dashboard/investigation-quality/KPIs";

export const HighQualityInvestigations: React.FunctionComponent<{ data: Pick<KPI, 'highQualityInvestigations'> }> = ({
  data
}) => {
  return (
    <KPICard title="High Quality Investigations">
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, color: '#2da44e', lineHeight: 1.1 }}
      >
        {data.highQualityInvestigations}%
      </Typography>
    </KPICard>
  );
}
