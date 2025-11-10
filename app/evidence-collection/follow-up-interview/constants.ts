import { DashboardLayoutProps } from "@/mui/layout/dashboard";

export const layoutProps: Omit<DashboardLayoutProps, 'children'> = {
  breadcrumbItems: [{
    text: 'Follow-Up Interview',
  }],
  buttons: [
    { onClick: () => { console.log('sa') } },
  ],
  title: 'Follow-Up Interview'
}