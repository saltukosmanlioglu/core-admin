import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import OptionsMenu from '../../../components/options-menu';
import NestedList from './nested-list';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  return (
    <Drawer variant="permanent" sx={{ display: { xs: 'none', md: 'block' }, [`& .${drawerClasses.paper}`]: { backgroundColor: 'background.paper' } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 'calc(var(--template-frame-height, 0px) + 4px)', p: 1.5 }}>
        <Card variant="outlined" sx={{ display: 'flex', gap: '8px', flexGrow: 1 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <Image
              alt='Incident AI Logo'
              className='rounded-full'
              height={50}
              src="/incident_AI_logo.svg"
              width={50}
            />
            <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 20, ml: 2 }} >
              Incident AI
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Divider />
      <Box sx={{ overflow: 'auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <NestedList />
      </Box>
      <Stack direction="row" sx={{ p: 2, gap: 1, alignItems: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
        <Avatar
          sizes="small"
          alt="Mine Gurad"
          src="/app/favicon.ico"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            Mine Guard
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            info@mgai.com
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer >
  );
}
