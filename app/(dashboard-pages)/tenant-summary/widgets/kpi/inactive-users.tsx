import { Typography } from "@mui/material";

import { KPICard } from "@/components/kpi-card";
import { KPI } from "@/services/dashboard/tenant-summary/KPIs";

export const InactiveUsers: React.FunctionComponent<{ data: Pick<KPI, 'inactiveUsers'> }> = ({
  data
}) => {
  return (
    <KPICard subtitle="30 days no sh use" title="Inactive Users">
      <Typography variant="h4" sx={{ fontWeight: 800, color: '#fbbf24', lineHeight: 1.1 }}>
        {data.inactiveUsers}
      </Typography>
    </KPICard>
  );
}
