import { Outfit } from 'next/font/google';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from '@/components/ui/sonner';




import './globals.css'
import Script from 'next/script';

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: ' Flash Profits - Blockchain Company',
  description:
    'flashprofits.xyz is an investment firm committed to exceptional returns for investors through actively managed portfolios of these blockchain assets.',
  keywords:
    'blockchain, Forex, FX, Crypto, Cryptos, Cryptocurrencies, Stock, Stocks, Bonds, Invest, Investment, Equity',
  openGraph: {
    url: 'https://flashprofits.xyz/',
    type: 'website',
    title: 'Trade With Us',
    description:
      'Earn huge return on investment. With our professional team of traders, you are guaranteed of your earnings.',
    images: [
      'https://static.news.bitcoin.com/wp-content/uploads/2022/07/tesla-sold-btc1.jpg',
    ],
  },
  twitter: {
    card: 'summary_large_image',
    domain: 'flashprofits.xyz',
    url: 'https://flashprofits.xyz/',
    title: 'Trade With Us',
    description:
      'Earn huge return on investment. With our professional team of traders, you are guaranteed of your earnings.',
    images: [
      'https://static.news.bitcoin.com/wp-content/uploads/2022/07/tesla-sold-btc1.jpg',
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
          <Toaster />
        </ThemeProvider>
        {/* Chaport Live Chat */}
        <Script
          id="chaport-live-chat"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,v3){
                w.chaportConfig = {
                  appId : '6925f6178e08a28f0bef1650',
                };

                if(w.chaport) return;
                v3 = w.chaport = {};
                v3._q = [];
                v3._l = {};
                v3.q = function(){ v3._q.push(arguments) };
                v3.on = function(e,fn){
                  if(!v3._l[e]) v3._l[e] = [];
                  v3._l[e].push(fn)
                };
                var s = d.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'https://app.chaport.com/javascripts/insert.js';
                var ss = d.getElementsByTagName('script')[0];
                ss.parentNode.insertBefore(s, ss);
              })(window, document);
            `,
          }}
        />
      </body>
    </html>
  );
}
