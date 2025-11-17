import { Stack, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { KPICard } from "@/components/kpi-card";
import { KPI } from "@/services/dashboard/ai-performance/KPIs";

export const TotalHumanReviewEdits: React.FunctionComponent<{ data: Pick<KPI, 'totalHumanReviewEdits'> }> = ({
  data
}) => {
  return (
    <KPICard>
      <Stack direction="row" alignItems="center" spacing={0.75}>
        <Typography variant="body2" color="text.secondary">
          Total Human Review Edits
        </Typography>
        <Tooltip title="Sum of edit actions across accepted AI outputs" arrow>
          <InfoOutlinedIcon fontSize="small" sx={{ color: "text.disabled" }} />
        </Tooltip>
      </Stack>
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, color: '#1f6feb', lineHeight: 1.1 }}
      >
        {data.totalHumanReviewEdits}
      </Typography>
    </KPICard>
  );
}
