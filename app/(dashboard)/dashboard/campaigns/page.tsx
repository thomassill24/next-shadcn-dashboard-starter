'use client';

import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CampaignsTable } from '@/components/tables/campaigns-table/campaigns-table';
import { columns } from '@/components/tables/campaigns-table/columns'; 
import { AdSetsTable } from '@/components/tables/adsets-table/adsets-table';
import { columnsAdSets } from '@/components/tables/adsets-table/columns';
import { AdsTable } from '@/components/tables/ads-table/ads-table';
import { columnsAds } from '@/components/tables/ads-table/columns';

export default function Page() {
  const [data, setData] = useState([]);
  const [adSetsData, setAdSetsData] = useState([]);
  const [adsData, setAdsData] = useState([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const result = await getEmployeeData();
      const allAdSets = result.flatMap(campaign => campaign.adSets || []);
      const allAds = allAdSets.flatMap(adSet => adSet.ads || []);
      
      setData(result);  // Campaigns Table Data
      setAdSetsData(allAdSets); // Ad Sets Table Data
      setAdsData(allAds); // Ads Table Data
      setTotalUsers(allAds.length); // Set the count of total ads
    }

    fetchData();
  }, []);

  async function getEmployeeData() {
    // Simulate an API call
    return [
      {
        id: '1',
        name: 'TAB_UK_1',
        spend: 1245,
        metaRoas: 4.6,
        roas: 5.4,
        clicks: 871,
        orders: 17,
        adSets: [
          {
            id: '1-1',
            name: 'AD_SET_TAB_UK_1-1',
            spend: 354,
            metaRoas: 1.67,
            roas: 3.45,
            clicks: 234,
            orders: 8,
            ads: [
              {
                id: '1-1-1',
                name: 'AD_TAB_UK_1-1_1',
                spend: 120,
                metaRoas: 1.8,
                roas: 2.9,
                clicks: 78,
                orders: 4,
              },
              {
                id: '1-1-2',
                name: 'AD_TAB_UK_1-1_2',
                spend: 234,
                metaRoas: 1.45,
                roas: 3.2,
                clicks: 156,
                orders: 4,
              },
            ],
          },
          {
            id: '1-2',
            name: 'AD_SET_TAB_UK_1-2',
            spend: 280,
            metaRoas: 1.85,
            roas: 2.75,
            clicks: 200,
            orders: 5,
            ads: [
              {
                id: '1-2-1',
                name: 'AD_TAB_UK_1-2_1',
                spend: 140,
                metaRoas: 2.1,
                roas: 3.0,
                clicks: 100,
                orders: 2,
              },
              // More ads...
            ],
          },
          // More adSets...
        ],
      },
      {
        id: '2',
        name: 'TAB_UK_2',
        spend: 1246,
        metaRoas: 2.6,
        roas: 3.4,
        clicks: 870,
        orders: 15,
        adSets: [
          {
            id: '2-1',
            name: 'AD_SET_TAB_UK_2_1',
            spend: 354,
            metaRoas: 1.67,
            roas: 3.45,
            clicks: 234,
            orders: 8,
            ads: [
              {
                id: '2-1-1',
                name: 'AD_TAB_UK_2_1_1',
                spend: 120,
                metaRoas: 1.8,
                roas: 2.9,
                clicks: 78,
                orders: 4,
              },
              {
                id: '2-1-2',
                name: 'AD_TAB_UK_2_1_2',
                spend: 234,
                metaRoas: 1.45,
                roas: 3.2,
                clicks: 156,
                orders: 4,
              },
            ],
          },
          {
            id: '2-2',
            name: 'AD_SET_TAB_UK_2_2',
            spend: 280,
            metaRoas: 1.85,
            roas: 2.75,
            clicks: 200,
            orders: 5,
            ads: [
              {
                id: '1-2-1',
                name: 'AD_TAB_UK_2_2_1',
                spend: 140,
                metaRoas: 2.1,
                roas: 3.0,
                clicks: 100,
                orders: 2,
              },

            ],
          },

        ],
      },
      {
        id: '3',
        name: 'TAB_UK_3',
        spend: 1246,
        metaRoas: 2.6,
        roas: 3.4,
        clicks: 870,
        orders: 15,
        adSets: [
          {
            id: '3-1',
            name: 'AD_SET_TAB_UK_3_1',
            spend: 354,
            metaRoas: 1.67,
            roas: 3.45,
            clicks: 234,
            orders: 8,
            ads: [
              {
                id: '3-1-1',
                name: 'AD_TAB_UK_3_1_1',
                spend: 120,
                metaRoas: 1.8,
                roas: 2.9,
                clicks: 78,
                orders: 4,
              },
              {
                id: '3-1-2',
                name: 'AD_TAB_UK_3_1_2',
                spend: 234,
                metaRoas: 1.45,
                roas: 3.2,
                clicks: 156,
                orders: 4,
              },
            ],
          },
          {
            id: '3-2',
            name: 'AD_SET_TAB_UK_3_2',
            spend: 280,
            metaRoas: 1.85,
            roas: 2.75,
            clicks: 200,
            orders: 5,
            ads: [
              {
                id: '3-2-1',
                name: 'AD_TAB_UK_3_2_1',
                spend: 140,
                metaRoas: 2.1,
                roas: 3.0,
                clicks: 100,
                orders: 2,
              },

            ],
          },

        ],
      },
      {
        id: '4',
        name: 'TAB_UK_4',
        spend: 1246,
        metaRoas: 2.6,
        roas: 3.4,
        clicks: 870,
        orders: 15,
        adSets: [
          {
            id: '4-1',
            name: 'AD_SET_TAB_UK_4_1',
            spend: 354,
            metaRoas: 1.67,
            roas: 3.45,
            clicks: 234,
            orders: 8,
            ads: [
              {
                id: '4-1-1',
                name: 'AD_TAB_UK_4_1_1',
                spend: 120,
                metaRoas: 1.8,
                roas: 2.9,
                clicks: 78,
                orders: 4,
              },
              {
                id: '4-1-2',
                name: 'AD_TAB_UK_4_1_2',
                spend: 234,
                metaRoas: 1.45,
                roas: 3.2,
                clicks: 156,
                orders: 4,
              },
            ],
          },
          {
            id: '4-2',
            name: 'AD_SET_TAB_UK_4_2',
            spend: 280,
            metaRoas: 1.85,
            roas: 2.75,
            clicks: 200,
            orders: 5,
            ads: [
              {
                id: '4-2-1',
                name: 'AD_TAB_UK_4_2_1',
                spend: 140,
                metaRoas: 2.1,
                roas: 3.0,
                clicks: 100,
                orders: 2,
              },

            ],
          },

        ],
      },
      {
        id: '5',
        name: 'TAB_UK_5',
        spend: 1246,
        metaRoas: 2.6,
        roas: 3.4,
        clicks: 870,
        orders: 15,
        adSets: [
          {
            id: '5-1',
            name: 'AD_SET_TAB_UK_5_1',
            spend: 354,
            metaRoas: 1.67,
            roas: 3.45,
            clicks: 234,
            orders: 8,
            ads: [
              {
                id: '5-1-1',
                name: 'AD_TAB_UK_5_1_1',
                spend: 120,
                metaRoas: 1.8,
                roas: 2.9,
                clicks: 78,
                orders: 4,
              },
              {
                id: '5-1-2',
                name: 'AD_TAB_UK_5_1_2',
                spend: 234,
                metaRoas: 1.45,
                roas: 3.2,
                clicks: 156,
                orders: 4,
              },
            ],
          },
          {
            id: '5-2',
            name: 'AD_SET_TAB_UK_5_2',
            spend: 280,
            metaRoas: 1.85,
            roas: 2.75,
            clicks: 200,
            orders: 5,
            ads: [
              {
                id: '5-2-1',
                name: 'AD_TAB_UK_5_2_1',
                spend: 140,
                metaRoas: 2.1,
                roas: 3.0,
                clicks: 100,
                orders: 2,
              },

            ],
          },

        ],
      },      
      {
        id: '6',
        name: 'TAB_UK_6',
        spend: 1246,
        metaRoas: 2.6,
        roas: 3.4,
        clicks: 870,
        orders: 15,
        adSets: [
          {
            id: '6-1',
            name: 'AD_SET_TAB_UK_6_1',
            spend: 354,
            metaRoas: 1.67,
            roas: 3.45,
            clicks: 234,
            orders: 8,
            ads: [
              {
                id: '6-1-1',
                name: 'AD_TAB_UK_6_1_1',
                spend: 120,
                metaRoas: 1.8,
                roas: 2.9,
                clicks: 78,
                orders: 4,
              },
              {
                id: '6-1-2',
                name: 'AD_TAB_UK_6_1_2',
                spend: 234,
                metaRoas: 1.45,
                roas: 3.2,
                clicks: 156,
                orders: 4,
              },
            ],
          },
          {
            id: '6-2',
            name: 'AD_SET_TAB_UK_6_2',
            spend: 280,
            metaRoas: 1.85,
            roas: 2.75,
            clicks: 200,
            orders: 5,
            ads: [
              {
                id: '6-2-1',
                name: 'AD_TAB_UK_6_2_1',
                spend: 140,
                metaRoas: 2.1,
                roas: 3.0,
                clicks: 100,
                orders: 2,
              },

            ],
          },

        ],
      },
      {
        id: '7',
        name: 'TAB_UK_7',
        spend: 1246,
        metaRoas: 2.6,
        roas: 3.4,
        clicks: 870,
        orders: 15,
      },
      {
        id: '8',
        name: 'TAB_UK_8',
        spend: 1246,
        metaRoas: 2.6,
        roas: 3.4,
        clicks: 870,
        orders: 15,
      },
      {
        id: '9',
        name: 'TAB_UK_9',
        spend: 1246,
        metaRoas: 2.6,
        roas: 3.4,
        clicks: 870,
        orders: 15,
      },
      {
        id: '10',
        name: 'TAB_UK_10',
        spend: 1246,
        metaRoas: 2.6,
        roas: 3.4,
        clicks: 870,
        orders: 15,
      },
      {
        id: '11',
        name: 'TAB_UK_11',
        spend: 1246,
        metaRoas: 2.6,
        roas: 3.4,
        clicks: 870,
        orders: 15,
      },
      {
        id: '12',
        name: 'TAB_UK_12',
        spend: 1246,
        metaRoas: 2.6,
        roas: 3.4,
        clicks: 870,
        orders: 15,
      },
      {
        id: '13',
        name: 'TAB_UK_13',
        spend: 1246,
        metaRoas: 2.6,
        roas: 3.4,
        clicks: 870,
        orders: 15,
        adSets: [
          {
            id: '13-1',
            name: 'AD_SET_TAB_UK_13_1',
            spend: 354,
            metaRoas: 1.67,
            roas: 3.45,
            clicks: 234,
            orders: 8,
            ads: [
              {
                id: '13-1-1',
                name: 'AD_TAB_UK_13_1_1',
                spend: 120,
                metaRoas: 1.8,
                roas: 2.9,
                clicks: 78,
                orders: 4,
              },
              {
                id: '13-1-2',
                name: 'AD_TAB_UK_13_1_2',
                spend: 234,
                metaRoas: 1.45,
                roas: 3.2,
                clicks: 156,
                orders: 4,
              },
            ],
          },
          {
            id: '13-2',
            name: 'AD_SET_TAB_UK_13_2',
            spend: 280,
            metaRoas: 1.85,
            roas: 2.75,
            clicks: 200,
            orders: 5,
            ads: [
              {
                id: '13-2-1',
                name: 'AD_TAB_UK_13_2_1',
                spend: 140,
                metaRoas: 2.1,
                roas: 3.0,
                clicks: 100,
                orders: 2,
              },

            ],
          },

        ],
      },
    ];
  }

  return (
    <ScrollArea className="h-full w-full">
      <div className="h-full flex-1 space-y-4 p-4 pt-6 md:p-8">
        <h2 className="text-3xl font-bold tracking-tight">Campaigns</h2>

        <Tabs defaultValue="campaigns" className="fit space-y-4">
          <TabsList>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="adSets">Ad Sets</TabsTrigger>
            <TabsTrigger value="ads">Ads</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns">
            <div className="h-full w-full">
              <CampaignsTable
                columns={columns}
                data={data} 
                searchKey="RoAS"
                totalUsers={totalUsers}
                pageCount={pageCount}
              />
            </div>
          </TabsContent>

          <TabsContent value="adSets">
            <div className="h-full w-full">
              <AdSetsTable
                columns={columnsAdSets}
                data={adSetsData} 
                searchKey="RoAS"
                totalUsers={totalUsers}
                pageCount={pageCount}
              />
            </div>
          </TabsContent>

          <TabsContent value="ads">
            <div className="h-full w-full">
              <AdsTable
                columns={columnsAds}
                data={adsData}
                searchKey="RoAS"
                totalUsers={totalUsers}
                pageCount={pageCount}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
