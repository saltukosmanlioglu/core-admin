import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

export default function AverageTimeSavedPerCase() {
  return (
    <Card elevation={0} sx={{ borderRadius: 3 }}>
      <CardContent sx={{ py: 2.25, px: 2.5 }}>
        <Stack spacing={1.25}>
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
              45
              <Typography
                component="span"
                variant="h5"
                sx={{ ml: 0.5, fontWeight: 700, color: '#c8a043' }}
              >
                min
              </Typography>
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
