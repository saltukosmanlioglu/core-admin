"use client"

import { DashboardLayout } from '@/mui/layout/dashboard';

import { layoutProps } from './constants';

export default function RootCauseAnalysis() {
  return (
    <DashboardLayout {...layoutProps}>
      <p>Root Cause Analysis</p>
    </DashboardLayout>
  );
}