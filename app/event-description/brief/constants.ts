import { DashboardLayoutProps } from "@/mui/layout/dashboard";

export const layoutProps: Omit<DashboardLayoutProps, 'children'> = {
  breadcrumbItems: [{
    text: 'Brief',
  }],
  buttons: [
    { onClick: () => { console.log('sa') } },
  ],
  title: 'Brief'
}