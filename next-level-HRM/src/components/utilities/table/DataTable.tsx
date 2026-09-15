'use client';

import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Badge } from 'src/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/table';
import type { CellContext, ColumnDef, SortingState } from '@tanstack/react-table';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';
import { ArrowUp, ArrowDown, ChevronsUpDown, Trash2, Pencil } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { Label } from 'src/components/ui/label';
import CardBox from '../../shared/CardBox';
import { AddEmployeeModal } from 'src/components/modals/admin/employee/AddEmployeeModal';

const badgeColors = [
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-yellow-100 text-yellow-700',
  'bg-purple-100 text-purple-700',
  'bg-pink-100 text-pink-700',
  'bg-indigo-100 text-indigo-700',
  'bg-teal-100 text-teal-700',
  'bg-orange-100 text-orange-700',
];

export function getColorForValue(value: string) {
  const index =
    Math.abs(value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) %
    badgeColors.length;
  return badgeColors[index];
}

export function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const DataTable = <Employee extends Record<string, unknown>>({
  data = [],
  visibleColumns = ['username', 'fullName', 'email', 'department', 'role'],
}: { data?: Employee[], visibleColumns?: string[]; }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isAddEmpModalOpen, setIsAddEmpModalOpen] = useState(false);

  const renderValue = (val: unknown): React.ReactNode => {
    if (val === null || val === undefined) return '-';
    if (typeof val === 'object') return JSON.stringify(val);
    return String(val);
  };

  const paginationOptions = useMemo(() => {
    const sizes = [5, 10, 20, 50];
    return sizes.filter((size) => size <= data.length);
  }, [data.length]);

  const columns = useMemo<ColumnDef<Employee, unknown>[]>(() => {
    if (!data.length) return [];

    const keys = Object.keys(data[0]).filter((key) => {
      const val = data[0][key as keyof Employee];
      const isVisible = visibleColumns ? visibleColumns.includes(key) : true;

      return !Array.isArray(val) && isVisible;
    });
    const baseColumns = keys.map((col) => ({
      accessorKey: col,
      header: toTitleCase(col.replace(/([A-Z])/g, ' $1').trim()),
      cell: (info: CellContext<Employee, unknown>) => {
        const value = info.getValue();
        if (
          ['status', 'availability', 'gender', 'category', 'genre', 'position'].some((key) =>
            col.toLowerCase().includes(key),
          )
        ) {
          const cls = getColorForValue(String(value));

          return (
            <Badge
              className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${cls}`}
            >
              {renderValue(value)}
            </Badge>
          );
        }

        if (
          ['user', 'product', 'fullname', 'name', 'author'].some((key) =>
            col.toLowerCase().includes(key),
          )
        ) {
          const cls = getColorForValue(String(value));
          return (
            <div className="flex items-center gap-2">
              <Badge
                className={`size-10 flex items-center justify-center rounded-full shrink-0 ${cls}`}
              >
                {value ? String(value)[0]?.toUpperCase() : '?'}
              </Badge>
              <span className="text-gray-900 dark:text-white font-semibold max-w-50 truncate whitespace-nowrap">
                {renderValue(value)}
              </span>
            </div>
          );
        }

        return (
          <span className="text-gray-900 dark:text-white font-medium max-w-50 truncate block ">
            {renderValue(value)}
          </span>
        );
      },
      enableSorting: true,
      enableGlobalFilter: true,
    }));

    const actionColumn: ColumnDef<Employee, unknown> = {
      id: 'action',
      header: 'Action',
      enableSorting: false,
      cell: ({ }) => {
        return (
          <div className="flex items-center gap-2">
            <Button size={'sm'} variant={'lightprimary'} className="size-8! rounded-full">
              <Pencil className="size-5" />
            </Button>
            <Button size={'sm'} variant={'lighterror'} className="size-8! rounded-full">
              <Trash2 className="size-5" />
            </Button>
          </div>
        );
      },
    };

    return [...baseColumns, actionColumn];
  }, [data, visibleColumns]);
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    globalFilterFn: 'includesString',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: paginationOptions[0] || 5 } },
  });

  return (
    <CardBox>
      <div>
        {data.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No data available.</p>
        ) : (
          <>
            <div className="p-4 pt-0 flex items-center justify-between flex-wrap gap-4">
              <h3 className="text-xl font-semibold mb-2">Employee Data Table</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <Input
                  type="text"
                  className="max-w-96 lg:min-w-96 min-w-full placeholder:text-gray-400 dark:placeholder:text-white/20"
                  value={globalFilter ?? ''}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search your relevant items..."
                />
                <button
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  onClick={() => {
                    setIsAddEmpModalOpen(true)
                  }}
                >
                  + Add
                </button>
              </div>
            </div>
            <div className="overflow-x-auto border rounded-md border-ld">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="">
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className="cursor-pointer select-none min-w-42 px-0"
                        >
                          {header.isPlaceholder ? null : (
                            <Button
                              className="flex items-center gap-1 px-4 bg-transparent hover:bg-transparent text-dark dark:text-white font-semibold"
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{
                                asc: <ArrowUp className="w-4 h-4 inline" />,
                                desc: <ArrowDown className="w-4 h-4 inline" />,
                              }[header.column.getIsSorted() as string] ??
                                (header.column.id !== 'action' ? (
                                  <ChevronsUpDown className="w-2 h-2 inline" />
                                ) : null)}
                            </Button>
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>

                <TableBody>
                  {table.getRowModel().rows.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} className="hover:bg-primary/10 transition-colors">
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="text-gray-700 dark:text-white/70">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="text-center p-6 text-gray-500 dark:text-white/70 font-medium"
                      >
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-border dark:border-white/10">
              <div className="flex gap-2">
                <Button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  variant={'secondary'}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>

              <div className="text-forest-black dark:text-white/90 font-medium text-base">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </div>

              <div className="flex items-center gap-2">
                <Label
                  htmlFor="pageSize"
                  className="mr-0 text-forest-black dark:text-white/90 text-base font-medium whitespace-nowrap min-w-32"
                >
                  Rows per page:
                </Label>
                <Select
                  value={String(table.getState().pagination.pageSize)}
                  onValueChange={(value) => table.setPageSize(Number(value))}
                >
                  <SelectTrigger className="!w-18 cursor-pointer">
                    <SelectValue placeholder="Page size" />
                  </SelectTrigger>
                  <SelectContent>
                    {paginationOptions.map((size) => (
                      <SelectItem key={size} value={String(size)}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}
      </div>
      {isAddEmpModalOpen && (
        <AddEmployeeModal
          isOpen={isAddEmpModalOpen}
          onClose={() => setIsAddEmpModalOpen(false)}
        />
      )}
    </CardBox>
  );
};
