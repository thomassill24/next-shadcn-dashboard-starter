'use client';
import React, { useState } from 'react';
import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { UserNav } from './user-nav';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/useSidebar';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };


  return (
    <div className="sticky top-0 right-0 left-0 z-20">
      <nav className="screen:flex flex-col justify-between h-[54px] border-b items-center bg-white">

      <div className='w-full h-full flex flex-row justify-center items-between py-2.5'>

          <button
          onClick={toggle}
          className={cn(
            'px-1.5 bg-[#f9fafb] hover:bg-[#f1f2f4] border-[#f4f4f4] border-y border-r rounded-r-lg'
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="[#121212]"
            viewBox="0 0 20 20"
            strokeWidth="0"
            stroke="currentColor"
            className={cn('h-4 w-4 text-[#121212]', isMinimized ? 'rotate-180' : '')}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
            />
          </svg>
        </button>
          
        {/* Right Side - Links and Icons */}
        <div className='w-full py-2 pr-6 flex flex-row space-x-4 justify-end items-center bg-white'>
              
          {/* User Nav/Profile */}
          <UserNav />

        </div>
        </div>
      </nav>
    </div>
  );
}
