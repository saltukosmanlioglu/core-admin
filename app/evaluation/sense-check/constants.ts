import { DashboardLayoutProps } from "@/mui/layout/dashboard";

export const layoutProps: Omit<DashboardLayoutProps, 'children'> = {
  breadcrumbItems: [{
    text: 'Sense Check',
  }],
  buttons: [
    { onClick: () => { console.log('sa') } },
  ],
  title: 'Sense Check'
}