"use client"

import { DashboardLayout } from '@/mui/layout/dashboard';

import { layoutProps } from './constants';

export default function ICAMTable() {
  return (
    <DashboardLayout {...layoutProps}>
      <p>ICAM Table</p>
    </DashboardLayout>
  );
}