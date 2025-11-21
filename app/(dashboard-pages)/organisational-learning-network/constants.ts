import { DashboardLayoutProps } from "@/mui/layout/dashboard";

import { GetIncidentSeverityResponse } from "@/services/dashboard/incident-severity";
import { GetMineSiteResponse } from "@/services/dashboard/mine-site";
import { OrganisitionalLearningNetworkBaseParamsProps } from "@/services/dashboard/base";

import { shiftDate } from "@/utils/funcs";

export function layoutProps(
  filter: OrganisitionalLearningNetworkBaseParamsProps,
  setFilter: React.Dispatch<React.SetStateAction<OrganisitionalLearningNetworkBaseParamsProps>>,
  incidentSeveritis: GetIncidentSeverityResponse,
  mineSites: GetMineSiteResponse,
): Omit<DashboardLayoutProps, "children"> {
  return {
    breadcrumbItems: [],
    buttons: [
      {
        type: "dropdown",
        text: "Time Range",
        dropdownList: [
          {
            onClick: () => setFilter({ ...filter, dateRange: shiftDate(-7) }),
            text: "Last 7 Days",
          },
          {
            onClick: () => setFilter({ ...filter, dateRange: shiftDate(-30) }),
            text: "Last 30 Days",
          },
          {
            onClick: () => setFilter({ ...filter, dateRange: shiftDate(-90) }),
            text: "Last Quarter",
          },
        ],
        onClose: () => setFilter({ ...filter, dateRange: undefined }),
      },
      {
        type: "dropdown",
        text: "Incident Severity",
        dropdownList: incidentSeveritis.map((item) => ({
          text: item.name,
          onClick: () => setFilter({ ...filter, incidentSeverity: item.name }),
        })),
        onClose: () => setFilter({ ...filter, incidentSeverity: undefined }),
      },
      {
        type: "dropdown",
        text: "Mine Site",
        dropdownList: mineSites.map((site) => ({
          text: site.name,
          onClick: () => setFilter({ ...filter, mineSite: site.name }),
        })),
        onClose: () => setFilter({ ...filter, mineSite: undefined }),
      },
    ],
    title: "Organisitional Learning Network",
  };
}
