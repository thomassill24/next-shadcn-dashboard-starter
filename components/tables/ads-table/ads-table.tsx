'use client';
import React, { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pin } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Define interfaces for Ad
interface Ad {
  id: string;
  name: string;
  spend: number;
  metaRoas: number;
  roas: number;
  clicks: number;
  orders: number;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: Ad[];
  searchKey: string;
  totalUsers: number;
  pageSizeOptions?: number[];
  pageCount: number;
}

export function AdsTable<TData, TValue>({
  columns,
  data,
  searchKey,
  totalUsers,
  pageCount,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]); // Initialize sorting state
  const [pinnedAdIds, setPinnedAdIds] = useState<string[]>([]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [adToUnpin, setAdToUnpin] = useState<Ad | null>(null); // Track ad to unpin

  const handleUnpinAd = () => {
    if (adToUnpin) {
      setPinnedAdIds((prev) => prev.filter((id) => id !== adToUnpin.id));
      setConfirmationDialogOpen(false);
      setAdToUnpin(null);
    }
  };

  const handlePinAd = (adId: string) => {
    setPinnedAdIds((prev) => (prev.includes(adId) ? prev : [...prev, adId]));
  };

  const openUnpinConfirmationDialog = (ad: Ad) => {
    setAdToUnpin(ad);
    setConfirmationDialogOpen(true);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting, // Handle sorting changes
    manualPagination: true,
    manualFiltering: true,
    manualSorting: false, // Let react-table handle sorting automatically
  });

  const totalSpend = data.reduce((acc, item) => acc + item.spend, 0);
  const totalClicks = data.reduce((acc, item) => acc + item.clicks, 0);
  const totalOrders = data.reduce((acc, item) => acc + item.orders, 0);
  const meanMetaRoas = data.length > 0 ? data.reduce((acc, item) => acc + item.metaRoas, 0) / data.length : 0;
  const meanPixampRoas = data.length > 0 ? data.reduce((acc, item) => acc + item.roas, 0) / data.length : 0;

  // Hardcoded statuses for demo purposes
  const getAdStatus = (index: number) => {
    return index % 3 === 0 ? 'inactive' : 'active'; // Example: 2 active (green), 1 inactive (grey)
  };

  return (
    <>
      <ScrollArea className="h-[calc(96vh-220px)] w-full rounded-xl border">
        <Table className="h-full w-full relative">
          <TableHeader className="sticky top-0 bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()} // Add sorting handler
                    className={`cursor-pointer select-none hover:bg-transparent ${
                      header.column.getIsSorted() ? (header.column.getIsSorted() === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row, index) => {
                  const ad = row.original as Ad;
                  const isEvenRow = index % 2 === 0;
                  const isPinned = pinnedAdIds.includes(ad.id);
                  const status = getAdStatus(index);

                  return (
                    <React.Fragment key={ad.id}>
                      <TableRow className={`${isEvenRow ? "bg-[#F9F9F9] hover:bg-[#F9F9F9]" : "bg-white hover:bg-[white]"}`}>
                        <TableCell>
                          <div className="flex items-center">
                            {isPinned && (
                              <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => openUnpinConfirmationDialog(ad)}
                              >
                                <Pin className="h-4 w-4" />
                              </button>
                            )}

                            <span
                              className={`h-2 w-2 rounded-full mx-2 ${
                                status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                              }`}
                            ></span>
                            {ad.name}
                          </div>
                        </TableCell>
                        <TableCell>{`$${ad.spend.toLocaleString()}`}</TableCell>
                        <TableCell>{`${ad.metaRoas.toFixed(2)}x`}</TableCell>
                        <TableCell>{`${ad.roas.toFixed(2)}x`}</TableCell>
                        <TableCell>{ad.clicks}</TableCell>
                        <TableCell>{ad.orders}</TableCell>
                        <TableCell className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-6 w-6 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {isPinned ? (
                                <DropdownMenuItem onClick={() => openUnpinConfirmationDialog(ad)}>
                                  Unpin
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handlePinAd(ad.id)}>
                                  Pin
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })}

                <TableRow className="sticky bottom-0 bg-[#F4F4F5] font-bold hover:bg-[#F4F4F5]">
                  <TableCell>Totals</TableCell>
                  <TableCell>{`$${totalSpend.toLocaleString()}`}</TableCell>
                  <TableCell>{`${meanMetaRoas.toFixed(2)}x`}</TableCell>
                  <TableCell>{`${meanPixampRoas.toFixed(2)}x`}</TableCell>
                  <TableCell>{totalClicks}</TableCell>
                  <TableCell>{totalOrders}</TableCell>
                  <TableCell className="w-[40px]"></TableCell> {/* "Fake" column to match the width */}
                </TableRow>
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      {/* Confirmation Dialog */}
      {adToUnpin && (
        <Dialog open={confirmationDialogOpen} onOpenChange={setConfirmationDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Unpin Ad</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to unpin the ad <strong>{adToUnpin.name}</strong>?</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmationDialogOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleUnpinAd}>Unpin</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
