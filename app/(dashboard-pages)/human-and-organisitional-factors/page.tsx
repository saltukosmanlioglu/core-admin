"use client"

import { useEffect, useState } from 'react';

import { Box, Grid } from '@mui/material';

import { DashboardLayout } from '@/mui/layout/dashboard';
import { GetControlTypeResponse, getControlTypes } from '@/services/dashboard/control-type';
import { GetDepartmentResponse, getDepartments } from '@/services/dashboard/department';
import { GetHumanPerformanceFactorsResponse, getHumanPerformanceFactors } from '@/services/dashboard/human-and-organisitional-factors/human-performance-factor';
import { GetKPIResponse, getKPIs } from '@/services/dashboard/human-and-organisitional-factors/KPIs';
import { GetPHMPAreaResponse, getPHMPAreas } from '@/services/dashboard/phmp-area';
import { GetRootCauseCategoriesResponse, getRootCauseCategories } from '@/services/dashboard/human-and-organisitional-factors/root-cause-category';
import { HumanAndOrganisitionalFactorsBaseParamsProps } from '@/services/dashboard/base';

import { layoutProps } from './constants';
import {
  AverageControlEffectivenessScore,
  OrganisitonalCauses,
  TotalICAMCasesAnalysed
} from './widgets/kpi';
import { ControlEffectivenessVsFrequency, HumanPerformanceFactors, RootCauseCategories, TopFailedCriticalFactors } from './widgets';

export default function HumanAndOrganisitionalFactors() {
  const [filter, setFilter] = useState<HumanAndOrganisitionalFactorsBaseParamsProps>({});

  const [departments, setDepartments] = useState<GetDepartmentResponse>([])
  const [controlTypes, setControlTypes] = useState<GetControlTypeResponse>([])
  const [phmpAreas, setPHMPAreas] = useState<GetPHMPAreaResponse>([])

  const [KPI, setKPI] = useState<GetKPIResponse>();
  const [rootCauseCategories, setRootCauseCategories] = useState<GetRootCauseCategoriesResponse>([]);
  const [humanPerformanceFactors, setHumanPerformanceFactors] = useState<GetHumanPerformanceFactorsResponse>();

  useEffect(() => {
    filter && getKPIs(filter)
      .then((res) => setKPI(res))
      .catch((e) => console.log(e))

    getRootCauseCategories(filter)
      .then((res) => setRootCauseCategories(res))
      .catch(console.error);

    getHumanPerformanceFactors(filter)
      .then((res) => setHumanPerformanceFactors(res))
      .catch(console.error);
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
            <RootCauseCategories data={rootCauseCategories} />
          </Grid>
          {humanPerformanceFactors && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <HumanPerformanceFactors data={humanPerformanceFactors} />
            </Grid>
          )}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TopFailedCriticalFactors
              data={[
                { name: "Organisational Controls", value: 32 },
                { name: "Isolation", value: 27 },
                { name: "Procedures", value: 9 },
                { name: "Pre-start Checks", value: 18 },
                { name: "Permit to Work", value: 14 },
                { name: "Equipment Guards", value: 11 },
                { name: "Lockout / Tagout", value: 10 },
                { name: "PPE Compliance", value: 8 },
                { name: "Monitoring / Alarms", value: 7 },
                { name: "Supervision", value: 6 },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <ControlEffectivenessVsFrequency data={[
              { label: "Isolation", frequency: 2, effectiveness: 3.2, size: 40 },
              { label: "Procedures", frequency: 4, effectiveness: 2.5, size: 60 },
              { label: "Pre-Start Checks", frequency: 6, effectiveness: 4.1, size: 80 },
              { label: "Equipment", frequency: 8, effectiveness: 2.8, size: 110 },
            ]} />
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
