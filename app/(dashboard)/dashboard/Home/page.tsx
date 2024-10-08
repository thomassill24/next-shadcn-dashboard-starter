"use client";

import { useRouter } from "next/navigation";
import { useAuth, SignOutButton } from '@clerk/nextjs';
import { useEffect, useState } from "react";
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CampaignsTable } from '@/components/tables/campaigns-table/campaigns-table';
import { columns } from '@/components/tables/campaigns-table/columns';
import { DataTable } from "@/components/ui/data-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "@/components/ui/combobox";
import { PlusIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdLinksTable from '@/components/ui/ad-links';
import { DateRange } from "react-day-picker";
import { CalendarDateRangePicker } from "@/components/date-range-picker";

export default function home() {
  const { isSignedIn } = useAuth(); // Clerk hook to check if the user is signed in
  const router = useRouter(); // Next.js router for redirecting

  // Effect to redirect the user if not signed in
  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in'); // Redirect to the sign-in page if the user is not signed in
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    return <p>Redirecting to sign in...</p>; // Temporary message until redirect happens
  }

  return (
    <ScrollArea className="h-full bg-[#f9fafb]">
      <div className="flex-1 space-y-5 md:p-8">
        {/* Header with title and button */}
        <div className="flex items-end justify-between">
          {/* Left side: Title and Tagline */}
          <div>
            <h2 className="text-2xl font-bold tracking-medium">Hello Romain</h2>
            <p className="text-md font-medium text-[#6B7280]">
              Here's your campaigns are going
            </p>
          </div>
          {/* Right side: Button */}
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <ComboboxDemo />
            <Button variant="purple" className="flex items-center space-x-2">
              <PlusIcon className="h-4 w-4" /> {/* Add the plus icon */}
              <span>New link</span>
            </Button>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-4 gap-3">

        <div className="grid grid-cols-2 gap-3 col-span-2">
          {/* Card 1: Visits */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[14px] font-medium">Attributed Sales</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>                </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">1,357</div>
                  <p className="text-xs text-[#7E828A]">last 7 days</p>
              </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[14px] font-medium">Visits</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mouse-pointer-click"><path d="M14 4.1 12 6"/><path d="m5.1 8-2.9-.8"/><path d="m6 12-1.9 2"/><path d="M7.2 2.2 8 5.1"/><path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"/></svg>            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">148,056</div>
                <p className="text-xs text-[#7E828A]">last 7 days</p>
            </CardContent>
          </Card>

          </div>

          <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
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


              <CardContent className="flex w-full">
                    {/* Left Frame (Amazon) */}
                    <div className="flex items-center space-x-4 pr-5">
                      {/* Logo on the left */}
                      <div className="flex items-center space-x-2">
                        <img
                          src="https://i0.wp.com/www.jesuismonpatron.fr/wp-content/uploads/2018/08/amazon-seller-central-fr.png?fit=598152&ssl=1"
                          alt="Amazon Logo"
                          className="w-20 object-contain"
                        />
                      </div>

                      {/* Text and Color frame */}
                      <div className="flex flex-col items-start">
                        {/* Top row with "TEST" text and color frame */}
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium">Processing...</span>
                          <div className="relative flex items-center justify-center">
                          </div>
                        </div>
                        <span className="text-xs text-[#7E828A]">Received 1h ago</span>
                      </div>
                        <div className="h-4 w-4 bg-orange-100 rounded-full flex items-center justify-center">
                              <div className="h-1.5 w-1.5 bg-orange-400 rounded-full"></div>
                            </div>
                    </div>

                    {/* Middle Border */}
                    <div className="border-l border-gray-300 h-full"></div>

                    {/* Right Frame (Meta) */}
                    <div className="flex items-center space-x-4 pl-5">
                      <div className="flex items-center space-x-2">
                        <img
                          src="https://adsmith.biz/wp-content/uploads/meta-logo.png"
                          alt="Meta Logo"
                          className="w-20 object-contain"
                        />
                      </div>
                      

                      {/* Text and Color frame */}
                      <div className="flex flex-col items-start">
                        {/* Top row with "TEST" text and color frame */}
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium">Data sent</span>
                          <div className="relative flex items-center justify-center">
                          </div>
                        </div>
                        {/* Bottom row with "Received 3h ago" */}
                        <span className="text-xs text-[#7E828A]">Sent 3h ago</span>
                      </div>
                        <div className="h-4 w-4 bg-[#e6fce8] rounded-full flex items-center justify-center">
                            <div className="h-1.5 w-1.5 bg-green-600 rounded-full"></div>
                          </div>
                    </div>
                    
                    </CardContent>

          </Card>

        </div>

        {/* Full-width AdLinksTable */}
        <div className="flex-1 h-max">
          <AdLinksTable />
        </div>
      </div>
    </ScrollArea>
  );
}
