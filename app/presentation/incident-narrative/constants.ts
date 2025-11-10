import { DashboardLayoutProps } from "@/mui/layout/dashboard";

export const layoutProps: Omit<DashboardLayoutProps, 'children'> = {
  breadcrumbItems: [{
    text: 'Incident Narrative',
  }],
  buttons: [
    { onClick: () => { console.log('sa') } },
  ],
  title: 'Incident Narrative'
}