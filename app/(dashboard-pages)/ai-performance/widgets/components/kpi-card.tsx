import { Card, CardContent, Stack } from "@mui/material";

interface KPICardProps {
  children: React.ReactNode
}

export const KPICard: React.FunctionComponent<KPICardProps> = ({
  children
}) => {
  // boxShadow: "0 4px 12px rgba(164, 108, 194, 0.25)"
  return (
    <Card elevation={0} sx={{ borderRadius: 3, height: '100%', width: '100%' }}>
      <CardContent sx={{ py: 2.25, px: 2.5, width: '100%' }}>
        <Stack spacing={1.25}>
          {children}
        </Stack>
      </CardContent>
    </Card>
  );
}

