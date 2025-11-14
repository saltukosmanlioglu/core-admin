"use client"

import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AppNavbar from '@mui/components/app-navbar';
import AppTheme from '@mui/theme/app-theme';
import Copyright from '@/mui/layout/components/copyright';
import SideMenu from '@/mui/layout/dashboard/components/side-menu';

import { Header } from './components/header';
import type { DashboardLayoutProps } from "./types";

export default function DashboardLayout({
  breadcrumbItems,
  buttons,
  children,
  title
}: DashboardLayoutProps) {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box component="main" sx={(theme) => ({ flexGrow: 1, backgroundColor: theme.vars ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)` : alpha(theme.palette.background.default, 1), overflow: 'auto', })}>
          <Stack spacing={2} sx={{ alignItems: 'center', mx: 3, pb: 5, mt: { xs: 8, md: 0 } }}>
            <Header breadcrumbItems={breadcrumbItems} buttons={buttons} />
            <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
              {title && <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                {title}
              </Typography>}
              <Paper elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "#0d1117",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                {children}
              </Paper>
              <Copyright sx={{ my: 4 }} />
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
