import React, { useState, useMemo } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ChevronRight, ChevronDown, Pin, MoreHorizontal } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  ads?: Ad[];
}

interface Campaign {
  id: string;
  name: string;
  spend: number;
  metaRoas: number;
  roas: number;
  clicks: number;
  orders: number;
  adSets?: AdSet[];
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: Campaign[];
  searchKey: string;
}

export function CampaignsTable<TData, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [expandedCampaignIds, setExpandedCampaignIds] = useState<string[]>([]);
  const [expandedAdSetIds, setExpandedAdSetIds] = useState<string[]>([]);
  const [pinnedCampaignIds, setPinnedCampaignIds] = useState<string[]>([]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [campaignToUnpin, setCampaignToUnpin] = useState<Campaign | null>(null);

  const toggleExpandCampaign = (campaignId: string) => {
    setExpandedCampaignIds((prev) =>
      prev.includes(campaignId) ? prev.filter((id) => id !== campaignId) : [...prev, campaignId]
    );
  };

  const toggleExpandAdSet = (adSetId: string) => {
    setExpandedAdSetIds((prev) =>
      prev.includes(adSetId) ? prev.filter((id) => id !== adSetId) : [...prev, adSetId]
    );
  };

  const handleUnpinCampaign = () => {
    if (campaignToUnpin) {
      setPinnedCampaignIds((prev) => prev.filter((id) => id !== campaignToUnpin.id));
      setConfirmationDialogOpen(false);
      setCampaignToUnpin(null);
    }
  };

  const handlePinCampaign = (campaignId: string) => {
    setPinnedCampaignIds((prev) =>
      prev.includes(campaignId) ? prev : [...prev, campaignId]
    );
  };

  const openUnpinConfirmationDialog = (campaign: Campaign) => {
    setCampaignToUnpin(campaign);
    setConfirmationDialogOpen(true);
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const aPinned = pinnedCampaignIds.includes(a.id);
      const bPinned = pinnedCampaignIds.includes(b.id);

      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
      return 0;
    });
  }, [data, pinnedCampaignIds]);

  const table = useReactTable({
    data: sortedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const totalSpend = data.reduce((acc, campaign) => acc + campaign.spend, 0);
  const totalClicks = data.reduce((acc, campaign) => acc + campaign.clicks, 0);
  const totalOrders = data.reduce((acc, campaign) => acc + campaign.orders, 0);
  const meanMetaRoas = data.length > 0 ? data.reduce((acc, campaign) => acc + campaign.metaRoas, 0) / data.length : 0;
  const meanRoas = data.length > 0 ? data.reduce((acc, campaign) => acc + campaign.roas, 0) / data.length : 0;

  // Hardcoded statuses for demo purposes (alternate between active/inactive)
  const getCampaignStatus = (index: number) => {
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
                    onClick={header.column.getToggleSortingHandler()}
                    className={`cursor-pointer select-none hover:bg-transparent ${
                      header.column.getIsSorted()
                        ? header.column.getIsSorted() === 'asc'
                          ? 'sorted-asc'
                          : 'sorted-desc'
                        : ''
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
                  const campaign = row.original as Campaign;
                  const isExpandedCampaign = expandedCampaignIds.includes(campaign.id);
                  const isPinned = pinnedCampaignIds.includes(campaign.id);

                  const status = getCampaignStatus(index); // Get the hardcoded status

                  return (
                    <React.Fragment key={campaign.id}>
                      <TableRow className={index % 2 === 0 ? "bg-[#F9F9F9] hover:bg-[#F9F9F9]" : "bg-white hover:bg-[white]"}>
                        <TableCell>
                          <div className="flex items-center">
                            {isPinned && (
                              <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => openUnpinConfirmationDialog(campaign)}
                              >
                                <Pin className="h-4 w-4" />
                              </button>
                            )}

                            {/* Chevron + Bullet (Green for Active, Grey for Inactive) + Campaign Name */}
                            <button
                              className="flex items-center text-blue-500 ml-2"
                              onClick={() => toggleExpandCampaign(campaign.id)}
                            >
                              {isExpandedCampaign ? (
                                <ChevronDown className="mr-1 h-4 w-4" />
                              ) : (
                                <ChevronRight className="mr-1 h-4 w-4" />
                              )}

                              {/* Bullet */}
                              <span
                                className={`h-2 w-2 rounded-full mx-2 ${
                                  status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                                }`}
                              ></span>

                              {campaign.name}
                            </button>
                          </div>
                        </TableCell>
                        <TableCell>{`$${campaign.spend.toLocaleString()}`}</TableCell>
                        <TableCell>{`${campaign.metaRoas.toFixed(2)}x`}</TableCell>
                        <TableCell>{`${campaign.roas.toFixed(2)}x`}</TableCell>
                        <TableCell>{campaign.clicks}</TableCell>
                        <TableCell>{campaign.orders}</TableCell>
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
                                  onClick={() => {
                                    openUnpinConfirmationDialog(campaign);
                                  }}
                                >
                                  Unpin
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handlePinCampaign(campaign.id)}>
                                  Pin
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => toggleExpandCampaign(campaign.id)}>
                                {isExpandedCampaign ? 'Collapse' : 'Expand'}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>

                      {isExpandedCampaign &&
                        campaign.adSets?.map((adSet) => {
                          const isExpandedAdSet = expandedAdSetIds.includes(adSet.id);
                          return (
                            <React.Fragment key={adSet.id}>
                              <TableRow className="bg-[#F4F4F5] hover:bg-[#F4F4F5]">
                                <TableCell className="pl-8">
                                  <button
                                    className="flex items-center text-blue-500"
                                    onClick={() => toggleExpandAdSet(adSet.id)}
                                  >
                                    {isExpandedAdSet ? (
                                      <ChevronDown className="mr-1 h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="mr-1 h-4 w-4" />
                                    )}
                                    {adSet.name}
                                  </button>
                                </TableCell>
                                <TableCell>{`$${adSet.spend.toLocaleString()}`}</TableCell>
                                <TableCell>{`${adSet.metaRoas.toFixed(2)}x`}</TableCell>
                                <TableCell>{`${adSet.roas.toFixed(2)}x`}</TableCell>
                                <TableCell>{adSet.clicks}</TableCell>
                                <TableCell>{adSet.orders}</TableCell>
                                <TableCell className="w-[40px]"></TableCell>
                              </TableRow>

                              {isExpandedAdSet &&
                                adSet.ads?.map((ad) => (
                                  <TableRow key={ad.id} className="bg-[#E4E4E5] hover:bg-[#E4E4E5]">
                                    <TableCell className="pl-12">{ad.name}</TableCell>
                                    <TableCell>{`$${ad.spend.toLocaleString()}`}</TableCell>
                                    <TableCell>{`${ad.metaRoas.toFixed(2)}x`}</TableCell>
                                    <TableCell>{`${ad.roas.toFixed(2)}x`}</TableCell>
                                    <TableCell>{ad.clicks}</TableCell>
                                    <TableCell>{ad.orders}</TableCell>
                                    <TableCell className="w-[40px]"></TableCell>
                                  </TableRow>
                                ))}
                            </React.Fragment>
                          );
                        })}
                    </React.Fragment>
                  );
                })}

                <TableRow className="sticky bottom-0 bg-[#F4F4F5] font-bold hover:bg-[#F4F4F5]">
                  <TableCell>Totals</TableCell>
                  <TableCell>{`$${totalSpend.toLocaleString()}`}</TableCell>
                  <TableCell>{`${meanMetaRoas.toFixed(2)}x`}</TableCell>
                  <TableCell>{`${meanRoas.toFixed(2)}x`}</TableCell>
                  <TableCell>{totalClicks}</TableCell>
                  <TableCell>{totalOrders}</TableCell>
                  <TableCell className="w-[40px]"></TableCell> {/* This "fake" column simulates the width of the actions column */}
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

      {campaignToUnpin && (
        <Dialog open={confirmationDialogOpen} onOpenChange={setConfirmationDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Unpin Campaign</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to unpin the campaign <strong>{campaignToUnpin.name}</strong>?</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmationDialogOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleUnpinCampaign}>Unpin</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
