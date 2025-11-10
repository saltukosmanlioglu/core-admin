import { DashboardLayoutProps } from "@/mui/layout/dashboard";

export const layoutProps: Omit<DashboardLayoutProps, 'children'> = {
  breadcrumbItems: [{
    text: 'Detailed',
  }],
  buttons: [
    { onClick: () => { console.log('sa') } },
  ],
  title: 'Detailed'
}