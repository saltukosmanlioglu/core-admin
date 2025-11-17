"use client";

import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  TablePagination,
} from "@mui/material";

export type TableAlign = "left" | "right" | "center" | "inherit" | "justify";

export interface DataTableColumn<T> {
  id: string;
  label: string;
  field?: keyof T;
  render?: (row: T, rowIndex: number) => React.ReactNode;
  align?: TableAlign;
  width?: number | string;
  headerSx?: object;
  cellSx?: object;
}

export interface DataTablePaginationProps {
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  rowsPerPageOptions?: number[];
}

export interface DataTableProps<T> {
  rows: T[];
  columns: Array<DataTableColumn<T>>;
  getRowId?: (row: T, index: number) => string | number;
  selectable?: boolean;
  selectedRowId?: string | number | null;
  onRowSelect?: (row: T, rowId: string | number | null) => void;
  onRowClick?: (row: T, rowId: string | number) => void;
  dense?: boolean;
  striped?: boolean;
  maxHeight?: number | string;
  pagination?: DataTablePaginationProps;
}

export function DataTable<T>(props: DataTableProps<T>) {
  const {
    rows,
    columns,
    getRowId = (_row, index) => index,
    selectable = false,
    selectedRowId = null,
    onRowSelect,
    onRowClick,
    dense = true,
    striped = true,
    maxHeight,
    pagination,
  } = props;

  const handleRowClick = (row: T, rowId: string | number) => {
    onRowClick?.(row, rowId);

    if (selectable) {
      const isSelected = selectedRowId === rowId;
      const newId = isSelected ? null : rowId;
      onRowSelect?.(row, newId);
    }
  };

  const isRowSelected = (rowId: string | number) =>
    selectable && selectedRowId === rowId;

  return (
    <Box sx={{ borderRadius: 2, border: "1px solid rgba(148,163,184,0.25)", overflow: "hidden" }}>
      <TableContainer
        sx={{
          maxHeight: maxHeight ?? "none",
        }}
      >
        <Table size={dense ? "small" : "medium"} stickyHeader={Boolean(maxHeight)}>
          <TableHead>
            <TableRow sx={{ bgcolor: "rgba(248,250,252,0.95)" }}>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align}
                  sx={{
                    fontWeight: 600,
                    fontSize: 13,
                    whiteSpace: "nowrap",
                    ...(col.headerSx || {}),
                  }}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, rowIndex) => {
              const rowId = getRowId(row, rowIndex);
              const selected = isRowSelected(rowId);

              return (
                <TableRow
                  key={rowId}
                  hover
                  onClick={() => handleRowClick(row, rowId)}
                  sx={{
                    cursor: selectable || onRowClick ? "pointer" : "default",
                    "&:nth-of-type(even)": striped
                      ? { bgcolor: "rgba(249,250,251,0.9)" }
                      : undefined,
                    ...(selected
                      ? {
                        bgcolor: "rgba(37,99,235,0.06)",
                        "& td": {
                          borderBottomColor: "rgba(37,99,235,0.25)",
                        },
                        boxShadow: "inset 2px 0 0 #2563eb",
                      }
                      : {}),
                  }}
                >
                  {columns.map((col) => {
                    const content =
                      col.render != null
                        ? col.render(row, rowIndex)
                        : col.field
                          ? (row[col.field] as React.ReactNode)
                          : null;

                    return (
                      <TableCell
                        key={col.id}
                        align={col.align}
                        sx={{
                          fontSize: 13,
                          ...(col.cellSx || {}),
                        }}
                      >
                        {typeof content === "string" ||
                          typeof content === "number" ? (
                          <Typography variant="body2" sx={{ fontSize: 13 }}>
                            {content}
                          </Typography>
                        ) : (
                          content
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}

            {rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ py: 4, color: "rgba(107,114,128,0.9)" }}
                >
                  <Typography variant="body2">No data available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination && (
        <TablePagination
          component="div"
          count={pagination.totalCount}
          page={pagination.page}
          onPageChange={pagination.onPageChange}
          rowsPerPage={pagination.rowsPerPage}
          onRowsPerPageChange={pagination.onRowsPerPageChange}
          rowsPerPageOptions={pagination.rowsPerPageOptions ?? [5, 10, 25]}
        />
      )}
    </Box>
  );
}

export default DataTable;
