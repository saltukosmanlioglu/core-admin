"use client";

import * as React from "react";
import {
  Box,
  Button,
  Card,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FlagIcon from "@mui/icons-material/Flag";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

export type KPIStatusVariant = "good" | "fair" | "needs_improvement";

export type StatusConfig = Record<
  KPIStatusVariant,
  {
    label: string;
    color: string;
    icon: React.ReactNode;
    barColor: string;
  }
>;

export interface StatusCardProps {
  title: string;
  progress: number;
  status: KPIStatusVariant;
  statusText?: string;
  actionLabel?: string;
  onViewDetails?: () => void;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  progress,
  status,
  statusText,
  actionLabel = "View Details",
  onViewDetails,
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  const statusConfig: StatusConfig = {
    good: {
      label: "Good",
      color: "#16a34a",
      icon: <CheckCircleIcon fontSize="inherit" />,
      barColor: "#16a34a",
    },
    fair: {
      label: "Fair",
      color: "#eab308",
      icon: <WarningAmberIcon fontSize="inherit" />,
      barColor: "#eab308",
    },
    needs_improvement: {
      label: "Needs Improvement",
      color: "#dc2626",
      icon: <FlagIcon fontSize="inherit" />,
      barColor: "#dc2626",
    },
  };

  const cfg = statusConfig[status];

  return (
    <Card elevation={0} sx={{ borderRadius: 3, px: 2.5, py: 2, bgcolor: "#ffffff", boxShadow: "0 4px 12px rgba(164, 108, 194, 0.12)", color: "#111827", display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>

      <Box sx={{ my: 2 }}>
        <LinearProgress variant="determinate" value={clampedProgress} sx={{ height: 6, borderRadius: 999, backgroundColor: "#F3F4F6", "& .MuiLinearProgress-bar": { borderRadius: 999, backgroundColor: cfg.barColor, } }} />
      </Box>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={1.2} alignItems="center">
          <Box sx={{ color: cfg.color }}>{cfg.icon}</Box>
          <Typography sx={{ color: cfg.color, fontWeight: 500, fontSize: 12 }}>
            {statusText || cfg.label}
          </Typography>
        </Stack>

        <Button
          size="small"
          variant="outlined"
          onClick={onViewDetails}
          sx={{
            textTransform: "none",
            fontSize: 12,
            px: 1.5,
            borderRadius: 2,
            borderColor: "#D1D5DB",
            color: "#374151",
            minWidth: 36,
            "&:hover": {
              borderColor: "#9CA3AF",
              backgroundColor: "#F3F4F6",
            },
          }}
        >
          <TrendingFlatIcon sx={{ fontSize: 14, color: "#374151" }} />
        </Button>
      </Stack>
    </Card>
  );
};

export default StatusCard;
