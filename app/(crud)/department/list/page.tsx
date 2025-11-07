"use client"

import { DashboardLayout } from '@/mui/layout/dashboard';

import { layoutProps } from './constants';

export default function DepartmentList() {
  return (
    <DashboardLayout {...layoutProps}>
      <div>Department</div>
    </DashboardLayout>
  );
}
