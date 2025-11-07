import { DashboardLayoutProps } from "@/mui/layout/dashboard";

export const listPageLayoutProps: Omit<DashboardLayoutProps, 'children'> = {
  breadcrumbItems: [{ text: 'Employees', }],
  buttons: [
    { onClick: () => { console.log('sa') } },
  ],
  title: 'Employee List'
}

export const createPageLayoutProps: Omit<DashboardLayoutProps, 'children'> = {
  breadcrumbItems: [{ href: '/employee/list', text: 'Employees', }, { text: 'Create Employee' }],
  buttons: [
    { onClick: () => { console.log('sa') } },
  ],
  title: 'Create Employee'
}

export const updatePageLayoutProps: Omit<DashboardLayoutProps, 'children'> = {
  breadcrumbItems: [{ href: '/employee/list', text: 'Employees', }, { text: 'Update Employee' }],
  buttons: [
    { onClick: () => { console.log('sa') } },
  ],
  title: 'Update Employee'
}