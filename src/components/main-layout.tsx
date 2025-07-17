
"use client";

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast"
import { OmniCalcIcon } from '@/components/icons';
import { Calculator, Scale, FlaskConical, LineChart, History, Share2 } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Calculator', icon: Calculator },
  { href: '/converters', label: 'Unit Converters', icon: Scale },
  { href: '/formulas', label: 'Formulas', icon: FlaskConical },
  { href: '/graphing', label: 'Graphing', icon: LineChart },
  { href: '/history', label: 'History', icon: History },
];

function NavMenu() {
    const pathname = usePathname();
    const { setOpenMobile, isMobile } = useSidebar();

    const handleLinkClick = () => {
        if (isMobile) {
            setOpenMobile(false);
        }
    }

    return (
        <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  as={Link}
                  href={item.href}
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                  onClick={handleLinkClick}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link Copied!",
        description: "The link has been copied to your clipboard.",
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        title: "Error",
        description: "Could not copy the link.",
        variant: "destructive"
      })
    });
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="size-9 shrink-0 lg:hidden">
                    <OmniCalcIcon className="size-6 text-primary" />
                </Button>
                <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                    <h1 className="font-semibold text-lg text-primary">OmniCalc</h1>
                    <p className="text-sm text-muted-foreground">Advanced Calculator</p>
                </div>
            </div>
        </SidebarHeader>
        <SidebarContent>
          <NavMenu />
        </SidebarContent>
         <SidebarFooter>
            <SidebarMenu>
                 <SidebarMenuItem>
                    <SidebarMenuButton
                        onClick={handleShare}
                        tooltip={{ children: "Share" }}
                    >
                        <Share2 />
                        <span>Share</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-start gap-4 border-b bg-background px-4 sm:px-6 md:hidden">
          <SidebarTrigger>
            <OmniCalcIcon className="size-6 text-primary" />
          </SidebarTrigger>
          <h1 className="font-semibold text-lg text-primary">OmniCalc</h1>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
