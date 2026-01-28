'use client';

import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type PaginationState,
  type RowSelectionState,
  type Row,
  type Table as TanStackTable,
} from '@tanstack/react-table';
import { cn } from '../../lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../table';
import { Button } from '../button';
import { Input } from '../input';
import { Checkbox } from '../checkbox';

// DataTable Context
interface DataTableContextValue<TData> {
  table: TanStackTable<TData>;
}

const DataTableContext = React.createContext<DataTableContextValue<unknown> | null>(null);

function useDataTable<TData>() {
  const context = React.useContext(DataTableContext) as DataTableContextValue<TData> | null;
  if (!context) {
    throw new Error('useDataTable must be used within a DataTable');
  }
  return context;
}

// DataTable Props
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  enableRowSelection?: boolean;
  enablePagination?: boolean;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  onRowSelectionChange?: (rows: TData[]) => void;
  emptyMessage?: string;
  className?: string;
  children?: React.ReactNode;
}

// Column helper for row selection
function getSelectColumn<TData>(): ColumnDef<TData> {
  return {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
}

// DataTable Component
function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = 'Search...',
  enableRowSelection = false,
  enablePagination = true,
  enableSorting = true,
  enableFiltering = true,
  pageSize = 10,
  pageSizeOptions = [10, 20, 30, 40, 50],
  onRowSelectionChange,
  emptyMessage = 'No results.',
  className,
  children,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  // Add select column if row selection is enabled
  const tableColumns = React.useMemo(() => {
    if (enableRowSelection) {
      return [getSelectColumn<TData>(), ...columns];
    }
    return columns;
  }, [columns, enableRowSelection]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    ...(enablePagination && {
      getPaginationRowModel: getPaginationRowModel(),
    }),
    ...(enableSorting && {
      getSortedRowModel: getSortedRowModel(),
      onSortingChange: setSorting,
    }),
    ...(enableFiltering && {
      getFilteredRowModel: getFilteredRowModel(),
      onColumnFiltersChange: setColumnFilters,
      onGlobalFilterChange: setGlobalFilter,
    }),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
    },
  });

  // Notify parent of row selection changes
  React.useEffect(() => {
    if (onRowSelectionChange) {
      const selectedRows = table.getFilteredSelectedRowModel().rows.map(
        (row: Row<TData>) => row.original
      );
      onRowSelectionChange(selectedRows);
    }
  }, [rowSelection, onRowSelectionChange, table]);

  return (
    <DataTableContext.Provider value={{ table: table as TanStackTable<unknown> }}>
      <div className={cn('space-y-4', className)}>
        {/* Search / Filter */}
        {enableFiltering && searchKey && (
          <div className="flex items-center py-4">
            <Input
              placeholder={searchPlaceholder}
              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
              onChange={(event) =>
                table.getColumn(searchKey)?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
        )}

        {/* Custom toolbar via children */}
        {children}

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={tableColumns.length}
                    className="h-24 text-center"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {enablePagination && (
          <DataTablePagination
            table={table}
            pageSizeOptions={pageSizeOptions}
            showSelectedCount={enableRowSelection}
          />
        )}
      </div>
    </DataTableContext.Provider>
  );
}
DataTable.displayName = 'DataTable';

// DataTable Pagination
interface DataTablePaginationProps<TData> {
  table: TanStackTable<TData>;
  pageSizeOptions?: number[];
  showSelectedCount?: boolean;
}

function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
  showSelectedCount = false,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {showSelectedCount && (
          <>
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </>
        )}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="h-8 w-[70px] rounded-md border border-input bg-background px-2 text-sm"
            aria-label="Rows per page"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            aria-label="Go to first page"
          >
            <span className="sr-only">Go to first page</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Go to previous page"
          >
            <span className="sr-only">Go to previous page</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Go to next page"
          >
            <span className="sr-only">Go to next page</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            aria-label="Go to last page"
          >
            <span className="sr-only">Go to last page</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
DataTablePagination.displayName = 'DataTablePagination';

// Column Header with Sorting
interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: {
    getCanSort: () => boolean;
    getIsSorted: () => false | 'asc' | 'desc';
    toggleSorting: (desc?: boolean) => void;
  };
  title: string;
}

function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn('-ml-3 h-8 data-[state=open]:bg-accent', className)}
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      <span>{title}</span>
      {column.getIsSorted() === 'desc' ? (
        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      ) : column.getIsSorted() === 'asc' ? (
        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      ) : (
        <svg className="ml-2 h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      )}
    </Button>
  );
}
DataTableColumnHeader.displayName = 'DataTableColumnHeader';

// Toolbar Component
interface DataTableToolbarProps {
  children?: React.ReactNode;
  className?: string;
}

const DataTableToolbar = React.forwardRef<HTMLDivElement, DataTableToolbarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DataTableToolbar.displayName = 'DataTableToolbar';

// View Options (Column Visibility)
interface DataTableViewOptionsProps<TData> {
  table: TanStackTable<TData>;
}

function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <div className="flex items-center space-x-2">
      {table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== 'undefined' && column.getCanHide()
        )
        .map((column) => {
          return (
            <label
              key={column.id}
              className="flex items-center space-x-2 text-sm"
            >
              <Checkbox
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              />
              <span className="capitalize">{column.id}</span>
            </label>
          );
        })}
    </div>
  );
}
DataTableViewOptions.displayName = 'DataTableViewOptions';

export {
  DataTable,
  DataTablePagination,
  DataTableColumnHeader,
  DataTableToolbar,
  DataTableViewOptions,
  DataTableContext,
  useDataTable,
  getSelectColumn,
};
export type { DataTableProps, DataTablePaginationProps, DataTableColumnHeaderProps };

// Re-export types from TanStack Table for convenience
export type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  Row,
  Table as TanStackTable,
};
