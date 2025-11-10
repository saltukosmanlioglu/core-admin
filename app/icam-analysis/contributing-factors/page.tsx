"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  IconButton,
  Stack,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

import { DashboardLayout } from "@/mui/layout/dashboard";

import { data, layoutProps } from "./constants";

const getColor = (rating: number) => {
  if (rating >= 90) return "#4CAF50"; // green
  if (rating >= 75) return "#FFB300"; // yellow
  return "#E53935"; // red
};

// Slightly larger gauge as discussed
const GAUGE_SIZE = 70;

export default function ContributingFactors() {
  const [expandedMap, setExpandedMap] = useState<Record<number, boolean>>(
    Object.fromEntries(data.map((_, i) => [i, true]))
  );

  // Version selector — SAME PATTERN as your Stepper (Select + MenuItem)
  const versions = ["v1.0", "v1.2", "v1.5", "v1.8", "v2.0"];
  const [selectedVersion, setSelectedVersion] = useState<string>(
    versions[versions.length - 1]
  );

  const allExpanded = Object.values(expandedMap).every((v) => v);

  const toggleOne = (idx: number) =>
    setExpandedMap((m) => ({ ...m, [idx]: !m[idx] }));

  const toggleAll = () =>
    setExpandedMap(
      Object.fromEntries(data.map((_, i) => [i, !allExpanded]))
    );

  const copyAll = async () => {
    const text = data
      .map(
        (d, i) =>
          `${i + 1}. ${d.factor}\nRating: ${d.rating}%\nExplanation: ${d.explanation}`
      )
      .join("\n\n");
    await navigator.clipboard.writeText(text);
  };

  const onEdit = () => {
    // placeholder only (no services)
    console.log("Edit clicked");
  };

  return (
    <DashboardLayout {...layoutProps}>
      {/* Header: title (left) • version select + icon-only actions (right) */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
          Contributing Factors
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          {/* SAME version control as in your Stepper */}
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

          {/* Edit (icon-only, placeholder) */}
          <Tooltip title="Edit">
            <IconButton
              onClick={onEdit}
              sx={{
                color: "#c9d1d9",
                bgcolor: "rgba(255,255,255,0.06)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
              }}
              aria-label="edit"
            >
              <ModeEditOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Copy all (icon-only) */}
          <Tooltip title="Copy all">
            <IconButton
              onClick={copyAll}
              sx={{
                color: "#c9d1d9",
                bgcolor: "rgba(255,255,255,0.06)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
              }}
              aria-label="copy all"
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Expand / Collapse all (icon-only) */}
          <Tooltip title={allExpanded ? "Collapse all" : "Expand all"}>
            <IconButton
              onClick={toggleAll}
              sx={{
                color: "#c9d1d9",
                bgcolor: "rgba(255,255,255,0.06)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
              }}
              aria-label={allExpanded ? "collapse all" : "expand all"}
            >
              {allExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Divider sx={{ mt: 2, mb: 2, borderColor: "rgba(255,255,255,0.08)" }} />

      <Box display="flex" flexDirection="column" gap={2}>
        {data.map((item, index) => {
          const expanded = !!expandedMap[index];
          return (
            <Accordion
              key={index}
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
                {/* Title */}
                <Typography
                  variant="body1"
                  sx={{ fontSize: "0.9rem", fontWeight: 800, flex: 1 }}
                >
                  {item.factor}
                </Typography>

                {/* Gauge (fixed, non-rotating) */}
                <Box
                  sx={{
                    width: GAUGE_SIZE,
                    height: GAUGE_SIZE,
                    mr: 1.25,
                    borderRadius: "50%",
                    bgcolor: "rgba(255,255,255,0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Gauge
                    value={item.rating}
                    startAngle={-90}
                    endAngle={270} // full circle
                    innerRadius="70%"
                    cornerRadius="60%"
                    sx={{
                      [`& .${gaugeClasses.valueText}`]: {
                        fill: getColor(item.rating),
                        fontSize: 14,
                        fontWeight: 800,
                        paintOrder: "stroke",
                        stroke: "rgba(0,0,0,0.6)",
                        strokeWidth: 2,
                      },
                      [`& .${gaugeClasses.valueArc}`]: {
                        fill: getColor(item.rating),
                      },
                      [`& .${gaugeClasses.referenceArc}`]: {
                        fill: "rgba(255,255,255,0.14)",
                      },
                    }}
                    text={`${item.rating}%`}
                  />
                </Box>
                {/* Chevron is the expandIcon so only it rotates */}
              </AccordionSummary>

              <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#bdbdbd",
                    fontSize: "0.82rem",
                    lineHeight: 1.45,
                    mt: 1,
                  }}
                >
                  {item.explanation}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </DashboardLayout >
  );
}
