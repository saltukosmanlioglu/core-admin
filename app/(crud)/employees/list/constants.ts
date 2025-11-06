import { DashboardLayoutProps } from "@/mui/layout/dashboard";

export const layoutProps: Omit<DashboardLayoutProps, 'children'> = {
  breadcrumbItems: [{ text: 'Employees', }],
  buttons: [
    { onClick: () => { console.log('sa') } },
  ],
  title: 'Employee List'
}