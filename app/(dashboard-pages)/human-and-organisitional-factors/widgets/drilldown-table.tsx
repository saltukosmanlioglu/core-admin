"use client";

import React from "react";
import { Button } from "@mui/material";

import DashboardCard from "@/components/dashboard-card";
import DataTable, {
  DataTableColumn,
  DataTablePaginationProps,
} from "@/components/data-table";

export type DrilldownIncident = {
  id?: string | number;
  incidentId: string | number;
  incidentName: string;
  date: string;
  primaryRootCause: string;
  incidentCount: number;
};

export interface DrilldownTableProps {
  incidents: DrilldownIncident[];
  onViewIncident?: (incident: DrilldownIncident) => void;
  selectable?: boolean;
  selectedRowId?: string | number | null;
  onRowSelect?: (
    incident: DrilldownIncident,
    rowId: string | number | null
  ) => void;
  pagination?: DataTablePaginationProps;
}

export const DrilldownTable: React.FunctionComponent<DrilldownTableProps> = ({
  incidents,
  onViewIncident,
  selectable = false,
  selectedRowId = null,
  onRowSelect,
  pagination,
}) => {
  const columns: DataTableColumn<DrilldownIncident>[] = [
    {
      id: "incidentName",
      label: "Incident Name",
      field: "incidentName",
      cellSx: { fontWeight: 600 },
    },
    {
      id: "date",
      label: "Date",
      field: "date",
    },
    {
      id: "primaryRootCause",
      label: "Primary Root Cause",
      field: "primaryRootCause",
    },
    {
      id: "incidentCount",
      label: "Incident Count",
      field: "incidentCount",
      align: "right",
    },
    {
      id: "operations",
      label: "Operations",
      align: "right",
      render: (row) => (
        <Button
          variant="contained"
          size="small"
          sx={{
            textTransform: "none",
            px: 2.5,
            borderRadius: 2,
            backgroundColor: "#d97706",
            "&:hover": { backgroundColor: "#b45309" },
          }}
          onClick={(e) => {
            e.stopPropagation();
            onViewIncident?.(row);
          }}
        >
          View in Incident AI
        </Button>
      ),
    },
  ];

  return (
    <DashboardCard title="Drilldown Table">
      <DataTable
        rows={incidents}
        columns={columns}
        selectable={selectable}
        selectedRowId={selectedRowId}
        onRowSelect={onRowSelect}
        getRowId={(row) => row.id ?? row.incidentId}
        pagination={pagination}
      />
    </DashboardCard>
  );
};

export default DrilldownTable;
