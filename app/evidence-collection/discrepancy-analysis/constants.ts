import { DashboardLayoutProps } from "@/mui/layout/dashboard";

export const layoutProps: Omit<DashboardLayoutProps, 'children'> = {
  breadcrumbItems: [{
    text: 'Discrepancy Analysis',
  }],
  buttons: [
    { onClick: () => { console.log('sa') } },
  ],
  title: 'Discrepancy Analysis'
}