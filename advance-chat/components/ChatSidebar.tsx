'use client';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Moon, Plus, Sun } from 'lucide-react';
import { useLayoutEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { db } from '../lib/dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const ChatSidebar = () => {
  const [activeThread, setActiveThread] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [textInput, setTextInput] = useState('');
  const { setTheme, theme } = useTheme();
  const params = useParams();
  const { id } = params;
  const threads = useLiveQuery(() => db.getAllThreads(), []);

  const handleToogleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      return;
    }
    setTheme('dark');
  };

  const handleCreateThread = async () => {
    const threadId = await db.createThread(textInput);
    setIsDialogOpen(!isDialogOpen);
    setTextInput('');
  };

  // same like use effect but is effect after all dom is mounting
  useLayoutEffect(() => {
    setActiveThread(id as string);
  }, [id]);

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new thread</DialogTitle>
          </DialogHeader>
          <div className="space-y-1">
            <Label htmlFor="thread-title">Thread title</Label>
            <Input
              id="thread-title"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Your new thread title"
            />
          </div>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsDialogOpen(!isDialogOpen)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateThread}>Create Thread</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Sidebar>
        <SidebarHeader>
          <Button
            onClick={() => setIsDialogOpen(!isDialogOpen)}
            className="w-full justify-start"
            variant="ghost"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
              <SidebarMenu>
                {threads?.map((thread) => (
                  <SidebarMenuItem key={thread.id}>
                    <Link href={`/chat-page/${thread.id}`}>
                      <SidebarMenuButton isActive={thread.id === activeThread}>
                        {thread.title}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleToogleTheme}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />{' '}
            Toggle Theme
          </Button>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default ChatSidebar;
