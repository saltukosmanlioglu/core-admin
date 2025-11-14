"use client"

import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";

import { DashboardLayout } from '@/mui/layout/dashboard';
import { AIPerformanceBaseParamsProps } from '@/services/dashboard/base';
import { AIVsHumanEditsProps, getAIVsHumanEdits } from '@/services/dashboard/ai-performance/ai-vs-human-edits';
import { InvestigationTimeProps, getInvestigationTime } from '@/services/dashboard/ai-performance/investigation-time';
import { DepartmentProps, getDepartments } from '@/services/dashboard/departments';
import { getInvestigators, InvestigatorProps } from '@/services/dashboard/investigators';
import { getKPIs, KPIProps } from '@/services/dashboard/ai-performance/KPIs';
import { getTopKeywords, TopKeywordsProps } from '@/services/dashboard/ai-performance/top-keywords';

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
  TopKeywords
} from './widgets';

export default function AIPerformance() {
  const [filter, setFilter] = useState<AIPerformanceBaseParamsProps>({});
  const [investigators, setInvestigators] = useState<Array<InvestigatorProps>>([
    { name: 'Dr. Eleanor Matthews' },
    { name: 'Dr. Sarah Connor' },
    { name: 'James Wilson' },
  ])
  const [departments, setDepartments] = useState<Array<DepartmentProps>>([
    { name: 'Data Science' },
    { name: 'Forensics' },
    { name: 'AI Analysis' },
  ])
  const [KPI, setKPI] = useState<KPIProps>({
    aiOutputAcceptanceRate: 92,
    reportsGeneratedByAI: 1250,
    averageTimeSavedPerCase: 45,
    totalHumanReviewEdits: 315,
  });
  const [investigationTime, setInvestigationTime] = useState<Array<InvestigationTimeProps>>([
    { month: "Jan", aiValue: 91, humanValue: 190 },
    { month: "Feb", aiValue: 276, humanValue: 222 },
    { month: "Mar", aiValue: 150, humanValue: 275 },
    { month: "Apr", aiValue: 277, humanValue: 297 },
    { month: "May", aiValue: 133, humanValue: 126 },
    { month: "Jun", aiValue: 192, humanValue: 241 },
    { month: "Jul", aiValue: 282, humanValue: 284 },
    { month: "Aug", aiValue: 208, humanValue: 208 },
    { month: "Sep", aiValue: 186, humanValue: 233 },
    { month: "Oct", aiValue: 258, humanValue: 265 },
    { month: "Nov", aiValue: 239, humanValue: 172 },
    { month: "Dec", aiValue: 225, humanValue: 289 }
  ]
  );
  const [points, setPoints] = useState<AIVsHumanEditsProps>([
    [2, 9.5], [3, 8.8], [5, 7.2], [6, 9.9], [8, 6.4], [9, 7.6], [10, 5.1],
    [11, 6.9], [12, 4.8], [13, 3.9], [14, 4.2], [15, 3.7], [16, 4.0],
    [17, 2.8], [18, 3.1], [19, 2.5], [20, 2.2], [21, 3.3], [22, 2.9],
    [23, 1.8], [24, 2.7], [25, 2.6], [26, 3.0], [27, 2.4], [28, 1.6],
    [29, 3.2], [30, 2.0], [31, 1.4], [12, 9.1], [18, 8.3], [22, 7.0],
    [26, 6.8], [28, 5.5], [30, 4.7], [7, 3.1], [9, 2.2], [11, 3.6],
    [13, 3.0], [15, 2.9], [17, 2.6], [19, 2.8], [21, 2.3], [23, 2.1],
    [25, 1.9], [27, 2.7], [29, 2.0], [31, 1.7], [33, 2.9], [35, 2.6],
    [37, 2.4], [39, 2.2], [41, 1.9], [43, 1.6], [45, 1.8], [18, 10.0],
    [34, 3.1], [38, 2.8], [42, 2.5], [46, 2.2],
  ]);
  const [topKeywords, setTopKeywords] = useState<Array<TopKeywordsProps>>([
    { name: "training", value: 45 },
    { name: "supervision", value: 60 },
    { name: "communication", value: 35 },
    { name: "fatigue", value: 65 },
    { name: "procedure", value: 55 },
    { name: "equipment", value: 42 },
    { name: "Jones", value: 25 },
    { name: "sustsorio", value: 50 },
    { name: "safety", value: 40 },
    { name: "data", value: 30 },
    { name: "report", value: 38 },
    { name: "monitoring", value: 48 },
    { name: "automation", value: 33 },
    { name: "inspection", value: 44 },
    { name: "compliance", value: 37 },
    { name: "oversight", value: 52 },
    { name: "maintenance", value: 43 },
    { name: "logging", value: 28 },
    { name: "analysis", value: 50 },
    { name: "workflow", value: 34 },
    { name: "alert", value: 32 },
    { name: "incident", value: 39 },
    { name: "review", value: 41 },
    { name: "validation", value: 29 },
    { name: "feedback", value: 36 },
    { name: "detection", value: 47 },
    { name: "integration", value: 31 },
    { name: "adjustment", value: 27 },
    { name: "modeling", value: 33 },
    { name: "execution", value: 35 },
    { name: "assessment", value: 46 },
    { name: "evaluation", value: 49 },
    { name: "response", value: 40 },
    { name: "alerting", value: 28 },
    { name: "prediction", value: 53 },
    { name: "error", value: 30 },
    { name: "alert", value: 37 },
    { name: "control", value: 44 },
    { name: "support", value: 42 },
    { name: "accuracy", value: 55 },
    { name: "review", value: 33 },
    { name: "operation", value: 39 },
    { name: "classification", value: 50 }
  ]);

  useEffect(() => {
    filter && getKPIs(filter)
      .then((data) => setKPI(data))
      .catch((e) => console.log(e))

    getInvestigationTime(filter)
      .then((data) => setInvestigationTime([data]))
      .catch((e) => console.log(e))

    getAIVsHumanEdits(filter)
      .then((data) => setPoints(data))
      .catch((e) => console.log(e))

    getTopKeywords(filter)
      .then((data) => setTopKeywords([data]))
      .catch((e) => console.log(e))
  }, [filter]);

  useEffect(() => {
    getInvestigators()
      .then((data) => setInvestigators([data]))
      .catch((e) => console.log(e))

    getDepartments()
      .then((data) => setDepartments([data]))
      .catch((e) => console.log(e))
  }, [])

  return (
    <DashboardLayout {...layoutProps(filter, setFilter, departments, investigators)}>
      <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2), width: '100%' }}>
        {KPI && (
          <Grid container spacing={2} columns={12} sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
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
        )}
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
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
          <TopKeywords data={topKeywords} />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
