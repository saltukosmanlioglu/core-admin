"use client";

import * as React from "react";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export interface InvestigationQualityScoreBarProps {
  score: number;
  maxScore?: number;
}

const InvestigationQualityScoreBar: React.FC<InvestigationQualityScoreBarProps> = ({
  score,
  maxScore = 100,
}) => {
  const clamped = Math.max(0, Math.min(maxScore, score));
  const percent = (clamped / maxScore) * 100;

  return (
    <Box sx={{ width: "100%", my: 2 }}>
      <LinearProgress
        variant="determinate"
        value={percent}
        sx={{
          height: 8,
          borderRadius: 999,
          backgroundColor: "rgba(148,163,184,0.25)",
          "& .MuiLinearProgress-bar": {
            borderRadius: 999,
            backgroundColor: "#22c55e",
          },
        }}
      />

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ mt: 1.1 }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: 13,
            fontWeight: 700,
            color: "#000",
          }}
        >
          Investigation Quality Score: {clamped}/{maxScore}
        </Typography>

        <CheckCircleIcon
          sx={{
            fontSize: 24,
            color: "#22c55e",
          }}
        />
      </Stack>
    </Box>
  );
};

export default InvestigationQualityScoreBar;
