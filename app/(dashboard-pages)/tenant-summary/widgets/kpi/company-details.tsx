import { Typography } from "@mui/material";

import { KPICard } from "@/components/kpi-card";
import { KPI } from "@/services/dashboard/tenant-summary/KPIs";

export const CompanyDetails: React.FunctionComponent<{ data: KPI['company'] }> = ({
  data
}) => {
  return (
    <KPICard subtitle="Enterprise Plus Contract" title="Company Details">
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: '#2da44e', fontSize: 20 }}
      >
        {data.name}
      </Typography>
    </KPICard>
  );
}
