import * as React from "react";
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
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
  {
    text: "Dashboard",
    href: "/dashboard",
    icon: <DashboardOutlinedIcon fontSize="inherit" />,
  },
  {
    text: "AI Performance",
    href: "/ai-performance",
    icon: <InsightsOutlinedIcon fontSize="inherit" />,
  },
  {
    text: "Tenant Summary",
    href: "/tenant-summary",
    icon: <ApartmentOutlinedIcon fontSize="inherit" />,
  },
  {
    text: "Human and Organisational Factors",
    href: "/human-and-organisational-factors",
    icon: <GroupsOutlinedIcon fontSize="inherit" />,
  },
  {
    text: "Investigation Quality",
    href: "/investigation-quality",
    icon: <FactCheckOutlinedIcon fontSize="inherit" />,
  },
  {
    text: "Organisational Learning Network",
    href: "/organisational-learning-network",
    icon: <HubOutlinedIcon fontSize="inherit" />,
  },
];

// base style generator: adds "active" variant
const getItemSx = (active: boolean) => ({
  mx: 1,
  my: 0.25,
  borderRadius: 2,
  transition: "background-color 0.15s ease, color 0.15s ease",
  "& .MuiListItemIcon-root": {
    fontSize: 20,
    color: active ? "#5b2fa3" : "#1f2933",
  },
  "& .MuiTypography-root": {
    fontSize: 14,
    fontWeight: 500,
    color: active ? "#5b2fa3" : "#111827",
  },
  backgroundColor: active ? "rgba(164,108,194,0.16)" : "transparent",
  "&:hover": {
    backgroundColor: "rgba(164,108,194,0.10)", // soft purple hover
    "& .MuiListItemIcon-root, & .MuiTypography-root": {
      color: "#6E3BB8",
    },
  },
});

export default function NestedList() {
  const [openMap, setOpenMap] = React.useState<Record<number, boolean>>({});
  const pathname = usePathname();

  const toggle = (i: number) =>
    setOpenMap((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        "& .MuiListItemIcon-root": { minWidth: 32 },
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{ bgcolor: "background.paper", pb: 1 }}
        >
          Operations
        </ListSubheader>
      }
    >
      {menuItems.map((m, i) => {
        const isGroup = "items" in m;

        // active logic for top-level items
        const isActive = !isGroup && pathname === m.href;

        if (!isGroup) {
          return (
            <ListItemButton
              key={i}
              href={m.href}
              sx={getItemSx(isActive)}
            >
              <ListItemIcon>
                {m.icon ?? <SendIcon fontSize="inherit" />}
              </ListItemIcon>
              <ListItemText sx={{ ml: 1 }} primary={m.text} />
            </ListItemButton>
          );
        }

        const open = !!openMap[i];

        // consider group active if any of its children matches
        const groupActive =
          m.items.some((sm) => pathname.startsWith(sm.href));

        return (
          <React.Fragment key={i}>
            <ListItemButton
              onClick={() => toggle(i)}
              sx={getItemSx(groupActive)}
            >
              <ListItemIcon>
                {m.icon ?? <InboxIcon fontSize="inherit" />}
              </ListItemIcon>
              <ListItemText sx={{ ml: 1 }} primary={m.text} />
              {open ? (
                <ExpandLess fontSize="inherit" />
              ) : (
                <ExpandMore fontSize="inherit" />
              )}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {m.items.map((sm, si) => {
                  const childActive = pathname === sm.href;
                  return (
                    <ListItemButton
                      key={si}
                      href={sm.href}
                      sx={{ ...getItemSx(childActive), pl: 4 }}
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
          </React.Fragment>
        );
      })}
    </List>
  );
}
