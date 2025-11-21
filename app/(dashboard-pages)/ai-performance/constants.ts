import { DashboardLayoutProps } from "@/mui/layout/dashboard";

import { AIPerformanceBaseParamsProps } from "@/services/dashboard/base";
import { GetDepartmentResponse } from "@/services/dashboard/department";
import { GetInvestigatorResponse } from "@/services/dashboard/investigator";

import { shiftDate } from "@/utils/funcs";

export function layoutProps(
  filter: AIPerformanceBaseParamsProps,
  setFilter: React.Dispatch<React.SetStateAction<AIPerformanceBaseParamsProps>>,
  departments: GetDepartmentResponse,
  investigators: GetInvestigatorResponse,
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
        text: "Investigator",
        dropdownList: investigators?.map((investigator) => ({
          text: investigator.name,
          onClick: () => setFilter({ ...filter, investigator: investigator.name }),
        })),
        onClose: () => setFilter({ ...filter, investigator: undefined }),
      },
      {
        type: "dropdown",
        text: "Department",
        dropdownList: departments?.map((department) => ({
          text: department.name,
          onClick: () => setFilter({ ...filter, department: department.name }),
        })),
        onClose: () => setFilter({ ...filter, department: undefined }),
      },
    ],
    title: "AI Performance",
  };
}
