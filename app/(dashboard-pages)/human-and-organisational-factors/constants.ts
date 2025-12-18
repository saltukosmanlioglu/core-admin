import { DashboardLayoutProps } from "@/mui/layout/dashboard";

import { GetControlTypeResponse } from "@/services/dashboard/control-type";
import { GetDepartmentResponse } from "@/services/dashboard/department";
import { GetPHMPAreaResponse } from "@/services/dashboard/phmp-area";
import { HumanAndOrganisitionalFactorsBaseParamsProps } from "@/services/dashboard/base";

import { shiftDate } from "@/utils/funcs";

export function layoutProps(
  filter: HumanAndOrganisitionalFactorsBaseParamsProps,
  setFilter: React.Dispatch<React.SetStateAction<HumanAndOrganisitionalFactorsBaseParamsProps>>,
  departments: GetDepartmentResponse,
  controlTypes: GetControlTypeResponse,
  phmpAreas: GetPHMPAreaResponse,
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
        text: "Departments",
        dropdownList: departments.map((department) => ({
          text: department.name,
          onClick: () => setFilter({ ...filter, department: department.name }),
        })),
        onClose: () => setFilter({ ...filter, department: undefined }),
      },
      {
        type: "dropdown",
        text: "Control Types",
        dropdownList: controlTypes.map((controlType) => ({
          text: controlType.name,
          onClick: () => setFilter({ ...filter, controlType: controlType.name }),
        })),
        onClose: () => setFilter({ ...filter, controlType: undefined }),
      },
      {
        type: "dropdown",
        text: "PHMP Areas",
        dropdownList: phmpAreas.map((phmpArea) => ({
          text: phmpArea.name,
          onClick: () => setFilter({ ...filter, phmpArea: phmpArea.name }),
        })),
        onClose: () => setFilter({ ...filter, phmpArea: undefined }),
      },
    ],
    title: "Human And Organisitional Factors",
  };
}
