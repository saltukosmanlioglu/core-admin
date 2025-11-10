import { DashboardLayoutProps } from "@/mui/layout/dashboard";

export const layoutProps: Omit<DashboardLayoutProps, 'children'> = {
  breadcrumbItems: [{
    text: 'Quality Review',
  }],
  buttons: [
    { onClick: () => { console.log('sa') } },
  ],
  title: 'Quality Review'
}