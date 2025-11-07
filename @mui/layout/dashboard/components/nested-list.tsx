import * as React from "react";
import {
  List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Collapse
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

type MenuItem =
  | { text: string; href: string; icon?: React.ReactNode }
  | { text: string; items: { text: string; href: string; icon?: React.ReactNode }[]; icon?: React.ReactNode };

const menuItems: MenuItem[] = [
  { text: "Dashboard", href: "/dashboard", icon: <SendIcon fontSize="inherit" /> },
  {
    text: "Departments",
    icon: <InboxIcon fontSize="inherit" />,
    items: [
      { text: "Departments List", href: "/department/list" },
      { text: "Create Department", href: "/department/create" },
    ],
  },
  {
    text: "Employees",
    icon: <InboxIcon fontSize="inherit" />,
    items: [
      { text: "Employees List", href: "/employee/list" },
      { text: "Create Employee", href: "/employee/create" },
    ],
  },
];

export default function NestedList() {
  const [openMap, setOpenMap] = React.useState<Record<number, boolean>>({});

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
        <ListSubheader component="div" id="nested-list-subheader">
          Operations
        </ListSubheader>
      }
    >
      {menuItems.map((m, i) => {
        const isGroup = "items" in m;
        if (!isGroup) {
          return (
            <ListItemButton key={i} href={m.href}>
              <ListItemIcon>{m.icon ?? <SendIcon fontSize="inherit" />}</ListItemIcon>
              <ListItemText sx={{ ml: 1 }} primary={m.text} />
            </ListItemButton>
          );
        }

        const open = !!openMap[i];
        return (
          <React.Fragment key={i}>
            <ListItemButton onClick={() => toggle(i)}>
              <ListItemIcon>{m.icon ?? <InboxIcon fontSize="inherit" />}</ListItemIcon>
              <ListItemText sx={{ ml: 1 }} primary={m.text} />
              {open ? <ExpandLess fontSize="inherit" /> : <ExpandMore fontSize="inherit" />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {m.items.map((sm, si) => (
                  <ListItemButton key={si} href={sm.href} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      {sm.icon ?? <StarBorder fontSize="inherit" />}
                    </ListItemIcon>
                    <ListItemText sx={{ ml: 1 }} primary={sm.text} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        );
      })}
    </List>
  );
}
