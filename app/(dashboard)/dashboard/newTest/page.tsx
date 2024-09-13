"use client";

import { useState } from "react";
import { CampaignsTable } from "@/components/tables/campaigns-table/campaigns-table";
import { columns } from "@/components/tables/campaigns-table/columns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaceIcon, ImageIcon, SunIcon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";


export default function Page() {
  const [data, setData] = useState([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);

  return (


    <ScrollArea className="h-screen">
      <div className="flex flex-col pl-[2rem] pr-[2rem] pb-[2rem] space-y-8 bg-[#f9fafb] h-full">
      

      {/* Title Bar */}
      <div className="w-full pt-8">
        <h2 className="text-3xl font-bold tracking-tight">New dashboard</h2>
      </div>



      {/* Main content section using a grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left side: Table (taking up 2/3 of space) */}
        <div className="col-span-2 flex flex-col space-y-4">
          <div className="flex-grow overflow-y-auto">
            <CampaignsTable
              columns={columns}
              data={data}
            />
          </div>
        </div>

        {/* Right side: Cards (using the Card component) */}
        <div className="col-span-1 flex flex-col space-y-4 h-full overflow-y-auto">
          {/* Card 1: Requests */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-[14px] font-medium">Requests</CardTitle>
              <svg width="16" 
              height="16" 
              viewBox="0 0 15 15" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg">
              <path d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                </path>
                </svg>
            </CardHeader>
            <CardContent>
                  <div className="text-xs pb-2 text-[#9CA3AF]">
                    Number of requests made to our servers
                    </div>
                    <div  className="space-y-1">
                  <div className="text-2xl font-bold">14,056</div>
                  <p className="text-xs text-muted-foreground">
                    last 7 days
                  </p>
                  </div>
                </CardContent>
          </Card>

          {/* Card 2: Last updates */}
          <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-[14px] font-medium">Last updates</CardTitle>
            <svg width="15" 
            height="15" 
            viewBox="0 0 15 15" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
              <path d="M1.90321 7.29677C1.90321 10.341 4.11041 12.4147 6.58893 12.8439C6.87255 12.893 7.06266 13.1627 7.01355 13.4464C6.96444 13.73 6.69471 13.9201 6.41109 13.871C3.49942 13.3668 0.86084 10.9127 0.86084 7.29677C0.860839 5.76009 1.55996 4.55245 2.37639 3.63377C2.96124 2.97568 3.63034 2.44135 4.16846 2.03202L2.53205 2.03202C2.25591 2.03202 2.03205 1.80816 2.03205 1.53202C2.03205 1.25588 2.25591 1.03202 2.53205 1.03202L5.53205 1.03202C5.80819 1.03202 6.03205 1.25588 6.03205 1.53202L6.03205 4.53202C6.03205 4.80816 5.80819 5.03202 5.53205 5.03202C5.25591 5.03202 5.03205 4.80816 5.03205 4.53202L5.03205 2.68645L5.03054 2.68759L5.03045 2.68766L5.03044 2.68767L5.03043 2.68767C4.45896 3.11868 3.76059 3.64538 3.15554 4.3262C2.44102 5.13021 1.90321 6.10154 1.90321 7.29677ZM13.0109 7.70321C13.0109 4.69115 10.8505 2.6296 8.40384 2.17029C8.12093 2.11718 7.93465 1.84479 7.98776 1.56188C8.04087 1.27898 8.31326 1.0927 8.59616 1.14581C11.4704 1.68541 14.0532 4.12605 14.0532 7.70321C14.0532 9.23988 13.3541 10.4475 12.5377 11.3662C11.9528 12.0243 11.2837 12.5586 10.7456 12.968L12.3821 12.968C12.6582 12.968 12.8821 13.1918 12.8821 13.468C12.8821 13.7441 12.6582 13.968 12.3821 13.968L9.38205 13.968C9.10591 13.968 8.88205 13.7441 8.88205 13.468L8.88205 10.468C8.88205 10.1918 9.10591 9.96796 9.38205 9.96796C9.65819 9.96796 9.88205 10.1918 9.88205 10.468L9.88205 12.3135L9.88362 12.3123C10.4551 11.8813 11.1535 11.3546 11.7585 10.6738C12.4731 9.86976 13.0109 8.89844 13.0109 7.70321Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                </path>
              </svg>
              </CardHeader>


              <CardContent className="space-y-4">

              <div className="text-xs pb-2 text-[#9CA3AF]">
                    Current state of the data
                    </div>

              {/* Amazon Line */}
              <div className="flex items-center justify-between border-b border-[#e6e3e3] pb-4">
                <div className="flex items-center space-x-2">
                  <img
                    src="https://i0.wp.com/www.jesuismonpatron.fr/wp-content/uploads/2018/08/amazon-seller-central-fr.png?fit=598152&ssl=1"
                    alt="Amazon Logo"
                    className="w-16 object-contain"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-[#7E828A]">Processing data...</span>
                  <div className="h-2 w-2 bg-orange-400 rounded-full"></div>
                </div>
              </div>

              {/* Meta Line */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src="https://adsmith.biz/wp-content/uploads/meta-logo.png"
                    alt="Meta Logo"
                    className="w-16 object-contain"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-[#7E828A]">Data sent 3h ago</span>
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>


          </Card>



          {/* Card 3: Account Status */}
          <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-[14px] font-medium">Account status</CardTitle>
            <svg 
              width="15" 
              height="15"
              viewBox="0 0 15 15" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg">
                <path d="M7.49985 0.877045C3.84216 0.877045 0.877014 3.84219 0.877014 7.49988C0.877014 11.1575 3.84216 14.1227 7.49985 14.1227C11.1575 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1575 0.877045 7.49985 0.877045ZM1.82701 7.49988C1.82701 4.36686 4.36683 1.82704 7.49985 1.82704C10.6328 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6328 13.1727 7.49985 13.1727C4.36683 13.1727 1.82701 10.6329 1.82701 7.49988ZM7.49999 9.49999C8.60456 9.49999 9.49999 8.60456 9.49999 7.49999C9.49999 6.39542 8.60456 5.49999 7.49999 5.49999C6.39542 5.49999 5.49999 6.39542 5.49999 7.49999C5.49999 8.60456 6.39542 9.49999 7.49999 9.49999Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
              </path>
              </svg>
              </CardHeader>

              <CardContent className="space-y-4">
              <div className="text-xs pb-2 text-[#9CA3AF]">
                Check your accounts connection status
              </div>

              {/* Amazon Line */}
              <div className="flex items-center justify-between border-b border-[#e6e3e3] pb-4">
                <span className="text-sm font-medium">Amazon</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-[#7E828A]">Active</span>
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Meta Line */}
              <div className="flex items-center justify-between border-b border-[#e6e3e3] pb-4">
                <span className="text-sm font-medium">Meta Business Manager</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-[#7E828A]">Inactive</span>
                  <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                </div>
              </div>

              {/* CNAME Line */}
              <div className="flex items-center justify-between pb-2">
                <span className="text-sm font-medium">CNAME</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-[#7E828A]">Active</span>
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                </div>
              </div>

              <Button variant="outline">
                  All accounts
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginLeft: '6px' }}
                  >
                    <path
                      d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Button>


            </CardContent>


          </Card>
        </div>
      </div>
      </div>
      </ScrollArea>
  );
}
