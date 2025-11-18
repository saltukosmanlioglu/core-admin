import * as React from "react";
import {
  List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Collapse
} from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SendIcon from "@mui/icons-material/Send";
import StarBorder from "@mui/icons-material/StarBorder";

import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import ChecklistRtlOutlinedIcon from '@mui/icons-material/ChecklistRtlOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import PsychologyIcon from "@mui/icons-material/Psychology";
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';


type MenuItem =
  | { text: string; href: string; icon?: React.ReactNode }
  | { text: string; items: { text: string; href: string; icon?: React.ReactNode }[]; icon?: React.ReactNode };

const menuItems: MenuItem[] = [
  {
    text: "Dashboard",
    href: "/dashboard",
    icon: <DashboardOutlinedIcon fontSize="inherit" />,
  },
  {
    text: "AI Performance",
    href: "/ai-performance",
    icon: <PsychologyIcon fontSize="inherit" />,
  },
  {
    text: "Tenant Summary",
    href: "/tenant-summary",
    icon: <PsychologyIcon fontSize="inherit" />,
  },
  {
    text: "Human and Organisitional Factory",
    href: "/human-and-organisitional-factors",
    icon: <PsychologyIcon fontSize="inherit" />,
  },
  {
    text: "Event Description",
    icon: <DescriptionOutlinedIcon fontSize="inherit" />,
    items: [
      { text: "Brief", href: "/event-description/brief", icon: <SummarizeOutlinedIcon fontSize="inherit" /> },
      { text: "Detailed", href: "/event-description/detailed", icon: <DescriptionOutlinedIcon fontSize="inherit" /> },
    ],
  },
  {
    text: "Evidence Collection",
    icon: <Inventory2OutlinedIcon fontSize="inherit" />,
    items: [
      { text: "Discrepancy Analysis", href: "/evidence-collection/discrepancy-analysis", icon: <DifferenceOutlinedIcon fontSize="inherit" /> },
      { text: "Follow-up Interview", href: "/evidence-collection/follow-up-interview", icon: <RecordVoiceOverOutlinedIcon fontSize="inherit" /> },
      { text: "PEEPO Builder", href: "/evidence-collection/peepo-builder", icon: <BuildCircleOutlinedIcon fontSize="inherit" /> },
    ],
  },
  {
    text: "ICAM Analysis",
    icon: <AccountTreeOutlinedIcon fontSize="inherit" />,
    items: [
      { text: "Timeline and 5 Whys", href: "/icam-analysis/timeline-and-5-whys", icon: <TimelineOutlinedIcon fontSize="inherit" /> },
      { text: "ICAM Table", href: "/icam-analysis/icam-table", icon: <TableChartOutlinedIcon fontSize="inherit" /> },
      { text: "Contributing Factors", href: "/icam-analysis/contributing-factors", icon: <InsightsOutlinedIcon fontSize="inherit" /> },
      { text: "Root Cause Analysis", href: "/icam-analysis/root-cause-analysis", icon: <PsychologyAltOutlinedIcon fontSize="inherit" /> },
      { text: "Organisational Learnings", href: "/icam-analysis/organisational-learnings", icon: <EmojiObjectsOutlinedIcon fontSize="inherit" /> },
    ],
  },
  {
    text: "Evaluation",
    icon: <FactCheckOutlinedIcon fontSize="inherit" />,
    items: [
      { text: "Quality Review", href: "/evaluation/quality-review", icon: <ChecklistRtlOutlinedIcon fontSize="inherit" /> },
      { text: "Sense Check", href: "/evaluation/sense-check", icon: <TaskAltOutlinedIcon fontSize="inherit" /> },
    ],
  },
  {
    text: "Presentation",
    icon: <SlideshowOutlinedIcon fontSize="inherit" />,
    items: [
      { text: "Incident Narrative", href: "/presentation/incident-narrative", icon: <ArticleOutlinedIcon fontSize="inherit" /> },
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
