import { Stack, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { KPIProps } from "@/services/dashboard/ai-performance/KPIs";
import { KPICard } from "../components/kpi-card";

export const AIOutputAcceptanceRate: React.FunctionComponent<{ data: Pick<KPIProps, 'aiOutputAcceptanceRate'> }> = ({
  data
}) => {
  return (
    <KPICard>
      <Stack direction="row" alignItems="center" spacing={0.75}>
        <Typography variant="body2" color="text.secondary">
          AI Output Acceptance Rate
        </Typography>
        <Tooltip title="Percentage of AI outputs accepted without major edits" arrow>
          <InfoOutlinedIcon fontSize="small" sx={{ color: "text.disabled" }} />
        </Tooltip>
      </Stack>
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, color: '#2da44e', lineHeight: 1.1 }}
      >
        {data.aiOutputAcceptanceRate}%
      </Typography>
    </KPICard>
  );
}
