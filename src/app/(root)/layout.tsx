import { StickyBottomTicker } from '@/components/home/Tickers';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Initialize the Inter font
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

// Define global metadata for SEO and branding
export const metadata: Metadata = {
    title: 'SkyInvestOrg | Advanced Global Trading Platform',
    description: 'Trade Forex, Cryptocurrencies, Shares, Indices, and ETFs with competitive spreads and lightning-fast execution on our state-of-the-art platform.',
    keywords: 'trading, forex, crypto, stocks, indices, etfs, investment, cTrader, automated trading, copy trading',
    authors: [{ name: 'SkyInvestOrg' }],
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    themeColor: '#0B0E14', // Matches your dark theme background
    icons: {
        icon: '/favicon.ico', // Ensure you add a favicon.ico to your public folder
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`${inter.variable} scroll-smooth`}>
            <div className="antialiased text-gray-200 bg-gray-900 font-sans min-h-screen flex flex-col selection:bg-blue-500/30 selection:text-blue-200">

                {/* Accessibility Skip Link */}
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:bg-blue-600 focus:text-white focus:fixed focus:px-4 focus:py-2 focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Skip to main content
                </a>
                <Header />

                {children}
                <Footer />
                <StickyBottomTicker />
                {/* Add any global scripts here if needed (e.g., analytics, live chat).
          For Next.js 13+, it's recommended to use the next/script component
          if you need to load external scripts asynchronously.
        */}
            </div>
        </div>
    );
}