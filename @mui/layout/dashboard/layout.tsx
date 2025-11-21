"use client";

import React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Copyright from "@/mui/layout/components/copyright";
import SideMenu from "@/mui/layout/dashboard/components/side-menu";
import { Header } from "./components/header";
import type { DashboardLayoutProps } from "./types";
import { DashboardTopBar } from "./components/top-bar";

const APP_BAR_HEIGHT = 64; // px

export default function DashboardLayout({
  breadcrumbItems,
  buttons,
  children,
  title,
}: DashboardLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = React.useState(true);

  return (
    <React.Fragment>
      <CssBaseline enableColorScheme />

      <DashboardTopBar
        menuOpen={sidebarExpanded}
        onToggleMenu={setSidebarExpanded}
      />

      <Box sx={{ display: "flex" }}>
        <SideMenu expanded={sidebarExpanded} />

        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
            minHeight: "100vh",
            pt: `${APP_BAR_HEIGHT}px`,
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
            }}
          >
            <Header breadcrumbItems={breadcrumbItems} buttons={buttons} />

            <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
              {title && (
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{ mb: 2, fontWeight: 700 }}
                >
                  {title}
                </Typography>
              )}

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "#f8fafc",
                  border: "1px solid rgba(255,255,255,0.06)",
                  position: "relative",
                }}
              >
                {children}
              </Paper>

              <Copyright sx={{ my: 4 }} />
            </Box>
          </Stack>
        </Box>
      </Box>
    </React.Fragment>
  );
}
