"use client"

import { DashboardLayout } from '@/mui/layout/dashboard';

import { updatePageLayoutProps } from '../constants';


export default function EmployeeList() {
  return (
    <DashboardLayout {...updatePageLayoutProps}>
      <div>Update Employee</div>
    </DashboardLayout>
  );
}
