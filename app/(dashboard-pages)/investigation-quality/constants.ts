import { DashboardLayoutProps } from "@/mui/layout/dashboard";

import { GetCategoryResponse } from "@/services/dashboard/category";
import { GetMineSiteResponse } from "@/services/dashboard/mine-site";
import { InvestigationQualityBaseParamsProps } from "@/services/dashboard/base";

import { shiftDate } from "@/utils/funcs";

export function layoutProps(
  filter: InvestigationQualityBaseParamsProps,
  setFilter: React.Dispatch<React.SetStateAction<InvestigationQualityBaseParamsProps>>,
  mineSites: GetMineSiteResponse,
  categories: GetCategoryResponse,
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
        text: "Mine Site",
        dropdownList: mineSites.map((mineSite) => ({
          text: mineSite.name,
          onClick: () => setFilter({ ...filter, mineSite: mineSite.name }),
        })),
        onClose: () => setFilter({ ...filter, mineSite: undefined }),
      },
      {
        type: "dropdown",
        text: "Category",
        dropdownList: categories.map((category) => ({
          text: category.name,
          onClick: () => setFilter({ ...filter, category: category.name }),
        })),
        onClose: () => setFilter({ ...filter, category: undefined }),
      },
    ],
    title: "Investigation Quality",
  };
}
