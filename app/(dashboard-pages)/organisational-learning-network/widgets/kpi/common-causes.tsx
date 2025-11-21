import { Typography } from "@mui/material";

import { KPICard } from "@/components/kpi-card";
import { KPI } from "@/services/dashboard/organisitional-learning-network/KPIs";

export const CommonCauses: React.FunctionComponent<{ data: Pick<KPI, 'commonCauses'> }> = ({
  data
}) => {
  return (
    <KPICard title="Common Causes">
      <Typography variant="h4" sx={{ fontWeight: 800, color: '#2da44e', lineHeight: 1.1 }}>
        {data.commonCauses}
      </Typography>
    </KPICard>
  );
}
