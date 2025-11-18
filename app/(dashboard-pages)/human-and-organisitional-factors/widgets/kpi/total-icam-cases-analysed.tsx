import { Typography } from "@mui/material";

import { KPICard } from "@/components/kpi-card";
import { KPI } from "@/services/dashboard/human-and-organisitional-factors/KPIs";

export const TotalICAMCasesAnalysed: React.FunctionComponent<{ data: Pick<KPI, 'totalICAMCasesAnalysed'> }> = ({
  data
}) => {
  return (
    <KPICard title="Total ICAM Cases Analysed">
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, color: '#2da44e', lineHeight: 1.1 }}
      >
        {data.totalICAMCasesAnalysed}
      </Typography>
    </KPICard>
  );
}
