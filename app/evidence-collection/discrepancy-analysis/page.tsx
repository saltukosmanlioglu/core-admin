"use client"

import { DashboardLayout } from '@/mui/layout/dashboard';

import { layoutProps } from './constants';

export default function DiscrepancyAnalysis() {
  return (
    <DashboardLayout {...layoutProps}>
      <p>Discrepancy Analysis</p>
    </DashboardLayout>
  );
}