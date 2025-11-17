import { Card, CardContent, Stack, Tooltip, TooltipProps, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface KPICardProps {
  children: React.ReactNode;
  subtitle?: string;
  title?: string;
  tooltipTitle?: TooltipProps['title'];
}

export const KPICard: React.FunctionComponent<KPICardProps> = ({
  children,
  subtitle,
  title,
  tooltipTitle
}) => {
  return (
    <Card elevation={0} sx={{ borderRadius: 3, height: '100%', width: '100%', boxShadow: "0 4px 12px rgba(164, 108, 194, 0.12)" }}>
      <CardContent sx={{ py: 2.25, px: 2.5, width: '100%' }}>
        <Stack spacing={1.25}>
          {title && (
            <Stack direction="row" alignItems="center" spacing={0.75}>
              <Typography variant="body2" color="text.secondary">
                {title}
              </Typography>
              {tooltipTitle && (
                <Tooltip title={tooltipTitle} arrow>
                  <InfoOutlinedIcon fontSize="small" sx={{ color: "text.disabled" }} />
                </Tooltip>
              )}
            </Stack>
          )}
          {children}
          {subtitle && (
            <Typography variant="body2" sx={{ mt: 1.5, color: "#6b7280" }}>
              {subtitle}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

