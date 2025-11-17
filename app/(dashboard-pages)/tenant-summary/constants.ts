import { DashboardLayoutProps } from "@/mui/layout/dashboard";

import { AIPerformanceBaseParamsProps } from "@/services/dashboard/base";
import { GetCompanyResponse } from "@/services/dashboard/company";
import { GetModuleResponse } from "@/services/dashboard/module";

import { shiftDate } from "@/utils/funcs";

export function layoutProps(
  filter: AIPerformanceBaseParamsProps,
  setFilter: React.Dispatch<React.SetStateAction<AIPerformanceBaseParamsProps>>,
  companies: GetCompanyResponse,
  modules: GetModuleResponse,
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
        text: "Company",
        dropdownList: companies.map((company) => ({
          text: company.name,
          onClick: () => setFilter({ ...filter, investigator: company.name }),
        })),
        onClose: () => setFilter({ ...filter, investigator: undefined }),
      },
      {
        type: "dropdown",
        text: "Module",
        dropdownList: modules.map((module) => ({
          text: module.name,
          onClick: () => setFilter({ ...filter, department: module.name }),
        })),
        onClose: () => setFilter({ ...filter, department: undefined }),
      },
    ],
    title: "Tenant Summary",
  };
}
