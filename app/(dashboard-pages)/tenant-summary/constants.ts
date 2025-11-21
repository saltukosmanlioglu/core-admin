import { DashboardLayoutProps } from "@/mui/layout/dashboard";

import { GetCompanyResponse } from "@/services/dashboard/company";
import { GetModuleResponse } from "@/services/dashboard/module";
import { TenantSummaryBaseParamsProps } from "@/services/dashboard/base";

import { shiftDate } from "@/utils/funcs";

export function layoutProps(
  filter: TenantSummaryBaseParamsProps,
  setFilter: React.Dispatch<React.SetStateAction<TenantSummaryBaseParamsProps>>,
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
          onClick: () => setFilter({ ...filter, company: company.name }),
        })),
        onClose: () => setFilter({ ...filter, company: undefined }),
      },
      {
        type: "dropdown",
        text: "Module",
        dropdownList: modules.map((module) => ({
          text: module.name,
          onClick: () => setFilter({ ...filter, module: module.name }),
        })),
        onClose: () => setFilter({ ...filter, module: undefined }),
      },
    ],
    title: "Tenant Summary",
  };
}
