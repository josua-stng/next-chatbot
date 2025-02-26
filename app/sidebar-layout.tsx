'use client';

import ChatSidebar from '@/advance-chat/components/ChatSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ReactNode, useState } from 'react';

export default function SidebarLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="flex h-screen w-full">
        <ChatSidebar />
        {children}
      </div>
    </SidebarProvider>
  );
}
