"use client";

import React from "react";
import { Button } from "@mui/material";

import ChartCard from "@/components/chart-card";
import DataTable, { DataTableColumn, DataTablePaginationProps } from "@/components/data-table";

export type InactiveUser = {
  id?: string | number;
  engagementStatus: string;
  lastReportGenerated: string;
  name: string;
  roleDepartment: string;
  tokensUsedLast60Days: number | string;
  totalTokensUsed: number | string;
};

export interface InactiveUsersTableProps {
  users: InactiveUser[];
  onContactClick?: (user: InactiveUser) => void;
  selectable?: boolean;
  selectedRowId?: string | number | null;
  onRowSelect?: (user: InactiveUser, rowId: string | number | null) => void;
  pagination?: DataTablePaginationProps;
}

export const InactiveUsersTable: React.FC<InactiveUsersTableProps> = ({
  users,
  onContactClick,
  selectable = false,
  selectedRowId = null,
  onRowSelect,
  pagination,
}) => {
  const columns: DataTableColumn<InactiveUser>[] = [
    { id: "name", label: "User Name", field: "name", cellSx: { fontWeight: 600 } },
    { id: "roleDepartment", label: "Role / Department", field: "roleDepartment" },
    { id: "lastReportGenerated", label: "Last Report Generated", field: "lastReportGenerated" },
    {
      id: "tokensUsedLast60Days",
      label: "Tokens Used (last 60 days)",
      field: "tokensUsedLast60Days",
      align: "right",
    },
    {
      id: "totalTokensUsed",
      label: "Total Tokens",
      field: "totalTokensUsed",
      align: "right",
    },
    {
      id: "contact",
      label: "Engagement Status",
      align: "center",
      render: (row) => (
        <Button
          variant="outlined"
          size="small"
          sx={{ textTransform: "none", px: 2.5 }}
          onClick={(e) => {
            e.stopPropagation();
            onContactClick?.(row);
          }}
        >
          Contact
        </Button>
      ),
    },
  ];

  return (
    <ChartCard title="Inactive Users - Feedback Opportunity">
      <DataTable
        rows={users}
        columns={columns}
        selectable={selectable}
        selectedRowId={selectedRowId}
        onRowSelect={onRowSelect}
        getRowId={(row) => row.id ?? row.name}
        pagination={pagination}
      />
    </ChartCard>
  );
};

export default InactiveUsersTable;
