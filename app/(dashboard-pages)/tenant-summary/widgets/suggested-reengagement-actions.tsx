"use client";

import React from "react";
import {
  Card,
  CardContent,
  Switch,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import ChartCard from "@/components/chart-card";

export type ReengagementAction = {
  id: string;
  label: string;
  enabled: boolean;
};

export interface SuggestedReengagementActionsProps {
  actions: ReengagementAction[];
  onToggle?: (id: string, enabled: boolean) => void;
}

export const SuggestedReengagementActions: React.FC<
  SuggestedReengagementActionsProps
> = ({ actions, onToggle }) => {
  return (
    <ChartCard title="Suggested Re-engagement Actions">
      <Stack spacing={1.5}>
        {actions.map((action) => (
          <Box
            key={action.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "#4b5563", lineHeight: 1.4 }}
            >
              {action.label}
            </Typography>

            <Switch
              edge="end"
              checked={action.enabled}
              onChange={(_, checked) => onToggle?.(action.id, checked)}
            />
          </Box>
        ))}
      </Stack>
    </ChartCard>
  );
};

export default SuggestedReengagementActions;
