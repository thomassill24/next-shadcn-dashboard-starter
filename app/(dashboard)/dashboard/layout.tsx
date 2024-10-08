import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
    <div className="flex h-screen overflow-hidden">
      
      <Sidebar />

      
      <div className="flex-1 flex flex-col h-screen max-h-screen relative bg-surface-50">
        
        <Header />

        
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
    </SessionProvider>
  );
}

