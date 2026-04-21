import { Outfit } from 'next/font/google';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from '@/components/ui/sonner';

import './globals.css'
import { Metadata } from 'next';

const outfit = Outfit({ subsets: ["latin"] });

// 1. Separate Viewport Export
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0B0E14',
};

// 2. Updated Metadata Export (remove viewport and themeColor from here)
export const metadata: Metadata = {
  title: 'SkyInvestOrg | Advanced Global Trading Platform',
  description: 'Trade Forex, Cryptocurrencies, Shares, Indices, and ETFs...',
  keywords: 'trading, forex, crypto...',
  authors: [{ name: 'SkyInvestOrg' }],
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
