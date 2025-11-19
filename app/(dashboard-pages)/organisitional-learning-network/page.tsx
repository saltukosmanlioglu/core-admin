"use client"

import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';

import { DashboardLayout } from '@/mui/layout/dashboard';
import { GetEmergingThemeResponse, getEmergingThemes } from '@/services/dashboard/organisitional-learning-network/emerging-theme';
import { getIncidentSeverities, GetIncidentSeverityResponse } from '@/services/dashboard/incident-severity';
import { GetKPIResponse, getKPIs } from '@/services/dashboard/organisitional-learning-network/KPIs';
import { GetMineSiteResponse, getMineSites } from '@/services/dashboard/mine-site';
import { TenantSummaryBaseParamsProps } from '@/services/dashboard/base';

import { layoutProps } from './constants';
import {
  CommonCauses,
  SharedLearningLinks,
  TotalIncidentMapped
} from './widgets/kpi';
import {
  EmergingThemes,
  RecurringCauseFrequency
} from './widgets';
import KnowledgeWeb, { KnowledgeWebData } from './widgets/knowledge-web';

import knowledgeWebData from './widgets/knowledge_web.json'

export default function OrganisitionalLearningNetwork() {
  const [filter, setFilter] = useState<TenantSummaryBaseParamsProps>({});

  const [incidentSeverities, setIncidentSeverities] = useState<GetIncidentSeverityResponse>([]);
  const [mineSites, setMineSites] = useState<GetMineSiteResponse>([])

  const [KPI, setKPI] = useState<GetKPIResponse>();
  const [emergingThemes, setEmergingThemes] = useState<GetEmergingThemeResponse>([]);

  useEffect(() => {
    filter && getKPIs(filter)
      .then((res) => setKPI(res))
      .catch((e) => console.log(e))

    getEmergingThemes(filter)
      .then((res) => setEmergingThemes(res))
      .catch((e) => console.log(e))
  }, [filter]);

  useEffect(() => {
    getIncidentSeverities()
      .then((res) => setIncidentSeverities(res))
      .catch((e) => console.log(e))

    getMineSites()
      .then((res) => setMineSites(res))
      .catch((e) => console.log(e))
  }, [])

  return (
    <DashboardLayout {...layoutProps(filter, setFilter, incidentSeverities, mineSites)}>
      <Box>
        {KPI && (
          <Grid container spacing={2} columns={12} sx={{ mb: 2, width: '100%' }}>
            <Grid size={{ xs: 12, sm: 6, lg: 4, }} sx={{ width: '100%' }}>
              <TotalIncidentMapped data={KPI} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <CommonCauses data={KPI} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <SharedLearningLinks data={KPI} />
            </Grid>
          </Grid>
        )}
        <Grid container spacing={2} columns={12} sx={{ mb: 2, width: '100%' }}>
          <Grid size={{ xs: 12, sm: 12 }}>
            <KnowledgeWeb data={knowledgeWebData} />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <RecurringCauseFrequency
              categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
              series={[
                { name: "Training", data: [1, 2, 3, 5, 3, 4, 6, 8, 9, 10, 12, 14] },
                { name: "Communication", data: [0.5, 1, 1.4, 2, 3, 3.5, 4, 5, 6, 7, 8, 9] },
                { name: "Procedures", data: [1, 1.3, 2, 2.8, 3.2, 3.8, 4.5, 5, 6, 7, 8.5, 9.2] },
                { name: "Equipment", data: [0.8, 1.1, 1.9, 2.7, 3.1, 3.9, 4.2, 4.8, 5.7, 6.5, 7, 8] },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <EmergingThemes data={emergingThemes} />
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
