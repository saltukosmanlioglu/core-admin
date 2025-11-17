import { Typography } from "@mui/material";

import { KPICard } from "@/components/kpi-card";

interface CompanyDetailProps {
  name: string;
}

export const CompanyDetails: React.FunctionComponent<CompanyDetailProps> = ({ name }) => {
  return (
    <KPICard subtitle="Enterprise Plus Contract" title="Company Details">
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: '#2da44e', fontSize: 20 }}
      >
        {name}
      </Typography>
    </KPICard>
  );
}
