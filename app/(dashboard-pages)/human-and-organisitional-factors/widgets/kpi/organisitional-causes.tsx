import { Typography } from "@mui/material";

import { KPICard } from "@/components/kpi-card";
import { KPI } from "@/services/dashboard/human-and-organisitional-factors/KPIs";

export const OrganisitonalCauses: React.FunctionComponent<{ data: Pick<KPI, 'organisitionalCauses'> }> = ({
  data
}) => {
  return (
    <KPICard title="Organisitonal Causes">
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, color: '#2da44e', lineHeight: 1.1 }}
      >
        {data.organisitionalCauses}%
      </Typography>
    </KPICard>
  );
}
