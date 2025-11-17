"use client";

import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

import ChartCard from "@/components/chart-card";

import { ChildProps } from "./types";

export interface ContractDetailProps {
  daysUntilExpiry: number;
  progress: number;
  riskLabel: string;
}

export const ContractDetail: React.FunctionComponent<ChildProps & ContractDetailProps> = ({
  daysUntilExpiry,
  progress,
  riskLabel
}) => {
  return (
    <ChartCard title="Contract Renewal Readiness">
      <Box
        sx={{
          width: "100%",
          minHeight: 180,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ color: "#e5e7eb", fontWeight: 500, mb: 0.5 }}
        >
          {daysUntilExpiry} Days Until Expiry
        </Typography>

        <Box sx={{ width: "80%", maxWidth: 360 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 999,
              backgroundColor: "rgba(148,163,184,0.35)",
              "& .MuiLinearProgress-bar": {
                borderRadius: 999,
                backgroundColor: "#fbbf24",
              },
            }}
          />
        </Box>

        <Box
          sx={{
            mt: 1.5,
            px: 3,
            py: 1,
            borderRadius: 2,
            backgroundColor: "#fbbf24",
            color: "#111827",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          {riskLabel}
        </Box>
      </Box>
    </ChartCard>
  );
};

export default ContractDetail;
