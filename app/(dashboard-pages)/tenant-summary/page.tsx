"use client"

import { useEffect, useMemo, useState } from 'react';
import { Box, Grid } from '@mui/material';

import { DashboardLayout } from '@/mui/layout/dashboard';
import StatusBar from '@/components/status-bar';
import { getCompanies, GetCompanyResponse } from '@/services/dashboard/company';
import { GetKPIResponse, getKPIs } from '@/services/dashboard/tenant-summary/KPIs';
import { GetModuleResponse, getModules } from '@/services/dashboard/module';
import { getUserActivities, GetUserActivityResponse } from '@/services/dashboard/tenant-summary/user-activity';
import { TenantSummaryBaseParamsProps } from '@/services/dashboard/base';

import { layoutProps } from './constants';
import {
  ActiveUsers,
  CompanyDetails,
  CostPerToken,
  InactiveUsers,
  NumberOfTokensUsed
} from './widgets/kpi';
import {
  ActiveVsTotalUsers,
  ContractDetail,
  InactiveUser,
  InactiveUsersTable,
  TokensUsedPerUser,
  UserActivity,
  UserEngagement
} from './widgets';
import { GetUserEngagementResponse, getUserEngagements } from '@/services/dashboard/tenant-summary/user-engagement';

export default function TenantSummary() {
  const [filter, setFilter] = useState<TenantSummaryBaseParamsProps>({});

  const [companies, setCompanies] = useState<GetCompanyResponse>([]);
  const [modules, setModules] = useState<GetModuleResponse>([])

  const [KPI, setKPI] = useState<GetKPIResponse>();
  const [userActivities, setUserActivities] = useState<GetUserActivityResponse>([])
  const [userEngagements, setUserEngagements] = useState<GetUserEngagementResponse>([])

  const inactiveUsers: InactiveUser[] = [
    { id: 1, name: "John Smith", roleDepartment: "Safety / Department", lastReportGenerated: "Q1 Safety Report", tokensUsedLast60Days: 150, totalTokensUsed: 150, engagementStatus: "Dormant" },
    { id: 2, name: "Emily Brown", roleDepartment: "Investigator", lastReportGenerated: "Incident 02-18", tokensUsedLast60Days: 0, totalTokensUsed: 12, engagementStatus: "Low Engagement" },
    { id: 3, name: "Michael Johnson", roleDepartment: "Viewer", lastReportGenerated: "Viewer Review", tokensUsedLast60Days: 5, totalTokensUsed: 30, engagementStatus: "Inactive" },
    { id: 4, name: "Sarah Williams", roleDepartment: "Analyst", lastReportGenerated: "Risk Summary", tokensUsedLast60Days: 22, totalTokensUsed: 48, engagementStatus: "Dormant" },
    { id: 5, name: "David Wilson", roleDepartment: "Viewer", lastReportGenerated: "N/A", tokensUsedLast60Days: 0, totalTokensUsed: 0, engagementStatus: "Inactive" },
    { id: 6, name: "Sophia Davis", roleDepartment: "Research", lastReportGenerated: "Compliance Review", tokensUsedLast60Days: 12, totalTokensUsed: 67, engagementStatus: "Low Engagement" },
    { id: 7, name: "James Miller", roleDepartment: "Investigator", lastReportGenerated: "Incident 03-04", tokensUsedLast60Days: 33, totalTokensUsed: 85, engagementStatus: "Dormant" },
    { id: 8, name: "Olivia Garcia", roleDepartment: "Safety / Department", lastReportGenerated: "Q3 Review", tokensUsedLast60Days: 0, totalTokensUsed: 4, engagementStatus: "Inactive" },
    { id: 9, name: "William Martinez", roleDepartment: "Analyst", lastReportGenerated: "Token Audit", tokensUsedLast60Days: 18, totalTokensUsed: 40, engagementStatus: "Low Engagement" },
    { id: 10, name: "Ava Rodriguez", roleDepartment: "Investigator", lastReportGenerated: "Incident 05-22", tokensUsedLast60Days: 2, totalTokensUsed: 70, engagementStatus: "Inactive" },
    { id: 11, name: "Isabella Hernandez", roleDepartment: "Viewer", lastReportGenerated: "N/A", tokensUsedLast60Days: 0, totalTokensUsed: 0, engagementStatus: "Dormant" },
    { id: 12, name: "Mason Lopez", roleDepartment: "Investigator", lastReportGenerated: "Incident 09-14", tokensUsedLast60Days: 40, totalTokensUsed: 90, engagementStatus: "Low Engagement" },
    { id: 13, name: "Mia Gonzalez", roleDepartment: "Research", lastReportGenerated: "Compliance Audit", tokensUsedLast60Days: 0, totalTokensUsed: 5, engagementStatus: "Inactive" },
    { id: 14, name: "Benjamin Wilson", roleDepartment: "Analyst", lastReportGenerated: "Q2 Summary", tokensUsedLast60Days: 8, totalTokensUsed: 32, engagementStatus: "Dormant" },
    { id: 15, name: "Harper Anderson", roleDepartment: "Viewer", lastReportGenerated: "Viewer Overview", tokensUsedLast60Days: 0, totalTokensUsed: 2, engagementStatus: "Inactive" },
    { id: 16, name: "Ethan Thomas", roleDepartment: "Safety / Department", lastReportGenerated: "Q4 Safety Report", tokensUsedLast60Days: 10, totalTokensUsed: 60, engagementStatus: "Low Engagement" },
    { id: 17, name: "Charlotte Taylor", roleDepartment: "Investigator", lastReportGenerated: "Incident 11-03", tokensUsedLast60Days: 51, totalTokensUsed: 110, engagementStatus: "Dormant" },
    { id: 18, name: "Alexander Moore", roleDepartment: "Viewer", lastReportGenerated: "N/A", tokensUsedLast60Days: 2, totalTokensUsed: 12, engagementStatus: "Inactive" },
    { id: 19, name: "Amelia Jackson", roleDepartment: "Analyst", lastReportGenerated: "Risk Assessment", tokensUsedLast60Days: 6, totalTokensUsed: 22, engagementStatus: "Low Engagement" },
    { id: 20, name: "Logan Martin", roleDepartment: "Safety / Department", lastReportGenerated: "Q1 Review", tokensUsedLast60Days: 0, totalTokensUsed: 0, engagementStatus: "Inactive" },
    { id: 21, name: "Evelyn Lee", roleDepartment: "Investigator", lastReportGenerated: "Incident 12-21", tokensUsedLast60Days: 23, totalTokensUsed: 55, engagementStatus: "Dormant" },
    { id: 22, name: "Jackson Perez", roleDepartment: "Viewer", lastReportGenerated: "N/A", tokensUsedLast60Days: 0, totalTokensUsed: 3, engagementStatus: "Inactive" },
    { id: 23, name: "Abigail Thompson", roleDepartment: "Analyst", lastReportGenerated: "Token Report", tokensUsedLast60Days: 14, totalTokensUsed: 41, engagementStatus: "Low Engagement" },
    { id: 24, name: "Lucas White", roleDepartment: "Research", lastReportGenerated: "Compliance Draft", tokensUsedLast60Days: 0, totalTokensUsed: 7, engagementStatus: "Inactive" },
    { id: 25, name: "Ella Harris", roleDepartment: "Safety / Department", lastReportGenerated: "Q2 Safety Review", tokensUsedLast60Days: 11, totalTokensUsed: 50, engagementStatus: "Dormant" },
    { id: 26, name: "Aiden Sanchez", roleDepartment: "Investigator", lastReportGenerated: "Incident 01-02", tokensUsedLast60Days: 0, totalTokensUsed: 18, engagementStatus: "Inactive" },
    { id: 27, name: "Grace Clark", roleDepartment: "Viewer", lastReportGenerated: "Overview", tokensUsedLast60Days: 0, totalTokensUsed: 0, engagementStatus: "Inactive" },
    { id: 28, name: "Sebastian Ramirez", roleDepartment: "Investigator", lastReportGenerated: "Incident 04-18", tokensUsedLast60Days: 38, totalTokensUsed: 80, engagementStatus: "Low Engagement" },
    { id: 29, name: "Chloe Lewis", roleDepartment: "Analyst", lastReportGenerated: "Risk Q4", tokensUsedLast60Days: 16, totalTokensUsed: 39, engagementStatus: "Dormant" },
    { id: 30, name: "Mateo Robinson", roleDepartment: "Viewer", lastReportGenerated: "N/A", tokensUsedLast60Days: 0, totalTokensUsed: 1, engagementStatus: "Inactive" },
    { id: 31, name: "Scarlett Walker", roleDepartment: "Safety / Department", lastReportGenerated: "Q1 Safety", tokensUsedLast60Days: 4, totalTokensUsed: 17, engagementStatus: "Low Engagement" },
    { id: 32, name: "Henry Young", roleDepartment: "Analyst", lastReportGenerated: "Token Summary", tokensUsedLast60Days: 21, totalTokensUsed: 33, engagementStatus: "Dormant" },
    { id: 33, name: "Victoria King", roleDepartment: "Viewer", lastReportGenerated: "N/A", tokensUsedLast60Days: 0, totalTokensUsed: 0, engagementStatus: "Inactive" },
    { id: 34, name: "Leo Wright", roleDepartment: "Research", lastReportGenerated: "Compliance Log", tokensUsedLast60Days: 0, totalTokensUsed: 4, engagementStatus: "Low Engagement" },
    { id: 35, name: "Aria Scott", roleDepartment: "Investigator", lastReportGenerated: "Incident 07-12", tokensUsedLast60Days: 49, totalTokensUsed: 103, engagementStatus: "Dormant" },
    { id: 36, name: "Wyatt Green", roleDepartment: "Viewer", lastReportGenerated: "N/A", tokensUsedLast60Days: 0, totalTokensUsed: 2, engagementStatus: "Inactive" },
    { id: 37, name: "Luna Adams", roleDepartment: "Safety / Department", lastReportGenerated: "Q4 Review", tokensUsedLast60Days: 9, totalTokensUsed: 24, engagementStatus: "Low Engagement" },
    { id: 38, name: "Daniel Baker", roleDepartment: "Analyst", lastReportGenerated: "Risk Draft", tokensUsedLast60Days: 17, totalTokensUsed: 52, engagementStatus: "Dormant" },
    { id: 39, name: "Nora Nelson", roleDepartment: "Viewer", lastReportGenerated: "Viewer Summary", tokensUsedLast60Days: 0, totalTokensUsed: 0, engagementStatus: "Inactive" },
    { id: 40, name: "Owen Carter", roleDepartment: "Investigator", lastReportGenerated: "Incident 10-19", tokensUsedLast60Days: 31, totalTokensUsed: 67, engagementStatus: "Low Engagement" },
    { id: 41, name: "Riley Mitchell", roleDepartment: "Research", lastReportGenerated: "Compliance Report", tokensUsedLast60Days: 0, totalTokensUsed: 6, engagementStatus: "Inactive" },
    { id: 42, name: "Hannah Perez", roleDepartment: "Analyst", lastReportGenerated: "Token Check", tokensUsedLast60Days: 15, totalTokensUsed: 48, engagementStatus: "Dormant" },
    { id: 43, name: "Luke Roberts", roleDepartment: "Safety / Department", lastReportGenerated: "Q3 Safety", tokensUsedLast60Days: 3, totalTokensUsed: 16, engagementStatus: "Low Engagement" },
    { id: 44, name: "Zoe Turner", roleDepartment: "Viewer", lastReportGenerated: "N/A", tokensUsedLast60Days: 0, totalTokensUsed: 0, engagementStatus: "Inactive" },
    { id: 45, name: "Jack Phillips", roleDepartment: "Investigator", lastReportGenerated: "Incident 06-23", tokensUsedLast60Days: 26, totalTokensUsed: 88, engagementStatus: "Dormant" },
    { id: 46, name: "Penelope Campbell", roleDepartment: "Analyst", lastReportGenerated: "Risk Overview", tokensUsedLast60Days: 8, totalTokensUsed: 35, engagementStatus: "Low Engagement" },
    { id: 47, name: "Gabriel Parker", roleDepartment: "Viewer", lastReportGenerated: "N/A", tokensUsedLast60Days: 0, totalTokensUsed: 5, engagementStatus: "Inactive" },
    { id: 48, name: "Ella Evans", roleDepartment: "Research", lastReportGenerated: "Compliance Extract", tokensUsedLast60Days: 1, totalTokensUsed: 21, engagementStatus: "Dormant" },
    { id: 49, name: "Hudson Edwards", roleDepartment: "Safety / Department", lastReportGenerated: "Safety Log", tokensUsedLast60Days: 3, totalTokensUsed: 12, engagementStatus: "Low Engagement" },
    { id: 50, name: "Layla Collins", roleDepartment: "Viewer", lastReportGenerated: "N/A", tokensUsedLast60Days: 0, totalTokensUsed: 0, engagementStatus: "Inactive" },
    { id: 51, name: "Elijah Stewart", roleDepartment: "Investigator", lastReportGenerated: "Incident 02-11", tokensUsedLast60Days: 29, totalTokensUsed: 95, engagementStatus: "Dormant" },
    { id: 52, name: "Madison Morris", roleDepartment: "Analyst", lastReportGenerated: "Risk Forecast", tokensUsedLast60Days: 14, totalTokensUsed: 44, engagementStatus: "Low Engagement" },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  const totalUsersCount = inactiveUsers.length;
  const usersSlice = useMemo(
    () =>
      inactiveUsers.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [inactiveUsers, page, rowsPerPage]
  );

  useEffect(() => {
    filter && getKPIs(filter)
      .then((res) => setKPI(res))
      .catch((e) => console.log(e))

    getUserActivities(filter)
      .then((res) => setUserActivities(res))
      .catch((e) => console.log(e))

    getUserEngagements(filter)
      .then((res) => setUserEngagements(res))
      .catch((e) => console.log(e))

  }, [filter]);

  useEffect(() => {
    getCompanies()
      .then((res) => setCompanies(res))
      .catch((e) => console.log(e))

    getModules()
      .then((res) => setModules(res))
      .catch((e) => console.log(e))
  }, [])

  return (
    <DashboardLayout {...layoutProps(filter, setFilter, companies, modules)}>
      <Box id="main-layout-container">
        {KPI && (
          <Grid container spacing={2} columns={23} sx={{ mb: 2, width: '100%' }}>
            <Grid size={{ xs: 12, sm: 6, lg: 5, }} sx={{ width: '100%' }}>
              <CompanyDetails data={KPI.company} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <ActiveUsers data={KPI} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <InactiveUsers data={KPI} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 5 }}>
              <NumberOfTokensUsed data={KPI.numberOfTokensUsed} trend="up" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 5 }}>
              <CostPerToken data={KPI.token} />
            </Grid>
          </Grid>
        )}

        <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <UserActivity data={userActivities} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <UserEngagement data={userEngagements} />
          </Grid>
          <Grid size={{ xs: 12, sm: 12 }}>
            <InactiveUsersTable
              users={usersSlice}
              selectable
              selectedRowId={selectedId}
              onRowSelect={(user, newId) => {
                setSelectedId(newId);
                console.log("Selected:", user?.name);
              }}
              onContactClick={(user) => console.log("Contact:", user.name)}
              pagination={{
                page,
                rowsPerPage,
                totalCount: totalUsersCount,
                onPageChange: (_e, newPage) => setPage(newPage),
                onRowsPerPageChange: (e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                },
              }}
            />
          </Grid>
          {/* <Grid size={{ xs: 12, sm: 5 }}>
            <SuggestedReengagementActions
              actions={[
                {
                  id: "feedback-email",
                  label: "Send personalised feedback request email",
                  enabled: true,
                },
                {
                  id: "demo-webinar",
                  label: "Offer refresher demo of latest webinar",
                  enabled: false,
                },
                {
                  id: "renewal-workflow",
                  label: "Trigger automated renewal incentive workflow",
                  enabled: true,
                },
              ]}
              onToggle={(id, enabled) => {
                console.log(id, enabled);
              }}
            />
          </Grid> */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TokensUsedPerUser
              data={[
                { label: "User 1", used: 5, limit: 10 },
                { label: "User 2", used: 15, limit: 20 },
                { label: "User 3", used: 25, limit: 30 },
                { label: "User 4", used: 40, limit: 45 },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <ActiveVsTotalUsers
              percentage={82}
              daysUntilExpiry={68}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <ContractDetail
              daysUntilExpiry={68}
              progress={40}
              riskLabel="High Renewal Risk"
            />
          </Grid>
        </Grid>

        <StatusBar containerId='main-layout-container' items={[
          { name: 'Usage Health: ', value: 'Good' },
          { name: 'Engagement Health', value: 'Deciling' },
          { name: 'Renawal Probability', value: 'Moderate' },
          { name: 'Support Interaction Level', value: '5 tickets last quarter' },
        ]}
        />
      </Box>
    </DashboardLayout>
  );
}
