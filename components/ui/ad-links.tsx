import React, { useState } from 'react';
import { Pin, MoreHorizontal, ChevronRight, ChevronDown, Edit } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Example data structure
interface Ad {
  id: string;
  name: string;
  status: string,
  visits: number;
}

interface AdSet {
  id: string;
  name: string;
  status: string,
  visits: number;
  ads?: Ad[];
}

interface Campaign {
  id: string;
  name: string;
  status: string;
  visits: number;
  adSets?: AdSet[];
  pinned?: boolean;
}

const campaignsData: Campaign[] = [
  {
    id: '1',
    name: 'Campaign 1',
    status: 'ACTIVE',
    visits: 200,
    adSets: [
      {
        id: '1-1',
        name: 'Ad Set 1-1',
        status: 'ACTIVE',
        visits: 200,
        ads: [
          { id: '1-1-1', name: 'Ad 1-1-1', status: 'ACTIVE', visits: 200 },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Campaign 2',
    status: 'INACTIVE',
    visits: 150,
    adSets: [
      {
        id: '2-1',
        name: 'Ad Set 2-1',
        status: 'INACTIVE',
        visits: 150,
        ads: [
          { id: '2-1-1', name: 'Ad 2-1-1', status:'INACTIVE', visits: 150 },
        ],
      },
    ],
  },
];

// Status cell component
const StatusCell: React.FC<{ status: string; isCampaign?: boolean }> = ({ status, isCampaign = true }) => {
  const isActive = status === 'ACTIVE';

  return (
    <div
      className={`flex items-center w-fit space-x-2 ${
        isCampaign
          ? isActive
            ? 'bg-[#e6fce8] text-green-700'  // Campaign active background
            : 'bg-red-100 text-red-600'      // Campaign inactive background
          : ' '                   // No background for Ad Sets/Ads
      } px-2 py-1 rounded-full`}
    >
      <span className="text-[12px] font-medium">{isActive ? 'Active' : 'Inactive'}</span>
      <div className="relative flex items-center justify-center">
        <div
          className={`h-2 w-2 rounded-full ${
            isActive ? 'bg-green-700' : 'bg-red-600'
          }`}
        ></div>
      </div>
    </div>
  );
};


const AdLinksTable: React.FC = () => {
  const [pinnedRows, setPinnedRows] = useState<string[]>([]);
  const [expandedCampaignIds, setExpandedCampaignIds] = useState<string[]>([]); // Track expanded campaign IDs
  const [expandedAdSetIds, setExpandedAdSetIds] = useState<string[]>([]); // Track expanded ad set IDs
  const [campaignToUnpin, setCampaignToUnpin] = useState<Campaign | null>(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | null }>({
    key: 'name',
    direction: null,
  });

  // Pin/unpin functionality
  const handlePin = (rowId: string) => {
    setPinnedRows((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [rowId, ...prev]
    );
  };

  const handleUnpinClick = (row: Campaign) => {
    setCampaignToUnpin(row);
    setConfirmationDialogOpen(true);
  };

  const handleUnpinCampaign = () => {
    if (campaignToUnpin) {
      setPinnedRows((prev) => prev.filter((id) => id !== campaignToUnpin.id));
      setConfirmationDialogOpen(false);
      setCampaignToUnpin(null);
    }
  };

  // Sorting logic
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null; // reset sort
    }
    setSortConfig({ key, direction });
  };

  // Sort campaigns to have pinned campaigns first, and return the rest in original order
  const sortedCampaigns = [...campaignsData]
    .sort((a, b) => {
      const aPinned = pinnedRows.includes(a.id);
      const bPinned = pinnedRows.includes(b.id);

      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;

      return 0; // Maintains the original order of unpinned campaigns
    })
    .sort((a, b) => {
      if (sortConfig.direction === null) return 0; // No sorting
      const directionMultiplier = sortConfig.direction === 'asc' ? 1 : -1;
      if (sortConfig.key === 'name') {
        return a.name.localeCompare(b.name) * directionMultiplier;
      } else if (sortConfig.key === 'visits') {
        return (a.visits - b.visits) * directionMultiplier;
      } else if (sortConfig.key === 'status') {
        return a.status.localeCompare(b.status) * directionMultiplier;
      }
      return 0;
    });

  // Toggle the expanded state for a specific campaign
  const toggleExpandCampaign = (campaignId: string) => {
    setExpandedCampaignIds((prev) =>
      prev.includes(campaignId) ? prev.filter((id) => id !== campaignId) : [...prev, campaignId]
    );
  };

  // Toggle the expanded state for a specific ad set
  const toggleExpandAdSet = (adSetId: string) => {
    setExpandedAdSetIds((prev) =>
      prev.includes(adSetId) ? prev.filter((id) => id !== adSetId) : [...prev, adSetId]
    );
  };

  // Render campaigns with expandable ad sets and ads
  const renderCampaigns = () => {
    return (
      <>
        {sortedCampaigns.map((campaign) => {
          const isExpandedCampaign = expandedCampaignIds.includes(campaign.id);
          return (
            <React.Fragment key={campaign.id}>
              <TableRow>
                <TableCell className="flex items-center space-x-2 font-medium">
                  {pinnedRows.includes(campaign.id) ? (
                    <Pin
                      className="text-gray-500 h-4 w-4 cursor-pointer"
                      onClick={() => handleUnpinClick(campaign)}
                    />
                  ) : null}
                  <button
                    className="flex items-center ml-2"
                    onClick={() => toggleExpandCampaign(campaign.id)} // Toggle only this campaign
                  >
                    {isExpandedCampaign ? (
                      <ChevronDown className="mr-1 h-4 w-4" />
                    ) : (
                      <ChevronRight className="mr-1 h-4 w-4" />
                    )}
                    {campaign.name}
                  </button>
                </TableCell>
                <TableCell className="text-right">
                    <StatusCell status={campaign.status} /> {/* Default isCampaign=true */}
                  </TableCell>

                <TableCell>{campaign.visits}</TableCell>
                <TableCell className="flex items-center space-x-2 text-blue-500 font-regular hover:underline">
                  <span>Edit</span>
                  <Edit className="h-3 w-3" />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-6 w-6 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {pinnedRows.includes(campaign.id) ? (
                        <DropdownMenuItem onClick={() => handleUnpinClick(campaign)}>Unpin</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => handlePin(campaign.id)}>Pin</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>

                  {isExpandedCampaign &&
                        campaign.adSets?.map((adSet) => {
                          const isExpandedAdSet = expandedAdSetIds.includes(adSet.id);
                          return (
                            <React.Fragment key={adSet.id}>
                              <TableRow className="bg-[#F9FAFB]">
                                <TableCell className="pl-8">
                                  <button
                                    className="flex items-center"
                                    onClick={() => toggleExpandAdSet(adSet.id)} // Toggle this ad set
                                  >
                                    {isExpandedAdSet ? (
                                      <ChevronDown className="mr-1 h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="mr-1 h-4 w-4" />
                                    )}
                                    {adSet.name}
                                  </button>
                                </TableCell>
                                <TableCell className="text-right">
                                    <StatusCell status={adSet.status} isCampaign={false} /> {/* No background */}
                                  </TableCell>


                                <TableCell>{adSet.visits}</TableCell>
                                <TableCell className="w-[40px]"></TableCell>
                              </TableRow>

                              {isExpandedAdSet &&
                                adSet.ads?.map((ad) => (
                                  <TableRow key={ad.id} className="bg-[#F9FAFB]">
                                    <TableCell className="pl-12">{ad.name}</TableCell>
                                    <TableCell className="text-right">
                                        <StatusCell status={ad.status} isCampaign={false} /> {/* No background */}
                                      </TableCell>

                                    <TableCell>{ad.visits}</TableCell>
                                    <TableCell className="w-[40px]"></TableCell>
                                  </TableRow>
                                ))}
                            </React.Fragment>
                          );
                        })}

                              </React.Fragment>
                            );
                          })}
                        </>
                      );
                    };

  // Render only ad sets with expandable ads for Ad Sets tab
  const renderAdSets = () => {
    const allAdSets = campaignsData.flatMap((campaign) => campaign.adSets || []);

    return (
      <>
        {allAdSets.map((adSet) => {
          const isExpandedAdSet = expandedAdSetIds.includes(adSet.id);
          return (
            <React.Fragment key={adSet.id}>
              <TableRow>
                <TableCell className="flex items-center space-x-2 font-medium">
                  <button
                    className="flex items-center ml-2"
                    onClick={() => toggleExpandAdSet(adSet.id)} // Toggle only this ad set
                  >
                    {isExpandedAdSet ? (
                      <ChevronDown className="mr-1 h-4 w-4" />
                    ) : (
                      <ChevronRight className="mr-1 h-4 w-4" />
                    )}
                    {adSet.name}
                  </button>
                </TableCell>
                <TableCell>
                    <StatusCell status={adSet.status} />
                  </TableCell>
                <TableCell>{adSet.visits}</TableCell>
                <TableCell className="w-[40px]"></TableCell>
              </TableRow>

              {isExpandedAdSet &&
                adSet.ads?.map((ad) => (
                  <TableRow key={ad.id} className="bg-[#F9FAFB]">
                    <TableCell className="pl-12">{ad.name}</TableCell>
                    <TableCell className="text-right">
                        <StatusCell status={ad.status} isCampaign={false} /> {/* No background */}
                      </TableCell>

                    <TableCell>{ad.visits}</TableCell>
                    <TableCell className="w-[40px]"></TableCell>
                  </TableRow>
                ))}
            </React.Fragment>
          );
        })}
      </>
    );
  };

  // Render only ads for Ads tab
  const renderAds = () => {
    const allAds = campaignsData.flatMap((campaign) =>
      campaign.adSets?.flatMap((adSet) => adSet.ads || []) || []
    );

    return (
      <>
        {allAds.map((ad) => (
          <TableRow key={ad.id}>
            <TableCell className="font-medium">{ad.name}</TableCell>
            <TableCell className='text-right'>
                <StatusCell status={ad.status} />
              </TableCell>
            <TableCell>{ad.visits}</TableCell>
            <TableCell className="w-[40px]"></TableCell>
          </TableRow>
        ))}
      </>
    );
  };

  return (
    <div className="col-span-2 bg-white border-gray-200 rounded-xl border p-5 space-y-3">
      <h2 className="text-xl font-medium tracking-tight">Ad Links</h2>
      <Tabs defaultValue="campaigns" className="fit space-y-4">
        <TabsList className="w-full">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="adSets">Ad Sets</TabsTrigger>
          <TabsTrigger value="ads">Ads</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns">
          <div className="h-full w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort('name')}>
                    <div className="flex items-center space-x-1">
                      <span>Links</span>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.1813 1.68179C7.35704 1.50605 7.64196 1.50605 7.8177 1.68179L10.3177 4.18179C10.4934 4.35753 10.4934 4.64245 10.3177 4.81819C10.142 4.99392 9.85704 4.99392 9.6813 4.81819L7.9495 3.08638L7.9495 11.9136L9.6813 10.1818C9.85704 10.0061 10.142 10.0061 10.3177 10.1818C10.4934 10.3575 10.4934 10.6424 10.3177 10.8182L7.8177 13.3182C7.73331 13.4026 7.61885 13.45 7.4995 13.45C7.38015 13.45 7.26569 13.4026 7.1813 13.3182L4.6813 10.8182C4.50557 10.6424 4.50557 10.3575 4.6813 10.1818C4.85704 10.0061 5.14196 10.0061 5.3177 10.1818L7.0495 11.9136L7.0495 3.08638L5.3177 4.81819C5.14196 4.99392 4.85704 4.99392 4.6813 4.81819C4.50557 4.64245 4.50557 4.35753 4.6813 4.18179L7.1813 1.68179Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort('status')}>
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.1813 1.68179C7.35704 1.50605 7.64196 1.50605 7.8177 1.68179L10.3177 4.18179C10.4934 4.35753 10.4934 4.64245 10.3177 4.81819C10.142 4.99392 9.85704 4.99392 9.6813 4.81819L7.9495 3.08638L7.9495 11.9136L9.6813 10.1818C9.85704 10.0061 10.142 10.0061 10.3177 10.1818C10.4934 10.3575 10.4934 10.6424 10.3177 10.8182L7.8177 13.3182C7.73331 13.4026 7.61885 13.45 7.4995 13.45C7.38015 13.45 7.26569 13.4026 7.1813 13.3182L4.6813 10.8182C4.50557 10.6424 4.50557 10.3575 4.6813 10.1818C4.85704 10.0061 5.14196 10.0061 5.3177 10.1818L7.0495 11.9136L7.0495 3.08638L5.3177 4.81819C5.14196 4.99392 4.85704 4.99392 4.6813 4.81819C4.50557 4.64245 4.50557 4.35753 4.6813 4.18179L7.1813 1.68179Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort('visits')}>
                    <div className="flex items-center space-x-1">
                      <span>Visits</span>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.1813 1.68179C7.35704 1.50605 7.64196 1.50605 7.8177 1.68179L10.3177 4.18179C10.4934 4.35753 10.4934 4.64245 10.3177 4.81819C10.142 4.99392 9.85704 4.99392 9.6813 4.81819L7.9495 3.08638L7.9495 11.9136L9.6813 10.1818C9.85704 10.0061 10.142 10.0061 10.3177 10.1818C10.4934 10.3575 10.4934 10.6424 10.3177 10.8182L7.8177 13.3182C7.73331 13.4026 7.61885 13.45 7.4995 13.45C7.38015 13.45 7.26569 13.4026 7.1813 13.3182L4.6813 10.8182C4.50557 10.6424 4.50557 10.3575 4.6813 10.1818C4.85704 10.0061 5.14196 10.0061 5.3177 10.1818L7.0495 11.9136L7.0495 3.08638L5.3177 4.81819C5.14196 4.99392 4.85704 4.99392 4.6813 4.81819C4.50557 4.64245 4.50557 4.35753 4.6813 4.18179L7.1813 1.68179Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </TableHead>
                  <TableHead>Manage</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{renderCampaigns()}</TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="adSets">
          <div className="h-full w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort('name')}>
                    <div className="flex items-center space-x-1">
                      <span>Links</span>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.1813 1.68179C7.35704 1.50605 7.64196 1.50605 7.8177 1.68179L10.3177 4.18179C10.4934 4.35753 10.4934 4.64245 10.3177 4.81819C10.142 4.99392 9.85704 4.99392 9.6813 4.81819L7.9495 3.08638L7.9495 11.9136L9.6813 10.1818C9.85704 10.0061 10.142 10.0061 10.3177 10.1818C10.4934 10.3575 10.4934 10.6424 10.3177 10.8182L7.8177 13.3182C7.73331 13.4026 7.61885 13.45 7.4995 13.45C7.38015 13.45 7.26569 13.4026 7.1813 13.3182L4.6813 10.8182C4.50557 10.6424 4.50557 10.3575 4.6813 10.1818C4.85704 10.0061 5.14196 10.0061 5.3177 10.1818L7.0495 11.9136L7.0495 3.08638L5.3177 4.81819C5.14196 4.99392 4.85704 4.99392 4.6813 4.81819C4.50557 4.64245 4.50557 4.35753 4.6813 4.18179L7.1813 1.68179Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort('status')}>
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.1813 1.68179C7.35704 1.50605 7.64196 1.50605 7.8177 1.68179L10.3177 4.18179C10.4934 4.35753 10.4934 4.64245 10.3177 4.81819C10.142 4.99392 9.85704 4.99392 9.6813 4.81819L7.9495 3.08638L7.9495 11.9136L9.6813 10.1818C9.85704 10.0061 10.142 10.0061 10.3177 10.1818C10.4934 10.3575 10.4934 10.6424 10.3177 10.8182L7.8177 13.3182C7.73331 13.4026 7.61885 13.45 7.4995 13.45C7.38015 13.45 7.26569 13.4026 7.1813 13.3182L4.6813 10.8182C4.50557 10.6424 4.50557 10.3575 4.6813 10.1818C4.85704 10.0061 5.14196 10.0061 5.3177 10.1818L7.0495 11.9136L7.0495 3.08638L5.3177 4.81819C5.14196 4.99392 4.85704 4.99392 4.6813 4.81819C4.50557 4.64245 4.50557 4.35753 4.6813 4.18179L7.1813 1.68179Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort('visits')}>
                    <div className="flex items-center space-x-1">
                      <span>Visits</span>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.1813 1.68179C7.35704 1.50605 7.64196 1.50605 7.8177 1.68179L10.3177 4.18179C10.4934 4.35753 10.4934 4.64245 10.3177 4.81819C10.142 4.99392 9.85704 4.99392 9.6813 4.81819L7.9495 3.08638L7.9495 11.9136L9.6813 10.1818C9.85704 10.0061 10.142 10.0061 10.3177 10.1818C10.4934 10.3575 10.4934 10.6424 10.3177 10.8182L7.8177 13.3182C7.73331 13.4026 7.61885 13.45 7.4995 13.45C7.38015 13.45 7.26569 13.4026 7.1813 13.3182L4.6813 10.8182C4.50557 10.6424 4.50557 10.3575 4.6813 10.1818C4.85704 10.0061 5.14196 10.0061 5.3177 10.1818L7.0495 11.9136L7.0495 3.08638L5.3177 4.81819C5.14196 4.99392 4.85704 4.99392 4.6813 4.81819C4.50557 4.64245 4.50557 4.35753 4.6813 4.18179L7.1813 1.68179Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </TableHead>
                  <TableHead>Manage</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{renderAdSets()}</TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="ads">
          <div className="h-full w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort('name')}>
                    <div className="flex items-center space-x-1">
                      <span>Links</span>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.1813 1.68179C7.35704 1.50605 7.64196 1.50605 7.8177 1.68179L10.3177 4.18179C10.4934 4.35753 10.4934 4.64245 10.3177 4.81819C10.142 4.99392 9.85704 4.99392 9.6813 4.81819L7.9495 3.08638L7.9495 11.9136L9.6813 10.1818C9.85704 10.0061 10.142 10.0061 10.3177 10.1818C10.4934 10.3575 10.4934 10.6424 10.3177 10.8182L7.8177 13.3182C7.73331 13.4026 7.61885 13.45 7.4995 13.45C7.38015 13.45 7.26569 13.4026 7.1813 13.3182L4.6813 10.8182C4.50557 10.6424 4.50557 10.3575 4.6813 10.1818C4.85704 10.0061 5.14196 10.0061 5.3177 10.1818L7.0495 11.9136L7.0495 3.08638L5.3177 4.81819C5.14196 4.99392 4.85704 4.99392 4.6813 4.81819C4.50557 4.64245 4.50557 4.35753 4.6813 4.18179L7.1813 1.68179Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort('status')}>
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.1813 1.68179C7.35704 1.50605 7.64196 1.50605 7.8177 1.68179L10.3177 4.18179C10.4934 4.35753 10.4934 4.64245 10.3177 4.81819C10.142 4.99392 9.85704 4.99392 9.6813 4.81819L7.9495 3.08638L7.9495 11.9136L9.6813 10.1818C9.85704 10.0061 10.142 10.0061 10.3177 10.1818C10.4934 10.3575 10.4934 10.6424 10.3177 10.8182L7.8177 13.3182C7.73331 13.4026 7.61885 13.45 7.4995 13.45C7.38015 13.45 7.26569 13.4026 7.1813 13.3182L4.6813 10.8182C4.50557 10.6424 4.50557 10.3575 4.6813 10.1818C4.85704 10.0061 5.14196 10.0061 5.3177 10.1818L7.0495 11.9136L7.0495 3.08638L5.3177 4.81819C5.14196 4.99392 4.85704 4.99392 4.6813 4.81819C4.50557 4.64245 4.50557 4.35753 4.6813 4.18179L7.1813 1.68179Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort('visits')}>
                    <div className="flex items-center space-x-1">
                      <span>Visits</span>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.1813 1.68179C7.35704 1.50605 7.64196 1.50605 7.8177 1.68179L10.3177 4.18179C10.4934 4.35753 10.4934 4.64245 10.3177 4.81819C10.142 4.99392 9.85704 4.99392 9.6813 4.81819L7.9495 3.08638L7.9495 11.9136L9.6813 10.1818C9.85704 10.0061 10.142 10.0061 10.3177 10.1818C10.4934 10.3575 10.4934 10.6424 10.3177 10.8182L7.8177 13.3182C7.73331 13.4026 7.61885 13.45 7.4995 13.45C7.38015 13.45 7.26569 13.4026 7.1813 13.3182L4.6813 10.8182C4.50557 10.6424 4.50557 10.3575 4.6813 10.1818C4.85704 10.0061 5.14196 10.0061 5.3177 10.1818L7.0495 11.9136L7.0495 3.08638L5.3177 4.81819C5.14196 4.99392 4.85704 4.99392 4.6813 4.81819C4.50557 4.64245 4.50557 4.35753 4.6813 4.18179L7.1813 1.68179Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </TableHead>
                  <TableHead>Manage</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{renderAds()}</TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Unpin Confirmation Dialog */}
      {campaignToUnpin && (
        <Dialog open={confirmationDialogOpen} onOpenChange={setConfirmationDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Unpin Campaign</DialogTitle>
            </DialogHeader>
            <p>
              Are you sure you want to unpin the campaign <strong>{campaignToUnpin.name}</strong>?
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmationDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleUnpinCampaign}>
                Unpin
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdLinksTable;
