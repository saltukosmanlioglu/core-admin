"use client"

import Stepper from '@/mui/widgets/stepper/stepper';
import { DashboardLayout } from '@/mui/layout/dashboard';

import CircleIcon from "@mui/icons-material/Circle";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LabelIcon from "@mui/icons-material/Label";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from '@mui/icons-material/Settings';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';

import { layoutProps } from './constants';

export default function TimelineAnd5Whys() {
  const icons: { [index: string]: React.ReactElement<unknown> } = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
    4: <ExpandMoreIcon />,
    5: <CircleIcon />,
    6: <SearchIcon />,
    7: <LabelIcon />,
    8: <ExpandLessIcon />,
    9: <VideoLabelIcon />,
  };

  return (
    <DashboardLayout {...layoutProps}>
      <Stepper />
    </DashboardLayout>
  );
}