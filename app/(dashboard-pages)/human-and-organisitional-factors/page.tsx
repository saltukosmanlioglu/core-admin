"use client"

import { useEffect, useState } from 'react';

import { Box, Grid } from '@mui/material';

import { DashboardLayout } from '@/mui/layout/dashboard';
import { GetControlTypeResponse, getControlTypes } from '@/services/dashboard/control-type';
import { GetDepartmentResponse, getDepartments } from '@/services/dashboard/department';
import { GetKPIResponse, getKPIs } from '@/services/dashboard/human-and-organisitional-factors/KPIs';
import { GetPHMPAreaResponse, getPHMPAreas } from '@/services/dashboard/phmp-area';
import { HumanAndOrganisitionalFactorsBaseParamsProps } from '@/services/dashboard/base';

import { layoutProps } from './constants';
import {
  AverageControlEffectivenessScore,
  OrganisitonalCauses,
  TotalICAMCasesAnalysed
} from './widgets/kpi';

export default function HumanAndOrganisitionalFactors() {
  const [filter, setFilter] = useState<HumanAndOrganisitionalFactorsBaseParamsProps>({});

  const [departments, setDepartments] = useState<GetDepartmentResponse>([])
  const [controlTypes, setControlTypes] = useState<GetControlTypeResponse>([])
  const [phmpAreas, setPHMPAreas] = useState<GetPHMPAreaResponse>([])

  const [KPI, setKPI] = useState<GetKPIResponse>();

  useEffect(() => {
    filter && getKPIs(filter)
      .then((res) => setKPI(res))
      .catch((e) => console.log(e))
  }, [filter])

  useEffect(() => {
    getDepartments()
      .then((res) => setDepartments(res))
      .catch((e) => console.log(e))

    getControlTypes()
      .then((res) => setControlTypes(res))
      .catch((e) => console.log(e))

    getPHMPAreas()
      .then((res) => setPHMPAreas(res))
      .catch((e) => console.log(e))
  }, [])


  return (
    <DashboardLayout {...layoutProps(filter, setFilter, departments, controlTypes, phmpAreas)}>
      <Box>
        {KPI && (
          <Grid container spacing={2} columns={12} sx={{ mb: 2, width: '100%' }}>
            <Grid size={{ xs: 12, sm: 6, lg: 4, }} sx={{ width: '100%' }}>
              <TotalICAMCasesAnalysed data={KPI} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <OrganisitonalCauses data={KPI} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <AverageControlEffectivenessScore data={KPI} />
            </Grid>
          </Grid>
        )}

        <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            {/* <UserActivity data={userActivities} /> */}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            {/* <UserEngagement data={userEngagements} /> */}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            {/* <UserActivity data={userActivities} /> */}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            {/* <UserEngagement data={userEngagements} /> */}
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
