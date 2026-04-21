import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { TopTicker, StickyBottomTicker } from '@/components/home/Tickers';

// New Crypto Components
import CryptoHero from '@/components/crypto/CryptoHero';
import CryptoMarketsTable from '@/components/crypto/CryptoMarketsTable';
import CryptoFeatures from '@/components/crypto/CryptoFeatures';
import CryptoCTA from '@/components/crypto/CryptoCTA';

export default function CryptocurrenciesPage() {
  return (
    <div className="antialiased text-gray-200 bg-gray-900 font-sans min-h-screen flex flex-col relative pb-[46px]">
      
      {/* Universal Top Elements */}
      <Header />
      <TopTicker />
      
      {/* Main Page Content */}
      <main id="main-content" className="flex-grow">
        <CryptoHero />
        <CryptoMarketsTable />
        <CryptoFeatures />
        <CryptoCTA />
      </main>

      {/* Universal Bottom Elements */}
      <Footer />
      <StickyBottomTicker />
      
    </div>
  );
}