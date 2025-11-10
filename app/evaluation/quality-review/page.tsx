"use client"

import { DashboardLayout } from '@/mui/layout/dashboard';

import { layoutProps } from './constants';

export default function QualityReview() {
  return (
    <DashboardLayout {...layoutProps}>
      <p>Quality Review</p>
    </DashboardLayout>
  );
}