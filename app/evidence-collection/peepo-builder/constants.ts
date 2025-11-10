import { DashboardLayoutProps } from "@/mui/layout/dashboard";

export const layoutProps: Omit<DashboardLayoutProps, 'children'> = {
  breadcrumbItems: [{
    text: 'PEEPO Builder',
  }],
  buttons: [
    { onClick: () => { console.log('sa') } },
  ],
  title: 'PEEPO Builder'
}