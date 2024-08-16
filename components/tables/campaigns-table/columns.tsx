'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { Campaign } from '@/constants/data';

export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          className='hover:bg-transparent'
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Campaigns
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'spend',
    header: ({ column }) => {
      return (
        <Button
          className='hover:bg-transparent'
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Spend
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'metaRoas',
    header: ({ column }) => {
      return (
        <Button
          className='hover:bg-transparent'
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Meta ROAS
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'roas',
    header: ({ column }) => {
      return (
        <Button
          className='hover:bg-transparent'
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Pixamp ROAS
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'clicks',
    header: ({ column }) => {
      return (
        <Button
          className='hover:bg-transparent'
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Clicks
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'orders',
    header: ({ column }) => {
      return (
        <Button
          className='hover:bg-transparent'
          variant ="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Orders
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: 'actions',
    header: () => null, // No header for the actions column
    cell: ({ row }) => {
      const campaign = row.original;
      const [isPinned, setIsPinned] = useState(false); // Track if the campaign is pinned
      const [isExpanded, setIsExpanded] = useState(false); // Track if the campaign is expanded

      const handlePinToggle = () => {
        setIsPinned((prev) => !prev);
      };

      const handleExpandToggle = () => {
        setIsExpanded((prev) => !prev);
      };

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={handlePinToggle}>
                {isPinned ? 'Unpin' : 'Pin'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleExpandToggle}>
                {isExpanded ? 'Collapse' : 'Expand'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    size: 60, // Define a fixed size for the actions column
  },
];
