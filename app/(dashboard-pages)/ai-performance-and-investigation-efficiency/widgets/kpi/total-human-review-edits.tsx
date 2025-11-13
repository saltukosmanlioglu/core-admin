import { Card, CardContent, Stack, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function TotalHumanReviewEdits() {
  return (
    <Card elevation={0} sx={{ borderRadius: 3 }}>
      <CardContent sx={{ py: 2.25, px: 2.5 }}>
        <Stack spacing={1.25}>
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
            315
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
