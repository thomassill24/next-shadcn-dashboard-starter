'use client';
import { AdSets } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { ArrowUpDown } from "lucide-react"
import { Button } from '@/components/ui/button';

export const columnsAdSets: ColumnDef<AdSets>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          className='hover:bg-transparent'
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ad Sets
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'spend',
    header: ({ column }) => {
      return (
        <Button
          className='hover:bg-transparent'
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Spend
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'metaRoas',
    header: ({ column }) => {
      return (
        <Button
          className='hover:bg-transparent'
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Meta ROAS
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'roas',
    header: ({ column }) => {
      return (
        <Button
          className='hover:bg-transparent'
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pixamp ROAS
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'clicks',
    header: ({ column }) => {
      return (
        <Button
          className='hover:bg-transparent'
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Clicks
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'orders',
    header: ({ column }) => {
      return (
        <Button
          className='hover:bg-transparent'
          variant ="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Orders
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
