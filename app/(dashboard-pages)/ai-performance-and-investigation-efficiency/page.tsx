"use client"

import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";

import { DashboardLayout } from '@/mui/layout/dashboard';

import { layoutProps } from './constants';
import {
  AIOutputAcceptanceRate,
  AverageTimeSavedPerCase,
  ReportsGeneratedByAI,
  TotalHumanReviewEdits
} from "./widgets/kpi";
import {
  AIConfidenceVsHumanEdits,
  AIOutputAcceptanceRateByInvestigator,
  AIVsHumanInvestigationTimeChart,
  TopKeywordsInAIFindings
} from './widgets';

export default function AIPerformanceAndInvestigationEfficiency() {
  return (
    <DashboardLayout {...layoutProps}>
      <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
        <Grid container spacing={2} columns={12} sx={{ mb: 2 }}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <ReportsGeneratedByAI />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <AIOutputAcceptanceRate />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <AverageTimeSavedPerCase />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TotalHumanReviewEdits />
          </Grid>
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Analysis
      </Typography>
      <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <AIVsHumanInvestigationTimeChart />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <AIOutputAcceptanceRateByInvestigator />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <AIConfidenceVsHumanEdits />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TopKeywordsInAIFindings />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
