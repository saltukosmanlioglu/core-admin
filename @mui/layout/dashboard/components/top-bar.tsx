"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { styled, useTheme } from "@mui/material/styles";
import AppBarBase from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const AppBar = styled(AppBarBase)(({ theme }) => ({
  border: "none",
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.05)",
  zIndex: theme.zIndex.drawer + 1,
}));

const LogoContainer = styled("div")({
  position: "relative",
  height: 40,
  display: "flex",
  alignItems: "center",
  "& img": {
    maxHeight: 40,
  },
});

export interface DashboardTopBarProps {
  menuOpen: boolean;
  onToggleMenu: (open: boolean) => void;
}

export function DashboardTopBar({ menuOpen, onToggleMenu }: DashboardTopBarProps) {
  const theme = useTheme();

  const handleMenuClick = React.useCallback(() => {
    onToggleMenu(!menuOpen);
  }, [menuOpen, onToggleMenu]);

  const menuTooltip = menuOpen ? "Collapse menu" : "Expand menu";

  return (
    <AppBar color="inherit" sx={{ displayPrint: "none", backgroundColor: "#ffffff" }}>
      <Toolbar sx={{ backgroundColor: "inherit", mx: { xs: -0.75, sm: -1 } }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ flexWrap: "wrap", width: "100%" }}
        >
          <Stack direction="row" alignItems="center">
            <Box sx={{ mr: 1 }}>
              <Tooltip title={menuTooltip} enterDelay={600}>
                <IconButton
                  size="small"
                  aria-label={menuTooltip}
                  onClick={handleMenuClick}
                  sx={{
                    borderRadius: 2,
                    border: "1px solid rgba(148,163,184,0.4)",
                    width: 40,
                    height: 40,
                  }}
                >
                  {menuOpen ? <MenuOpenIcon /> : <MenuIcon />}
                </IconButton>
              </Tooltip>
            </Box>

            <Link href="/" style={{ textDecoration: "none" }}>
              <Stack direction="row" alignItems="center">
                <LogoContainer>
                  <Image
                    src="/incident_AI_logo.svg"
                    alt="Incident AI"
                    width={32}
                    height={32}
                  />
                </LogoContainer>
                <Typography
                  variant="h6"
                  sx={{
                    color: (theme.vars ?? theme).palette.primary.main,
                    fontWeight: 700,
                    ml: 1,
                    whiteSpace: "nowrap",
                    lineHeight: 1,
                  }}
                >
                  Incident AI
                </Typography>
              </Stack>
            </Link>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
