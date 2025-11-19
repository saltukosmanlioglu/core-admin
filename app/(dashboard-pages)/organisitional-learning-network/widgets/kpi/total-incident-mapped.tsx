import { Typography } from "@mui/material";

import { KPICard } from "@/components/kpi-card";
import { KPI } from "@/services/dashboard/organisitional-learning-network/KPIs";

export const TotalIncidentMapped: React.FunctionComponent<{ data: Pick<KPI, 'numberOfIncidentsMapped'> }> = ({
  data
}) => {
  return (
    <KPICard title="Total Incident Mapped">
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, color: '#2da44e', lineHeight: 1.1 }}
      >
        {data.numberOfIncidentsMapped}
      </Typography>
    </KPICard>
  );
}
