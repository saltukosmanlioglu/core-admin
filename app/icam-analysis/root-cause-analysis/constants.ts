import { DashboardLayoutProps } from "@/mui/layout/dashboard";

export const layoutProps: Omit<DashboardLayoutProps, 'children'> = {
  breadcrumbItems: [{
    text: 'Root Cause Analysis',
  }],
  buttons: [
    { onClick: () => { console.log('sa') } },
  ],
  title: 'Root Cause Analysis'
}