"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Stack,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
  Divider,
  Grid,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

import { DashboardLayout } from "@/mui/layout/dashboard";
import { data, layoutProps } from "./constants";

// ---------- helpers ----------
const GAUGE_SIZE = 70;

const getColor = (rating: number) => {
  if (rating >= 90) return "#4CAF50";  // green
  if (rating >= 80) return "#FFB300";  // yellow
  return "#E53935";                    // red
};

export default function ICAMTable() {
  // each category accordion open/close
  const [expandedMap, setExpandedMap] = useState<Record<number, boolean>>(
    Object.fromEntries(data.map((_, i) => [i, true]))
  );

  // version selector
  const versions = ["v1.0", "v1.2", "v1.5", "v1.8", "v2.0"];
  const [selectedVersion, setSelectedVersion] = useState<string>(
    versions[versions.length - 1]
  );

  const allExpanded = Object.values(expandedMap).every(Boolean);

  const toggleOne = (idx: number) =>
    setExpandedMap((m) => ({ ...m, [idx]: !m[idx] }));

  const toggleAll = () =>
    setExpandedMap(Object.fromEntries(data.map((_, i) => [i, !allExpanded])));

  const copyAll = async () => {
    // copy all bullets as plain text
    const text = data
      .map((cat, i) => {
        const lines = cat.items
          ?.map((b, j) => `${i + 1}.${j + 1} ${b.text} (${b.rating}%)`)
          .join("\n");
        return `${i + 1}. ${cat.category}\n${lines ?? ""}`;
      })
      .join("\n\n");
    await navigator.clipboard.writeText(text);
  };

  const onEdit = () => {
    console.log("Edit clicked");
  };

  return (
    <DashboardLayout {...layoutProps}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
          ICAM Table
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          {/* Version dropdown */}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value as string)}
              displayEmpty
              inputProps={{ "aria-label": "Version selector" }}
              sx={{
                color: "#c9d1d9",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.16)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.24)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.32)",
                },
                bgcolor: "rgba(255,255,255,0.06)",
              }}
            >
              {versions.map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Edit */}
          <Tooltip title="Edit">
            <IconButton
              onClick={onEdit}
              sx={{
                color: "#c9d1d9",
                bgcolor: "rgba(255,255,255,0.06)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
              }}
            >
              <ModeEditOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Copy all */}
          <Tooltip title="Copy all">
            <IconButton
              onClick={copyAll}
              sx={{
                color: "#c9d1d9",
                bgcolor: "rgba(255,255,255,0.06)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
              }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Expand / Collapse all */}
          <Tooltip title={allExpanded ? "Collapse all" : "Expand all"}>
            <IconButton
              onClick={toggleAll}
              sx={{
                color: "#c9d1d9",
                bgcolor: "rgba(255,255,255,0.06)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
              }}
            >
              {allExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Divider sx={{ mt: 2, mb: 2, borderColor: "rgba(255,255,255,0.08)" }} />

      {/* 2x2 Grid layout */}
      <Grid container spacing={2}>
        {data.map((cat, index) => {
          const expanded = !!expandedMap[index];
          return (
            <Grid size={{ xs: 6, }} key={index}>
              <Accordion
                expanded={expanded}
                onChange={() => toggleOne(index)}
                disableGutters
                sx={{
                  backgroundColor: "#161b22",
                  color: "#c9d1d9",
                  borderRadius: 2,
                  overflow: "hidden",
                  "&:before": { display: "none" },
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                  sx={{
                    px: 2,
                    minHeight: 56,
                    "& .MuiAccordionSummary-content": {
                      m: 0,
                      alignItems: "center",
                      gap: 1.5,
                    },
                    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                      transform: "rotate(180deg)",
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "0.9rem", fontWeight: 800, flex: 1 }}
                  >
                    {cat.category}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
                  <ul style={{ margin: 0, paddingLeft: "1.25rem", listStyle: "disc" }}>
                    {cat.items?.map((bullet, i) => (
                      <li key={i} style={{ marginTop: i === 0 ? 8 : 12 }}>
                        <Stack direction="row" alignItems="flex-start" spacing={1.25}>
                          {/* text */}
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                              variant="body2"
                              sx={{ lineHeight: 1.45, color: "#bdbdbd", textAlign: 'justify' }}
                            >
                              {bullet.text}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              width: GAUGE_SIZE,
                              height: GAUGE_SIZE,
                              borderRadius: "50%",
                              bgcolor: "rgba(255,255,255,0.04)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flex: "0 0 auto",
                            }}
                          >
                            <Gauge
                              value={bullet.rating}
                              startAngle={-90}
                              endAngle={270}      // full circle
                              innerRadius="70%"
                              cornerRadius="60%"
                              text={`${bullet.rating}%`}
                              sx={{
                                [`& .${gaugeClasses.valueText}`]: {
                                  fill: getColor(bullet.rating),
                                  fontSize: 13,
                                  fontWeight: 800,
                                  paintOrder: "stroke",
                                  stroke: "rgba(0,0,0,0.6)",
                                  strokeWidth: 2,
                                },
                                [`& .${gaugeClasses.valueArc}`]: {
                                  fill: getColor(bullet.rating),
                                },
                                // handle both class names across x-charts versions
                                [`& .${(gaugeClasses as any).track ?? (gaugeClasses as any).referenceArc}`]:
                                  { fill: "rgba(255,255,255,0.14)" },
                              }}
                            />
                          </Box>
                        </Stack>

                        {/* divider between bullets */}
                        {i < (cat.items?.length ?? 0) - 1 && (
                          <Divider sx={{ mt: 1, mb: 0.5, borderColor: "rgba(255,255,255,0.08)" }} />
                        )}
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            </Grid>
          );
        })}
      </Grid>
    </DashboardLayout>
  );
}
