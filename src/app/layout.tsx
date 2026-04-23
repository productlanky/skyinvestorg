import { Outfit } from 'next/font/google';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from '@/components/ui/sonner';

import './globals.css'
import { Metadata } from 'next';
import Script from 'next/script';

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

      <Script id="smartsupp-script" strategy="afterInteractive">
        {`
            var _smartsupp = _smartsupp || {};
            _smartsupp.key = '281575d99d92aef390d6da3ea0676b1f421053b7';
            window.smartsupp||(function(d) {
              var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
              s=d.getElementsByTagName('script')[0];c=d.createElement('script');
              c.type='text/javascript';c.charset='utf-8';c.async=true;
              c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
            })(document);
          `}
      </Script>
    </html>
  );
}
