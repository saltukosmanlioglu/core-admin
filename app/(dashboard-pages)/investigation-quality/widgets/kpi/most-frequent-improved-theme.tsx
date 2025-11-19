import { Typography } from "@mui/material";

import { KPICard } from "@/components/kpi-card";

export const MostFrequentImprovedTheme: React.FunctionComponent = () => {
  return (
    <KPICard title="Most Frequent ImprovedTheme">
      <Typography
        variant="h6"
        sx={{ fontWeight: 800, color: '#2da44e', lineHeight: 1.1 }}
      >
        Root Cause Validation
      </Typography>
    </KPICard>
  );
}
