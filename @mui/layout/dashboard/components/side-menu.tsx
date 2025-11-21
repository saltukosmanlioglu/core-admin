"use client";

import Image from "next/image";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import OptionsMenu from "@/mui/components/options-menu";
import NestedList from "./nested-list";

const DRAWER_WIDTH = 240;
const MINI_DRAWER_WIDTH = 72;

export interface SideMenuProps {
  expanded: boolean;
}

// 🔧 no fixed width here; add width transitions instead
const Drawer = styled(MuiDrawer)(({ theme }) => ({
  flexShrink: 0,
  boxSizing: "border-box",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shorter,
  }),
  [`& .${drawerClasses.paper}`]: {
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    boxShadow: "2px 0 10px rgba(0,0,0,0.03)",
    border: "none",
    overflow: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

export default function SideMenu({ expanded }: SideMenuProps) {
  const mini = !expanded;
  const drawerWidth = mini ? MINI_DRAWER_WIDTH : DRAWER_WIDTH;

  return (
    <Drawer
      variant="permanent"
      sx={{
        bgcolor: "#fff",
        display: { xs: "none", md: "block" },
        width: drawerWidth,
        [`& .${drawerClasses.paper}`]: {
          width: drawerWidth,
          backgroundColor: "#fff",
        },
      }}
    >
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          pt: 1,
          mt: 7,
        }}
      >
        <NestedList mini={mini} />
      </Box>

      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          backgroundColor: "#fff",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.03)",
          justifyContent: mini ? "center" : "flex-start",
        }}
      >
        <Avatar
          sizes="small"
          alt="Mine Gurad"
          src="/app/favicon.ico"
          sx={{
            width: 36,
            height: 36,
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        />
        {!mini && (
          <Box sx={{ mr: "auto" }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                lineHeight: "16px",
              }}
            >
              Mine Guard
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              info@mgai.com
            </Typography>
          </Box>
        )}
        {!mini && <OptionsMenu />}
      </Stack>
    </Drawer>
  );
}
