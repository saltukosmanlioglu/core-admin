import { Typography } from "@mui/material";

import { KPICard } from "@/components/kpi-card";
import { KPI } from "@/services/dashboard/tenant-summary/KPIs";

export const CompanyDetails: React.FunctionComponent<{ data: Pick<KPI, 'company'> }> = ({
  data
}) => {
  return (
    <KPICard title="Company Details">
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, color: '#2da44e', lineHeight: 1.1 }}
      >
        {data.company.name}%
      </Typography>
    </KPICard>
  );
}
