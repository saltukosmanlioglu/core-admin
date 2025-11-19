"use client"

import { useEffect, useMemo, useState } from 'react';

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
import { ControlEffectivenessVsFrequency, DrilldownTable, HumanPerformanceFactors, RootCauseCategories, TopFailedCriticalFactors } from './widgets';
import { DrilldownIncident } from './widgets/drilldown-table';

export default function HumanAndOrganisitionalFactors() {
  const [filter, setFilter] = useState<HumanAndOrganisitionalFactorsBaseParamsProps>({});

  const [departments, setDepartments] = useState<GetDepartmentResponse>([])
  const [controlTypes, setControlTypes] = useState<GetControlTypeResponse>([])
  const [phmpAreas, setPHMPAreas] = useState<GetPHMPAreaResponse>([])

  const [KPI, setKPI] = useState<GetKPIResponse>();
  const [rootCauseCategories, setRootCauseCategories] = useState<GetRootCauseCategoriesResponse>([]);
  const [humanPerformanceFactors, setHumanPerformanceFactors] = useState<GetHumanPerformanceFactorsResponse>();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  const incidents: DrilldownIncident[] = [
    { id: 1, incidentId: "INC-1001", incidentName: "Equipment Failure – Valve Jam", date: "2025-10-14", primaryRootCause: "Technical", incidentCount: 1 },
    { id: 2, incidentId: "INC-1002", incidentName: "Isolation Procedure Missed", date: "2025-10-12", primaryRootCause: "Procedures", incidentCount: 2 },
    { id: 3, incidentId: "INC-1003", incidentName: "Incorrect PPE Usage", date: "2025-10-11", primaryRootCause: "Individual", incidentCount: 1 },
    { id: 4, incidentId: "INC-1004", incidentName: "Training Gap – New Operator", date: "2025-10-09", primaryRootCause: "Organisational", incidentCount: 3 },
    { id: 5, incidentId: "INC-1005", incidentName: "Pre-Start Checks Overlooked", date: "2025-10-08", primaryRootCause: "Procedures", incidentCount: 0 },
    { id: 6, incidentId: "INC-1006", incidentName: "Sensor Fault – Temperature Spike", date: "2025-10-07", primaryRootCause: "Technical", incidentCount: 4 },
    { id: 7, incidentId: "INC-1007", incidentName: "Poor Communication Between Teams", date: "2025-10-06", primaryRootCause: "Organisational", incidentCount: 1 },
    { id: 8, incidentId: "INC-1008", incidentName: "Unauthorized Access to Restricted Area", date: "2025-10-05", primaryRootCause: "Individual", incidentCount: 2 },
    { id: 9, incidentId: "INC-1009", incidentName: "Incorrect Lockout Tagout", date: "2025-10-04", primaryRootCause: "Procedures", incidentCount: 1 },
    { id: 10, incidentId: "INC-1010", incidentName: "Failure to Follow SOP", date: "2025-10-03", primaryRootCause: "Procedures", incidentCount: 0 },

    { id: 11, incidentId: "INC-1011", incidentName: "Engine Overheat – Cooling Issue", date: "2025-10-02", primaryRootCause: "Technical", incidentCount: 2 },
    { id: 12, incidentId: "INC-1012", incidentName: "Inadequate Supervision", date: "2025-10-01", primaryRootCause: "Organisational", incidentCount: 3 },
    { id: 13, incidentId: "INC-1013", incidentName: "Wrong Tool Selection", date: "2025-09-30", primaryRootCause: "Individual", incidentCount: 1 },
    { id: 14, incidentId: "INC-1014", incidentName: "Pressure Leak – Seal Fatigue", date: "2025-09-29", primaryRootCause: "Technical", incidentCount: 2 },
    { id: 15, incidentId: "INC-1015", incidentName: "Missed Handover Communication", date: "2025-09-28", primaryRootCause: "Organisational", incidentCount: 1 },
    { id: 16, incidentId: "INC-1016", incidentName: "Procedure Not Updated", date: "2025-09-27", primaryRootCause: "Procedures", incidentCount: 2 },
    { id: 17, incidentId: "INC-1017", incidentName: "Tool Calibration Issue", date: "2025-09-26", primaryRootCause: "Technical", incidentCount: 1 },
    { id: 18, incidentId: "INC-1018", incidentName: "Human Error – Wrong Sequence", date: "2025-09-24", primaryRootCause: "Individual", incidentCount: 3 },
    { id: 19, incidentId: "INC-1019", incidentName: "Checklist Not Completed", date: "2025-09-23", primaryRootCause: "Procedures", incidentCount: 2 },
    { id: 20, incidentId: "INC-1020", incidentName: "Fatigue-Related Lapse", date: "2025-09-21", primaryRootCause: "Individual", incidentCount: 3 },

    { id: 21, incidentId: "INC-1021", incidentName: "Safety Barrier Not Installed", date: "2025-09-20", primaryRootCause: "Organisational", incidentCount: 1 },
    { id: 22, incidentId: "INC-1022", incidentName: "Burned Motor – Overload", date: "2025-09-19", primaryRootCause: "Technical", incidentCount: 2 },
    { id: 23, incidentId: "INC-1023", incidentName: "Communication Gap – Shift Change", date: "2025-09-18", primaryRootCause: "Organisational", incidentCount: 0 },
    { id: 24, incidentId: "INC-1024", incidentName: "Procedure Misinterpretation", date: "2025-09-17", primaryRootCause: "Procedures", incidentCount: 2 },
    { id: 25, incidentId: "INC-1025", incidentName: "Improper Storage of Materials", date: "2025-09-16", primaryRootCause: "Individual", incidentCount: 1 },
    { id: 26, incidentId: "INC-1026", incidentName: "Automated Alarm Failure", date: "2025-09-15", primaryRootCause: "Technical", incidentCount: 4 },
    { id: 27, incidentId: "INC-1027", incidentName: "Training Material Outdated", date: "2025-09-14", primaryRootCause: "Organisational", incidentCount: 2 },
    { id: 28, incidentId: "INC-1028", incidentName: "Failure to Wear Safety Harness", date: "2025-09-12", primaryRootCause: "Individual", incidentCount: 3 },
    { id: 29, incidentId: "INC-1029", incidentName: "Pump Seal Failure", date: "2025-09-10", primaryRootCause: "Technical", incidentCount: 1 },
    { id: 30, incidentId: "INC-1030", incidentName: "Incorrect Chemical Handling", date: "2025-09-09", primaryRootCause: "Individual", incidentCount: 1 },

    { id: 31, incidentId: "INC-1031", incidentName: "Procedure Not Followed", date: "2025-09-08", primaryRootCause: "Procedures", incidentCount: 2 },
    { id: 32, incidentId: "INC-1032", incidentName: "Software Failure – Control Module", date: "2025-09-07", primaryRootCause: "Technical", incidentCount: 4 },
    { id: 33, incidentId: "INC-1033", incidentName: "Lack of Team Coordination", date: "2025-09-06", primaryRootCause: "Organisational", incidentCount: 1 },
    { id: 34, incidentId: "INC-1034", incidentName: "Miscommunication During Task", date: "2025-09-05", primaryRootCause: "Organisational", incidentCount: 3 },
    { id: 35, incidentId: "INC-1035", incidentName: "Incorrect Panel Shutdown", date: "2025-09-04", primaryRootCause: "Individual", incidentCount: 2 },
    { id: 36, incidentId: "INC-1036", incidentName: "System Overload Warning Ignored", date: "2025-09-03", primaryRootCause: "Technical", incidentCount: 2 },
    { id: 37, incidentId: "INC-1037", incidentName: "Training Not Completed", date: "2025-09-02", primaryRootCause: "Organisational", incidentCount: 1 },
    { id: 38, incidentId: "INC-1038", incidentName: "Procedure Step Skipped", date: "2025-09-01", primaryRootCause: "Procedures", incidentCount: 2 },
    { id: 39, incidentId: "INC-1039", incidentName: "Human Error – Wrong Input", date: "2025-08-30", primaryRootCause: "Individual", incidentCount: 3 },
    { id: 40, incidentId: "INC-1040", incidentName: "Component Wear – End of Life", date: "2025-08-29", primaryRootCause: "Technical", incidentCount: 2 },
  ];


  const totalIncidentsCount = incidents.length;

  const incidentsSlice = useMemo(
    () =>
      incidents.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [incidents, page, rowsPerPage]
  );

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
          <Grid size={{ xs: 12, sm: 12 }}>
            <DrilldownTable
              incidents={incidentsSlice}
              selectable
              selectedRowId={selectedId}
              onRowSelect={(incident, newId) => {
                setSelectedId(newId);
                console.log("Selected incident:", incident?.incidentName);
              }}
              onViewIncident={(incident) => {
                console.log("Go to Incident:", incident.incidentId);
              }}
              pagination={{
                page,
                rowsPerPage,
                totalCount: totalIncidentsCount,
                onPageChange: (_e, newPage) => setPage(newPage),
                onRowsPerPageChange: (e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
