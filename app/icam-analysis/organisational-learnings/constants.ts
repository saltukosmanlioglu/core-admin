import { DashboardLayoutProps } from "@/mui/layout/dashboard";

export const layoutProps: Omit<DashboardLayoutProps, 'children'> = {
  breadcrumbItems: [{
    text: 'Organisational Learnings',
  }],
  buttons: [
    { onClick: () => { console.log('sa') } },
  ],
  title: 'Organisational Learnings'
}