import { Typography } from "@mui/material";

import { KPICard } from "@/components/kpi-card";
import { KPI } from "@/services/dashboard/tenant-summary/KPIs";

export const ActiveUsers: React.FunctionComponent<{ data: Pick<KPI, 'activeUsers'> }> = ({
  data
}) => {
  return (
    <KPICard title="Active Users">
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, color: '#2da44e', lineHeight: 1.1 }}
      >
        {data.activeUsers}
      </Typography>
    </KPICard>
  );
}
