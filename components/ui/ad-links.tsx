import React, { useState } from 'react';
import { Pin, MoreHorizontal, ChevronRight, ChevronDown, Edit } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input"; // Import ShadCN Input component


// Example data structure
interface Ad {
  id: string;
  name: string;
  status: string;
  visits: number;
  asin?: string;
  link?: string;
  pinned?: boolean;
}

interface AdSet {
  id: string;
  name: string;
  status: string;
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
          { id: '1-1-1', name: 'Ad 1-1-1', status: 'ACTIVE', visits: 200, asin: 'B0CF9VJYK4', link: 'social.savana-games.com/r/obj' },
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
          { id: '2-1-1', name: 'Ad 2-1-1', status: 'INACTIVE', visits: 150, asin: 'B0CF9VJYK4', link: 'social.savana-games.com/r/abc' },
        ],
      },
    ],
  },
];

// Status cell component
const StatusCell: React.FC<{ status: string; isCampaign?: boolean }> = ({ status, isCampaign = true }) => {
  const isActive = status === 'ACTIVE';

  return (
    <div className={`flex items-center w-fit space-x-2 ${isCampaign ? (isActive ? 'bg-[#e6fce8] text-green-700' : 'bg-red-100 text-red-600') : ''} px-2 py-1 rounded-full`}>
      <span className="text-[12px] font-medium">{isActive ? 'Active' : 'Inactive'}</span>
      <div className="relative flex items-center justify-center">
        <div className={`h-2 w-2 rounded-full ${isActive ? 'bg-green-700' : 'bg-red-600'}`}></div>
      </div>
    </div>
  );
};

// Utility function to copy the link to the clipboard
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    alert('Link copied to clipboard!');
  });
};

const AdLinksTable: React.FC = () => {
  const [pinnedRows, setPinnedRows] = useState<string[]>([]);
  const [expandedCampaignIds, setExpandedCampaignIds] = useState<string[]>([]);
  const [expandedAdSetIds, setExpandedAdSetIds] = useState<string[]>([]);
  const [campaignToUnpin, setCampaignToUnpin] = useState<Campaign | null>(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Add state for search
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | null }>({
    key: 'name',
    direction: 'asc',
  });

    // Filter function for search
  const filterBySearch = (item: Campaign | AdSet | Ad) => {
    const query = searchQuery.toLowerCase();
    return item.name.toLowerCase().includes(query);
  };

  // Pin/unpin functionality
  const handlePin = (rowId: string) => {
    setPinnedRows((prev) => (prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [rowId, ...prev]));
  };

  const handleUnpinClick = (row: Campaign | Ad) => {
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
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

    // Sorting icon component
    const SortingIcon = ({ keyName }: { keyName: string }) => {
      return (
        <span className="ml-1">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transform ${
              sortConfig.key === keyName && sortConfig.direction === 'asc' ? 'rotate-180' : ''
            }`}
          >
            <path
              d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
              fill="currentColor"
            />
          </svg>
        </span>
      );
    };

  // Render campaigns with expandable ad sets and ads
  const renderCampaigns = () => {
    
    // Sort campaigns based on the selected sortConfig
    const sortedCampaigns = [...campaignsData].sort((a, b) => {

      const aPinned = pinnedRows.includes(a.id);
      const bPinned = pinnedRows.includes(b.id);

      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;

      const directionMultiplier = sortConfig.direction === 'asc' ? 1 : -1;

      if (sortConfig.key === 'name') {
        return a.name.localeCompare(b.name) * directionMultiplier;
      } else if (sortConfig.key === 'status') {
        return a.status.localeCompare(b.status) * directionMultiplier;
      } else if (sortConfig.key === 'visits') {
        return (a.visits - b.visits) * directionMultiplier;
      } else if (sortConfig.key === 'sales') {
        return (Math.floor(a.visits * 0.1) - Math.floor(b.visits * 0.1)) * directionMultiplier;
      }

      return 0; // default no sorting
    });
  
    return (
      <>
        {sortedCampaigns.map((campaign) => {
          const isExpandedCampaign = expandedCampaignIds.includes(campaign.id);
          return (
            <React.Fragment key={campaign.id}>
              <TableRow>
              <TableCell className="space-x-2 font-medium">
                <div className="flex items-center">
                  {pinnedRows.includes(campaign.id) && (
                    <Pin className="text-gray-500 h-4 w-4 cursor-pointer mr-2" onClick={() => handleUnpinClick(campaign)} />
                  )}
                  <button
                    className="flex items-center"
                    onClick={() =>
                      setExpandedCampaignIds((prev) =>
                        prev.includes(campaign.id) ? prev.filter((id) => id !== campaign.id) : [...prev, campaign.id]
                      )
                    }
                  >
                    {isExpandedCampaign ? <ChevronDown className="mr-1 h-4 w-4" /> : <ChevronRight className="mr-1 h-4 w-4" />}
                    {campaign.name}
                  </button>
                </div>
              </TableCell>

                <TableCell className="text-right">
                  <StatusCell status={campaign.status} />
                </TableCell>
                <TableCell>{campaign.visits}</TableCell>
                <TableCell>{Math.floor(campaign.visits * 0.1)}</TableCell>
                <TableCell></TableCell>
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
                            onClick={() =>
                              setExpandedAdSetIds((prev) =>
                                prev.includes(adSet.id) ? prev.filter((id) => id !== adSet.id) : [...prev, adSet.id]
                              )
                            }
                          >
                            {isExpandedAdSet ? <ChevronDown className="mr-1 h-4 w-4" /> : <ChevronRight className="mr-1 h-4 w-4" />}
                            {adSet.name}
                          </button>
                        </TableCell>
                        <TableCell className="text-right">
                          <StatusCell status={adSet.status} isCampaign={false} />
                        </TableCell>
                        <TableCell>{adSet.visits}</TableCell>
                        <TableCell>{Math.floor(adSet.visits * 0.1)}</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
  
                      {isExpandedAdSet &&
                        adSet.ads?.map((ad) => (
                          <TableRow key={ad.id} className="bg-[#F9FAFB]">
                            <TableCell className="pl-16">{ad.name}</TableCell>
                            <TableCell className="text-right">
                              <StatusCell status={ad.status} isCampaign={false} />
                            </TableCell>
                            <TableCell>{ad.visits}</TableCell>
                            <TableCell>{Math.floor(ad.visits * 0.1)}</TableCell>
                            <TableCell>
                              <button className="flex items-center space-x-2">
                                <span className="text-blue-500">Edit</span>
                                <Edit className="text-blue-500 h-3 w-3" />
                              </button>
                            </TableCell>
                            <TableCell></TableCell>
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
  
  

  // Render ad sets for Ad Sets tab
  const renderAdSets = () => {
    // Flatten all ad sets from campaignsData
    const allAdSets = campaignsData.flatMap((campaign) => campaign.adSets || []);
  
    // Sort ad sets based on the selected sortConfig and pin status
    const sortedAdSets = [...allAdSets].sort((a, b) => {
      const aPinned = pinnedRows.includes(a.id);
      const bPinned = pinnedRows.includes(b.id);
  
      // Pinned ad sets should appear at the top
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
  
      // Sorting logic
      const directionMultiplier = sortConfig.direction === 'asc' ? 1 : -1;
  
      if (sortConfig.key === 'name') {
        return a.name.localeCompare(b.name) * directionMultiplier;
      } else if (sortConfig.key === 'status') {
        return a.status.localeCompare(b.status) * directionMultiplier;
      } else if (sortConfig.key === 'visits') {
        return (a.visits - b.visits) * directionMultiplier;
      } else if (sortConfig.key === 'sales') {
        return (Math.floor(a.visits * 0.1) - Math.floor(b.visits * 0.1)) * directionMultiplier;
      }
  
      return 0; // default no sorting
    });
  
    return (
      <>
        {sortedAdSets.map((adSet) => {
          const isExpandedAdSet = expandedAdSetIds.includes(adSet.id);
          return (
            <React.Fragment key={adSet.id}>
              <TableRow>
                <TableCell className="space-x-2 font-medium">
                  <div className="flex items-center">
                    {pinnedRows.includes(adSet.id) && (
                      <Pin className="text-gray-500 h-4 w-4 cursor-pointer mr-2" onClick={() => handleUnpinClick(adSet)} />
                    )}
                    <button
                      className="flex items-center"
                      onClick={() =>
                        setExpandedAdSetIds((prev) =>
                          prev.includes(adSet.id) ? prev.filter((id) => id !== adSet.id) : [...prev, adSet.id]
                        )
                      }
                    >
                      {isExpandedAdSet ? <ChevronDown className="mr-1 h-4 w-4" /> : <ChevronRight className="mr-1 h-4 w-4" />}
                      {adSet.name}
                    </button>
                  </div>
                </TableCell>
  
                <TableCell className="text-right">
                  <StatusCell status={adSet.status} />
                </TableCell>
                <TableCell>{adSet.visits}</TableCell>
                <TableCell>{Math.floor(adSet.visits * 0.1)}</TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-6 w-6 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {pinnedRows.includes(adSet.id) ? (
                        <DropdownMenuItem onClick={() => handleUnpinClick(adSet)}>Unpin</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => handlePin(adSet.id)}>Pin</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
  
              {isExpandedAdSet &&
                adSet.ads?.map((ad) => (
                  <TableRow key={ad.id} className="bg-[#F9FAFB]">
                    <TableCell className="pl-12">{ad.name}</TableCell>
                    <TableCell className="text-right">
                      <StatusCell status={ad.status} isCampaign={false} />
                    </TableCell>
                    <TableCell>{ad.visits}</TableCell>
                    <TableCell>{Math.floor(ad.visits * 0.1)}</TableCell>
                    <TableCell>
                      <button className="flex items-center space-x-2">
                        <span className="text-blue-500">Edit</span>
                        <Edit className="text-blue-500 h-3 w-3" />
                      </button>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
            </React.Fragment>
          );
        })}
      </>
    );
  };
  
  
  

  const renderAds = () => {
    const allAds = campaignsData.flatMap((campaign) => campaign.adSets?.flatMap((adSet) => adSet.ads || []) || []);
  
    const sortedAds = [...allAds].sort((a, b) => {
      const aPinned = pinnedRows.includes(a.id);
      const bPinned = pinnedRows.includes(b.id);
  
      // Pinned ads should appear at the top
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
  
      // Apply sorting logic based on sortConfig
      const directionMultiplier = sortConfig.direction === 'asc' ? 1 : -1;
  
      if (sortConfig.key === 'name') {
        return a.name.localeCompare(b.name) * directionMultiplier;
      } else if (sortConfig.key === 'link') {
        return (a.link || '').localeCompare(b.link || '') * directionMultiplier;
      } else if (sortConfig.key === 'status') {
        return a.status.localeCompare(b.status) * directionMultiplier;
      } else if (sortConfig.key === 'visits') {
        return (a.visits - b.visits) * directionMultiplier;
      } else if (sortConfig.key === 'sales') {
        return (Math.floor(a.visits * 0.1) - Math.floor(b.visits * 0.1)) * directionMultiplier;
      }
  
      return 0;
    });
  
    return (
      <>
        {sortedAds.map((ad) => (
          <TableRow key={ad.id}>
            <TableCell className="font-medium">
              <div className="flex items-center">
                {pinnedRows.includes(ad.id) && (
                  <Pin
                    className="text-gray-500 h-4 w-4 mr-2 cursor-pointer"
                    onClick={() => handleUnpinClick(ad)} // Trigger the unpin confirmation dialog
                  />
                )}
                {ad.name}
              </div>
            </TableCell>
  
            {/* Ad Link with copy icon */}
            <TableCell className="space-x-2">
              <span className="text-blue-500">{ad.link || 'No Link'}</span>
              <button className="items-center" onClick={() => ad.link && copyToClipboard(ad.link)}>
                <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006V2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                    fill="#7E828A"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </TableCell>
  
            {/* ASIN Targeted */}
            <TableCell className="font-regular">
              <span>{ad.asin || 'N/A'}</span>
            </TableCell>
  
            {/* Status */}
            <TableCell className="text-right">
              <StatusCell status={ad.status} />
            </TableCell>
  
            {/* Visits */}
            <TableCell>{ad.visits}</TableCell>
  
            {/* Attributed Sales */}
            <TableCell>{Math.floor(ad.visits * 0.1)}</TableCell>
  
            {/* Manage */}
            <TableCell>
              <button className="flex items-center space-x-2">
                <span className="text-blue-500">Edit</span>
                <Edit className="text-blue-500 h-3 w-3" />
              </button>
            </TableCell>
  
            {/* Pin/Unpin */}
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-6 w-6 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {pinnedRows.includes(ad.id) ? (
                    // Trigger unpin confirmation dialog when "Unpin" is clicked
                    <DropdownMenuItem onClick={() => handleUnpinClick(ad)}>Unpin</DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={() => handlePin(ad.id)}>Pin</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  };
  
  
  

  return (
    <div className="col-span-2 bg-white border-gray-200 rounded-xl border p-5 space-y-3 h-full">
      <h2 className="text-xl font-medium tracking-tight">Ad Links</h2>
  
  
      {/* Tabs Component */}
      <Tabs defaultValue="campaigns" className="fit space-y-4">
        {/* Tabs List */}
        <TabsList className="w-full">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="adSets">Ad Sets</TabsTrigger>
          <TabsTrigger value="ads">Ads</TabsTrigger>
          <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ml-auto w-1/6" // Adjust width as needed
        />
        </TabsList>
  
        {/* Campaigns Tab */}
        <TabsContent value="campaigns">
          <div className="h-full w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort('name')}>
                    <button className="flex items-center">
                      Name <SortingIcon keyName="name" />
                    </button>
                  </TableHead>
                  <TableHead onClick={() => handleSort('status')}>
                    <button className="flex items-center">
                      Status <SortingIcon keyName="status" />
                    </button>
                  </TableHead>
                  <TableHead onClick={() => handleSort('visits')}>
                    <button className="flex items-center">
                      Visits <SortingIcon keyName="visits" />
                    </button>
                  </TableHead>
                  <TableHead onClick={() => handleSort('sales')}>
                    <button className="flex items-center">
                      Attributed Sales <SortingIcon keyName="sales" />
                    </button>
                  </TableHead>
                  <TableHead>Manage Ad Link</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{renderCampaigns()}</TableBody>
            </Table>
          </div>
        </TabsContent>
  
        {/* AdSets Tab */}
        <TabsContent value="adSets">
          <div className="h-full w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort('name')}>
                    <button className="flex items-center">
                      Name <SortingIcon keyName="name" />
                    </button>
                  </TableHead>
                  <TableHead onClick={() => handleSort('status')}>
                    <button className="flex items-center">
                      Status <SortingIcon keyName="status" />
                    </button>
                  </TableHead>
                  <TableHead onClick={() => handleSort('visits')}>
                    <button className="flex items-center">
                      Visits <SortingIcon keyName="visits" />
                    </button>
                  </TableHead>
                  <TableHead onClick={() => handleSort('sales')}>
                    <button className="flex items-center">
                      Attributed Sales <SortingIcon keyName="sales" />
                    </button>
                  </TableHead>
                  <TableHead>Manage Ad Link</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{renderAdSets()}</TableBody> {/* Ensure AdSets are rendered here */}
            </Table>
          </div>
        </TabsContent>
  
        {/* Ads Tab */}
        <TabsContent value="ads">
          <div className="h-full w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort('name')}>
                    <button className="flex items-center">
                      Name <SortingIcon keyName="name" />
                    </button>
                  </TableHead>
                  <TableHead onClick={() => handleSort('link')}>
                    <button className="flex items-center">
                      Ad Link <SortingIcon keyName="link" />
                    </button>
                  </TableHead>
                  <TableHead>ASIN Targeted</TableHead>
                  <TableHead onClick={() => handleSort('status')}>
                    <button className="flex items-center">
                      Status <SortingIcon keyName="status" />
                    </button>
                  </TableHead>
                  <TableHead onClick={() => handleSort('visits')}>
                    <button className="flex items-center">
                      Visits <SortingIcon keyName="visits" />
                    </button>
                  </TableHead>
                  <TableHead onClick={() => handleSort('sales')}>
                    <button className="flex items-center">
                      Attributed Sales <SortingIcon keyName="sales" />
                    </button>
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
