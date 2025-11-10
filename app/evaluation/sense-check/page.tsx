"use client"

import { DashboardLayout } from '@/mui/layout/dashboard';

import { layoutProps } from './constants';

export default function SenseCheck() {
  return (
    <DashboardLayout {...layoutProps}>
      <p>Sense Check</p>
    </DashboardLayout>
  );
}