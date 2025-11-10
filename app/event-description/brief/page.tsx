"use client"

import { DashboardLayout } from '@/mui/layout/dashboard';

import { layoutProps } from './constants';

export default function Brief() {
  return (
    <DashboardLayout {...layoutProps}>
      <p>Brief</p>
    </DashboardLayout>
  );
}