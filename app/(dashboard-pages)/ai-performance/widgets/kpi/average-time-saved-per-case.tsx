import { Stack, Typography } from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import { KPIProps } from "@/services/dashboard/ai-performance/KPIs";

import { KPICard } from "../components/kpi-card";

export const AverageTimeSavedPerCase: React.FunctionComponent<{ data: Pick<KPIProps, 'averageTimeSavedPerCase'> }> = ({
  data
}) => {
  return (
    <KPICard>
      <Stack direction="row" alignItems="center" spacing={0.75}>
        <Typography variant="body2" color="text.secondary">
          Average Time Saved per Case
        </Typography>
      </Stack>
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
