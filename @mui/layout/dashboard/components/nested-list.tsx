"use client";

import * as React from "react";
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
} from "@mui/material";
import { usePathname } from "next/navigation";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SendIcon from "@mui/icons-material/Send";
import StarBorder from "@mui/icons-material/StarBorder";

import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";

type MenuItem =
  | { text: string; href: string; icon?: React.ReactNode }
  | {
      text: string;
      items: { text: string; href: string; icon?: React.ReactNode }[];
      icon?: React.ReactNode;
    };

const menuItems: MenuItem[] = [
  { text: "Dashboard", href: "/dashboard", icon: <DashboardOutlinedIcon fontSize="inherit" /> },
  { text: "AI Performance", href: "/ai-performance", icon: <InsightsOutlinedIcon fontSize="inherit" /> },
  { text: "Tenant Summary", href: "/tenant-summary", icon: <ApartmentOutlinedIcon fontSize="inherit" /> },
  { text: "Human and Organisational Factory", href: "/human-and-organisational-factors", icon: <GroupsOutlinedIcon fontSize="inherit" /> },
  { text: "Investigation Quality", href: "/investigation-quality", icon: <FactCheckOutlinedIcon fontSize="inherit" /> },
  { text: "Organisational Learning Network", href: "/organisational-learning-network", icon: <HubOutlinedIcon fontSize="inherit" /> },
];

const getItemSx = (active: boolean, mini: boolean) => ({
  mx: mini ? 0.5 : 1,
  my: 0.25,
  borderRadius: 2,
  justifyContent: mini ? "center" : "flex-start",
  transition: "background-color 0.15s ease, color 0.15s ease",
  "& .MuiListItemIcon-root": {
    fontSize: 20,
    color: active ? "#5b2fa3" : "#1f2933",
    minWidth: mini ? 0 : 32,
  },
  "& .MuiTypography-root": {
    fontSize: 14,
    fontWeight: 500,
    color: active ? "#5b2fa3" : "#111827",
  },
  backgroundColor: active ? "rgba(164,108,194,0.16)" : "transparent",
  "&:hover": {
    backgroundColor: "rgba(164,108,194,0.10)",
    "& .MuiListItemIcon-root, & .MuiTypography-root": {
      color: "#6E3BB8",
    },
  },
});

export interface NestedListProps {
  mini?: boolean;
}

export default function NestedList({ mini = false }: NestedListProps) {
  const [openMap, setOpenMap] = React.useState<Record<number, boolean>>({});
  const pathname = usePathname();

  const toggle = (i: number) =>
    setOpenMap((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: mini ? 72 : 360,
        bgcolor: "background.paper",
        "& .MuiListItemIcon-root": { minWidth: mini ? 0 : 32 },
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        !mini && (
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ fontWeight: 700 }}
          >
            Operations
          </ListSubheader>
        )
      }
    >
      {menuItems.map((m, i) => {
        const isGroup = "items" in m;
        const isActive = !isGroup && pathname === m.href;

        if (!isGroup) {
          const btn = (
            <ListItemButton
              key={i}
              href={m.href}
              sx={getItemSx(isActive, mini)}
            >
              <ListItemIcon>{m.icon ?? <SendIcon fontSize="inherit" />}</ListItemIcon>
              {!mini && (
                <ListItemText sx={{ ml: 1 }} primary={m.text} />
              )}
            </ListItemButton>
          );

          return mini ? (
            <Tooltip key={i} title={m.text} placement="right">
              {btn}
            </Tooltip>
          ) : (
            btn
          );
        }

        const open = !!openMap[i];
        const groupActive = m.items.some((sm) => pathname.startsWith(sm.href));

        const groupBtn = (
          <ListItemButton
            onClick={() => toggle(i)}
            sx={getItemSx(groupActive, mini)}
          >
            <ListItemIcon>{m.icon ?? <InboxIcon fontSize="inherit" />}</ListItemIcon>
            {!mini && (
              <>
                <ListItemText sx={{ ml: 1 }} primary={m.text} />
                {open ? <ExpandLess fontSize="inherit" /> : <ExpandMore fontSize="inherit" />}
              </>
            )}
          </ListItemButton>
        );

        return (
          <React.Fragment key={i}>
            {mini ? (
              <Tooltip title={m.text} placement="right">
                {groupBtn}
              </Tooltip>
            ) : (
              groupBtn
            )}

            {!mini && (
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {m.items.map((sm, si) => {
                    const childActive = pathname === sm.href;
                    return (
                      <ListItemButton
                        key={si}
                        href={sm.href}
                        sx={{ ...getItemSx(childActive, mini), pl: 4 }}
                      >
                        <ListItemIcon>
                          {sm.icon ?? <StarBorder fontSize="inherit" />}
                        </ListItemIcon>
                        <ListItemText sx={{ ml: 1 }} primary={sm.text} />
                      </ListItemButton>
                    );
                  })}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
}
