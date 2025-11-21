"use client"

import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';

import { DashboardLayout } from '@/mui/layout/dashboard';
import StatusCard, { StatusCardProps } from '@/components/status-card';
import { getCategories, GetCategoryResponse } from '@/services/dashboard/category';
import { GetKPIResponse, getKPIs } from '@/services/dashboard/investigation-quality/KPIs';
import { GetMineSiteResponse, getMineSites } from '@/services/dashboard/mine-site';
import { InvestigationQualityBaseParamsProps } from '@/services/dashboard/base';

import { layoutProps } from './constants';
import {
  AverageQualityScore,
  HighQualityInvestigations,
  MostFrequentImprovedTheme,
  NumerOfInvestigationsReviewed
} from './widgets/kpi';
import {
  InvestigationQualityByCategory,
  InvestigationQualityScoreBar
} from './widgets';

export default function InvestigationQuality() {
  const [filter, setFilter] = useState<InvestigationQualityBaseParamsProps>({});

  const [mineSites, setMineSites] = useState<GetMineSiteResponse>([]);
  const [categories, setCategories] = useState<GetCategoryResponse>([])

  const [KPI, setKPI] = useState<GetKPIResponse>();

  const statusCards: StatusCardProps[] = [
    { title: "Investigation Team", progress: 65, status: "good" },
    { title: "Data Collection", progress: 45, status: "fair" },
    { title: "Data Collection", progress: 35, status: "fair" },
    { title: "Root Cause Analysis", progress: 30, status: "needs_improvement" },
    { title: "Root Cause Engineering", progress: 55, status: "good" },
    { title: "Report Quality", progress: 40, status: "needs_improvement" },
  ];

  useEffect(() => {
    filter && getKPIs(filter)
      .then((res) => setKPI(res))
      .catch((e) => console.log(e))
  }, [filter])

  useEffect(() => {
    getMineSites()
      .then((res) => setMineSites(res))
      .catch((e) => console.log(e))

    getCategories()
      .then((res) => setCategories(res))
      .catch((e) => console.log(e))
  }, [])

  return (
    <DashboardLayout {...layoutProps(filter, setFilter, mineSites, categories)}>
      <Box>
        <InvestigationQualityScoreBar score={82} />
      </Box>
      <Box>
        {KPI && (
          <Grid container spacing={2} columns={12} sx={{ mb: 2, width: '100%' }}>
            <Grid size={{ xs: 12, sm: 6, lg: 3, }} sx={{ width: '100%' }}>
              <AverageQualityScore data={KPI} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <NumerOfInvestigationsReviewed data={KPI} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <HighQualityInvestigations data={KPI} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <MostFrequentImprovedTheme />
            </Grid>
          </Grid>
        )}

        <Grid
          container
          spacing={2}
          columns={12}
          sx={{ mb: (theme) => theme.spacing(2), width: "100%" }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container spacing={2} columns={12}>
              {statusCards.map((item, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 6 }}>
                  <StatusCard
                    title={item.title}
                    progress={item.progress}
                    status={item.status}
                    onViewDetails={() => console.log("View details:", item.title)}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <InvestigationQualityByCategory
              data={[
                { category: "Incident Screening", value: 65 },
                { category: "Test Case Analysis", value: 72 },
                { category: "Bias Control", value: 80 },
                { category: "Root Cause Analysis", value: 68 },
                { category: "Report Quality", value: 74 },
                { category: "Technical Engineering", value: 58 },
                { category: "Fit for Work", value: 62 },
                { category: "Investigation Team", value: 70 },
              ]}
            />
          </Grid>
        </Grid>

      </Box>
    </DashboardLayout>
  );
}
