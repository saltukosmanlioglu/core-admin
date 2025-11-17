import { Typography } from "@mui/material";

import { KPICard } from "@/components/kpi-card";

export interface CostPerTokenProps {
  maxValue: number | string;
  subtitle?: string;
  value: number | string;
}

export const CostPerToken: React.FunctionComponent<CostPerTokenProps> = ({
  maxValue,
  value
}) => {
  return (
    <KPICard subtitle="(AUD) vs monthly allocation" title="Token Cost">
      <Typography variant="h4" sx={{ fontWeight: 700, color: "#2563eb" }}>${value} <span style={{ fontSize: 16 }}>/ ${maxValue}</span></Typography>
    </KPICard>
  );
}
