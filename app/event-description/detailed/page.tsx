"use client"

import { DashboardLayout } from '@/mui/layout/dashboard';

import { layoutProps } from './constants';

export default function Detailed() {
  return (
    <DashboardLayout {...layoutProps}>
      <p>Detailed</p>
    </DashboardLayout>
  );
}