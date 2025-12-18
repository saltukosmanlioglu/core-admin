"use client"

import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';

import { DashboardLayout } from '@/mui/layout/dashboard';
import { WordCloud } from '@/components/word-cloud';
import { AIPerformanceBaseParamsProps } from '@/services/dashboard/base';
import { getAIVsHumanEdits, GetAIVsHumanEditsResponse } from '@/services/dashboard/ai-performance/ai-vs-human-edits';
import { GetInvestigationTimeResponse, getInvestigationTime } from '@/services/dashboard/ai-performance/investigation-time';
import { GetDepartmentResponse, getDepartments } from '@/services/dashboard/department';
import { GetInvestigatorResponse, getInvestigators } from '@/services/dashboard/investigator';
import { getKPIs, GetKPIResponse } from '@/services/dashboard/ai-performance/KPIs';
import { getTopKeywords, GetTopKeywordsResponse } from '@/services/dashboard/ai-performance/top-keywords';

import { layoutProps } from './constants';
import {
  AIOutputAcceptanceRate,
  AverageTimeSavedPerCase,
  ReportsGeneratedByAI,
  TotalHumanReviewEdits
} from "./widgets/kpi";
import {
  AIVsHumanEdits,
  AcceptanceRateByInvestigators,
  InvestigationTime,
} from './widgets';

export default function AIPerformance() {
  const [filter, setFilter] = useState<AIPerformanceBaseParamsProps>({});

  const [investigators, setInvestigators] = useState<GetInvestigatorResponse>([])
  const [departments, setDepartments] = useState<GetDepartmentResponse>([])

  const [KPI, setKPI] = useState<GetKPIResponse>();
  const [investigationTime, setInvestigationTime] = useState<GetInvestigationTimeResponse>([]);
  const [points, setPoints] = useState<GetAIVsHumanEditsResponse>([]);
  const [topKeywords, setTopKeywords] = useState<GetTopKeywordsResponse>([]);

  useEffect(() => {
    if (!filter) return;

    const timer = setTimeout(() => {
      getKPIs(filter)
        .then((res) => setKPI(res))
        .catch((e) => console.log(e));

      getInvestigationTime(filter)
        .then((res) => setInvestigationTime(res))
        .catch((e) => console.log(e));

      getAIVsHumanEdits(filter)
        .then((res) => setPoints(res))
        .catch((e) => console.log(e));

      getTopKeywords(filter)
        .then((res) => setTopKeywords(res))
        .catch((e) => console.log(e));
    }, 2000);

    return () => clearTimeout(timer);
  }, [filter]);

  useEffect(() => {
    getInvestigators()
      .then((res) => setInvestigators(res))
      .catch((e) => console.log(e))

    getDepartments()
      .then((res) => setDepartments(res))
      .catch((e) => console.log(e))
  }, [])

  return (
    <DashboardLayout {...layoutProps(filter, setFilter, departments, investigators)}>
      <Grid container spacing={2} columns={12} sx={{ mb: 2, width: '100%' }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3, }} sx={{ width: '100%' }}>
          <ReportsGeneratedByAI data={KPI} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <AIOutputAcceptanceRate data={KPI} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <AverageTimeSavedPerCase data={KPI} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <TotalHumanReviewEdits data={KPI} />
        </Grid>
      </Grid>

      <Typography component="h1" variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Investigation Efficiency
      </Typography>

      <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InvestigationTime data={investigationTime} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <AcceptanceRateByInvestigators />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <AIVsHumanEdits data={points} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <WordCloud title="Top Keywords in AI Findings" data={topKeywords} />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
