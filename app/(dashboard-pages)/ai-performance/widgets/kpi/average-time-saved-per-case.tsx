import { Stack, Typography } from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import { KPICard } from "@/components/kpi-card";
import { KPI } from "@/services/dashboard/ai-performance/KPIs";

export const AverageTimeSavedPerCase: React.FunctionComponent<{ data: Pick<KPI, 'averageTimeSavedPerCase'> }> = ({
  data
}) => {
  return (
    <KPICard title="Average Time Saved per Case">
      <Stack direction="row" alignItems="center" spacing={1}>
        <AccessTimeRoundedIcon sx={{ color: '#c8a043' }} />
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, color: '#c8a043', lineHeight: 1.1 }}
        >
          {data.averageTimeSavedPerCase}
          <Typography
            component="span"
            variant="h5"
            sx={{ ml: 0.5, fontWeight: 700, color: '#c8a043' }}
          >
            min
          </Typography>
        </Typography>
      </Stack>
    </KPICard>
  );
}
