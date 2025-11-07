"use client"

import { DashboardLayout } from '@/mui/layout/dashboard';

import { listPageLayoutProps } from '../constants';

export default function EmployeeList() {
  return (
    <DashboardLayout {...listPageLayoutProps}>
      <div>Employees</div>
    </DashboardLayout>
  );
}
