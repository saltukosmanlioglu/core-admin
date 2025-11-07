import { DashboardLayoutProps } from "@/mui/layout/dashboard";

export const layoutProps: Omit<DashboardLayoutProps, 'children'> = {
  breadcrumbItems: [{ text: 'Departments' }],
  title: 'Department List'
}