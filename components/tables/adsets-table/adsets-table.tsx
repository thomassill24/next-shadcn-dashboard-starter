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
import { ChevronRight, ChevronDown, MoreHorizontal, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Define interfaces for Ad and AdSet
interface Ad {
  id: string;
  name: string;
  spend: number;
  metaRoas: number;
  roas: number;
  clicks: number;
  orders: number;
}

interface AdSet {
  id: string;
  name: string;
  spend: number;
  metaRoas: number;
  roas: number;
  clicks: number;
  orders: number;
  ads?: Ad[]; // Ads nested within AdSet
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: AdSet[];
  searchKey: string;
  totalUsers: number;
  pageSizeOptions?: number[];
  pageCount: number;
}

export function AdSetsTable<TData, TValue>({
  columns,
  data,
  searchKey,
  totalUsers,
  pageCount,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]); // Initialize sorting state
  const [expandedAdSetIds, setExpandedAdSetIds] = useState<string[]>([]); // Allow multiple expanded adsets
  const [pinnedAdSetIds, setPinnedAdSetIds] = useState<string[]>([]); // State to track pinned adsets
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [adSetToUnpin, setAdSetToUnpin] = useState<AdSet | null>(null); // Track adset to unpin

  const toggleExpandAdSet = (adSetId: string) => {
    setExpandedAdSetIds((prev) =>
      prev.includes(adSetId) ? prev.filter((id) => id !== adSetId) : [...prev, adSetId]
    );
  };

  const handleUnpinAdSet = () => {
    if (adSetToUnpin) {
      setPinnedAdSetIds((prev) => prev.filter((id) => id !== adSetToUnpin.id));
      setConfirmationDialogOpen(false);
      setAdSetToUnpin(null);
    }
  };

  const handlePinAdSet = (adSetId: string) => {
    setPinnedAdSetIds((prev) => (prev.includes(adSetId) ? prev : [...prev, adSetId]));
  };

  const openUnpinConfirmationDialog = (adSet: AdSet) => {
    setAdSetToUnpin(adSet); // Set the adset to unpin
    setConfirmationDialogOpen(true); // Open the confirmation dialog
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
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
  const getAdSetStatus = (index: number) => {
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
                  const adSet = row.original as AdSet;
                  const isExpandedAdSet = expandedAdSetIds.includes(adSet.id); // Check if this adset is expanded
                  const isPinned = pinnedAdSetIds.includes(adSet.id);
                  const status = getAdSetStatus(index);

                  return (
                    <React.Fragment key={adSet.id}>
                      <TableRow className={index % 2 === 0 ? "bg-[#F9F9F9] hover:bg-[#F9F9F9]" : "bg-white hover:bg-[white]"}>
                        <TableCell>
                          <div className="flex items-center">
                            {isPinned && (
                              <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => openUnpinConfirmationDialog(adSet)}
                              >
                                <Pin className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              className="flex items-center text-blue-500 ml-2"
                              onClick={() => toggleExpandAdSet(adSet.id)}
                            >
                              {isExpandedAdSet ? (
                                <ChevronDown className="mr-1 h-4 w-4" />
                              ) : (
                                <ChevronRight className="mr-1 h-4 w-4" />
                              )}

                              <span
                                className={`h-2 w-2 rounded-full mx-2 ${
                                  status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                                }`}
                              ></span>
                              {adSet.name}
                            </button>
                          </div>
                        </TableCell>
                        <TableCell>{`$${adSet.spend.toLocaleString()}`}</TableCell>
                        <TableCell>{`${adSet.metaRoas.toFixed(2)}x`}</TableCell>
                        <TableCell>{`${adSet.roas.toFixed(2)}x`}</TableCell>
                        <TableCell>{adSet.clicks}</TableCell>
                        <TableCell>{adSet.orders}</TableCell>
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
                                <DropdownMenuItem
                                  onClick={() => openUnpinConfirmationDialog(adSet)}
                                >
                                  Unpin
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handlePinAdSet(adSet.id)}>
                                  Pin
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => toggleExpandAdSet(adSet.id)}>
                                {isExpandedAdSet ? 'Collapse' : 'Expand'}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>

                      {isExpandedAdSet &&
                        adSet.ads?.map((ad) => (
                          <TableRow key={ad.id} className="bg-[#F4F4F5] hover:bg-[#F4F4F5]">
                            <TableCell className="pl-8">{ad.name}</TableCell>
                            <TableCell>{`$${ad.spend.toLocaleString()}`}</TableCell>
                            <TableCell>{`${ad.metaRoas.toFixed(2)}x`}</TableCell>
                            <TableCell>{`${ad.roas.toFixed(2)}x`}</TableCell>
                            <TableCell>{ad.clicks}</TableCell>
                            <TableCell>{ad.orders}</TableCell>
                          </TableRow>
                        ))}
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
                  <TableCell className="w-[40px]"></TableCell>
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
      {adSetToUnpin && (
        <Dialog open={confirmationDialogOpen} onOpenChange={setConfirmationDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Unpin Ad Set</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to unpin the ad set <strong>{adSetToUnpin.name}</strong>?</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmationDialogOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleUnpinAdSet}>Unpin</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
