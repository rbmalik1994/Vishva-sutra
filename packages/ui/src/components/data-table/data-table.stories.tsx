import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  DataTable,
  DataTablePagination,
  DataTableColumnHeader,
  DataTableToolbar,
  DataTableViewOptions,
  getSelectColumn,
  type ColumnDef,
} from './data-table';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
} from '@tanstack/react-table';
import { Checkbox } from '../checkbox';
import { Button } from '../button';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
}

const data: Payment[] = [
  { id: '1', amount: 316, status: 'success', email: 'ken99@yahoo.com' },
  { id: '2', amount: 242, status: 'success', email: 'abe45@gmail.com' },
  { id: '3', amount: 837, status: 'processing', email: 'monserrat44@gmail.com' },
  { id: '4', amount: 874, status: 'success', email: 'silas22@gmail.com' },
  { id: '5', amount: 721, status: 'failed', email: 'carmella@hotmail.com' },
  { id: '6', amount: 412, status: 'pending', email: 'zola@outlook.com' },
  { id: '7', amount: 295, status: 'success', email: 'elijah@gmail.com' },
  { id: '8', amount: 520, status: 'processing', email: 'nina@yahoo.com' },
  { id: '9', amount: 186, status: 'pending', email: 'max@gmail.com' },
  { id: '10', amount: 632, status: 'success', email: 'sara@outlook.com' },
];

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('status')}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

function DefaultDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full space-y-4">
      <DataTableToolbar table={table} filterColumn="email" filterPlaceholder="Filter emails..." />
      <DataTable table={table} />
      <DataTablePagination table={table} />
    </div>
  );
}

export const Default: Story = {
  render: () => <DefaultDataTable />,
};

const selectColumn = getSelectColumn<Payment>();

const columnsWithSelect: ColumnDef<Payment>[] = [
  selectColumn,
  ...columns,
];

function SelectableDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns: columnsWithSelect,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div className="w-full space-y-4">
      <DataTableToolbar table={table} filterColumn="email" filterPlaceholder="Filter emails..." />
      <DataTable table={table} />
      <DataTablePagination table={table} />
    </div>
  );
}

export const WithSelection: Story = {
  render: () => <SelectableDataTable />,
};

function ViewOptionsDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-end">
        <DataTableViewOptions table={table} />
      </div>
      <DataTable table={table} />
      <DataTablePagination table={table} />
    </div>
  );
}

export const WithViewOptions: Story = {
  render: () => <ViewOptionsDataTable />,
};

function SimpleDataTable() {
  const simpleColumns: ColumnDef<Payment>[] = [
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'amount', header: 'Amount' },
  ];

  const table = useReactTable({
    data: data.slice(0, 5),
    columns: simpleColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable table={table} />;
}

export const Simple: Story = {
  render: () => <SimpleDataTable />,
};
