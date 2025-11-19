import { Typography } from "@mui/material";

import { KPICard } from "@/components/kpi-card";
import { KPI } from "@/services/dashboard/organisitional-learning-network/KPIs";

export const SharedLearningLinks: React.FunctionComponent<{ data: Pick<KPI, 'sharedLearningsLinks'> }> = ({
  data
}) => {
  return (
    <KPICard title="Shared Learning Links">
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, color: '#2da44e', lineHeight: 1.1 }}
      >
        {data.sharedLearningsLinks}+
      </Typography>
    </KPICard>
  );
}
