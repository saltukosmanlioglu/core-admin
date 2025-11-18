import { Typography } from "@mui/material";

import { KPICard } from "@/components/kpi-card";
import { KPI } from "@/services/dashboard/tenant-summary/KPIs";

export const CostPerToken: React.FunctionComponent<{ data: KPI['token'] }> = ({
  data
}) => {
  return (
    <KPICard subtitle="(AUD) vs monthly allocation" title="Token Cost">
      <Typography variant="h4" sx={{ fontWeight: 700, color: "#2563eb" }}>
        ${data.value}
        <span style={{ fontSize: 16 }}>/ ${data.maxValue}</span>
      </Typography>
    </KPICard>
  );
}
