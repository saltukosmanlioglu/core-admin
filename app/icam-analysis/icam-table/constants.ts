import { DashboardLayoutProps } from "@/mui/layout/dashboard";

export const layoutProps: Omit<DashboardLayoutProps, 'children'> = {
  breadcrumbItems: [{
    text: 'ICAM Table',
  }],
  buttons: [
    { onClick: () => { console.log('sa') } },
  ],
  title: 'ICAM Table'
}