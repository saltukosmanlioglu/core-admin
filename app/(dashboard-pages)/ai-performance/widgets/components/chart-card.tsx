import React, { useImperativeHandle, useRef } from "react";
import type { EChartsType } from "echarts";
import {
  Backdrop,
  Box, Card, Divider, IconButton, Modal, Stack, Tooltip, Typography,
  Zoom
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

export interface ChartCardProps {
  children: React.ReactElement<ChartChildProps>;
  title: string;
}

type ChartChildProps = {
  onChartReady?: (inst: EChartsType) => void;
};

const ChartCard = React.forwardRef<EChartsType, ChartCardProps>(
  ({ children, title }, ref) => {
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
        backgroundColor: "#000",
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
        <Card elevation={0} sx={{ borderRadius: 3 }}>
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
                {title}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Tooltip title="Download">
                  <IconButton onClick={handleDownload} sx={{ borderRadius: 3, color: "#c9d1d9", bgcolor: "rgba(255,255,255,0.06)", "&:hover": { bgcolor: "rgba(255,255,255,0.12)" } }}>
                    <CloudDownloadIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Full Screen">
                  <IconButton onClick={handleOpen} sx={{ borderRadius: 3, color: "#c9d1d9", bgcolor: "rgba(255,255,255,0.06)", "&:hover": { bgcolor: "rgba(255,255,255,0.12)" } }}>
                    <FullscreenIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </Box>
          <Divider sx={{ py: 0.5 }} />
          <Box>{childWithHook}</Box>
        </Card>

        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 400,
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Zoom in={open}>
              <Box
                sx={{
                  width: "80%",
                  height: "80%",
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                {childWithHook}
              </Box>
            </Zoom>
          </Box>
        </Modal>

      </React.Fragment>
    );
  }
);

export default ChartCard;
