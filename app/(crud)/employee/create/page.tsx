"use client"

import { DashboardLayout } from '@/mui/layout/dashboard';

import { createPageLayoutProps } from '../constants';


export default function EmployeeList() {
  return (
    <DashboardLayout {...createPageLayoutProps}>
      <div>Create Employee</div>
    </DashboardLayout>
  );
}
