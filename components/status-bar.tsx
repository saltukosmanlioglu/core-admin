"use client";

import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

export interface StatusBarItem {
  name: string;
  value: string | number;
}

export interface StatusBarProps {
  items: Array<StatusBarItem>;
  containerId: string;
}

type BarPosition = { left: number; width: number };

export const StatusBar: React.FunctionComponent<StatusBarProps> = ({
  items = [],
  containerId }) => {
  const [pos, setPos] = useState<BarPosition>({ left: 0, width: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updatePosition = () => {
      const el = document.getElementById(containerId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPos({ left: rect.left, width: rect.width });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [containerId]);

  return (
    <Box sx={{ position: "fixed", bottom: 24, left: pos.left, width: pos.width, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 2px 8px rgba(140,0,255,0.08)", padding: "12px 20px", display: "flex", alignItems: "center", zIndex: 1300 }}>
      <Stack direction="row" spacing={3} alignItems="center" justifyContent="space-between" sx={{ overflowX: "auto", whiteSpace: "nowrap", width: '100%' }}>
        {items.map((item, index) => (
          <Stack key={index} direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" sx={{ opacity: 0.75 }}>{item.name}:</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.value}</Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default StatusBar;
