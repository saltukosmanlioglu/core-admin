import { Card, CardContent, Stack, Typography } from "@mui/material";

interface KPICardProps {
  children: React.ReactNode;
  title?: string;
}

export const KPICard: React.FunctionComponent<KPICardProps> = ({
  children,
  title
}) => {
  return (
    <Card elevation={0} sx={{ borderRadius: 3, height: '100%', width: '100%', boxShadow: "0 4px 12px rgba(164, 108, 194, 0.12)" }}>
      <CardContent sx={{ py: 2.25, px: 2.5, width: '100%' }}>
        <Stack spacing={1.25}>
          {title && <Stack direction="row" alignItems="center" spacing={0.75}>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Stack>}
          {children}
        </Stack>
      </CardContent>
    </Card>
  );
}

