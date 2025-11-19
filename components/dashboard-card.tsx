import React, { useImperativeHandle, useRef } from "react";
import type { EChartsType } from "echarts";
import {
  Backdrop,
  Box,
  Card,
  Divider,
  IconButton,
  Modal,
  Stack,
  Tooltip,
  Typography,
  Zoom
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

export interface ChartCardProps {
  children: React.ReactElement<ChartChildProps>;
  disableDownloadAction?: boolean
  disableFullScreenAction?: boolean
  title: string;
}

export interface ChartChildProps {
  onChartReady?: (inst: EChartsType) => void;
};

const DashboardCard = React.forwardRef<EChartsType, ChartCardProps>(({
  children,
  title,
  disableDownloadAction = false,
  disableFullScreenAction = false
}, ref) => {
  const [open, setOpen] = React.useState(false);

  const chartInstance = useRef<EChartsType | null>(null);

  useImperativeHandle(ref, () => chartInstance.current as EChartsType);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDownload = () => {
    if (!chartInstance.current) return;
    const url = chartInstance.current.getDataURL({
      type: "png",
      pixelRatio: 2,
      backgroundColor: "#fff",
    });
    const link = document.createElement("a");

    const date = new Date()
    const safeName = `${date.getTime()}-${title.trim().toLowerCase().replace(/\s+/g, "_").replace(/[^\w-]+/g, "")}`;

    link.href = url;
    link.download = `${safeName || "chart"}.png`;
    link.click();
  };

  const childWithHook = React.isValidElement(children)
    ? React.cloneElement<ChartChildProps>(children as React.ReactElement<ChartChildProps>, {
      onChartReady: (inst: EChartsType) => {
        chartInstance.current = inst;
      },
    })
    : children;

  return (
    <React.Fragment>
      <Card elevation={0} sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(164, 108, 194, 0.12)", p: 2 }}>
        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ color: "#000", fontSize: 16, fontWeight: 600 }}>
              {title}
            </Typography>
            {!disableDownloadAction && !disableFullScreenAction && (
              <Stack direction="row" spacing={1} alignItems="center">
                {!disableDownloadAction && (
                  <Tooltip title="Download">
                    <IconButton onClick={handleDownload} sx={{ borderRadius: 5, color: "#98A2B3", bgcolor: "rgba(255,255,255,0.4)", transition: "all 0.25s ease", "&:hover": { bgcolor: "rgba(164,108,194,0.15)", color: "rgba(164,108,194,0.85)" } }}>
                      <CloudDownloadIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}

                {!disableFullScreenAction && (
                  <Tooltip title="Full Screen">
                    <IconButton onClick={handleOpen} sx={{ borderRadius: 5, color: "#98A2B3", bgcolor: "rgba(255,255,255,0.4)", transition: "all 0.25s ease", "&:hover": { bgcolor: "rgba(164,108,194,0.15)", color: "rgba(164,108,194,0.85)" } }}>
                      <FullscreenIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
            )}
          </Stack>
        </Box>
        <Divider sx={{ py: 0.5 }} />
        <Box sx={{ mt: 2 }}>{childWithHook}</Box>
      </Card>

      <Modal open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 400, sx: { background: "rgba(255,255,255,0.55)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", backgroundImage: "linear-gradient(120deg, rgba(164,108,194,0.10), rgba(255,255,255,0.45))" } } }}>
        <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Zoom in={open}>
            <Box sx={{ width: "80%", height: "80%", bgcolor: "rgba(255,255,255,0.82)", borderRadius: "16px", p: 4, overflow: "hidden", boxShadow: "0 8px 32px rgba(164,108,194,0.28)", border: "1px solid rgba(164,108,194,0.18)", backdropFilter: "blur(4px)" }}>
              {children}
            </Box>
          </Zoom>
        </Box>
      </Modal>

    </React.Fragment>
  );
}
);

export default DashboardCard;
