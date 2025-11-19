import { Typography } from "@mui/material";

import { KPICard } from "@/components/kpi-card";
import { KPI } from "@/services/dashboard/investigation-quality/KPIs";

export const NumerOfInvestigationsReviewed: React.FunctionComponent<{ data: Pick<KPI, 'numberOfInvestigationsReviewed'> }> = ({
  data
}) => {
  return (
    <KPICard title="Number of Investigations Reviewed">
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, color: '#2da44e', lineHeight: 1.1 }}
      >
        {data.numberOfInvestigationsReviewed}
      </Typography>
    </KPICard>
  );
}
