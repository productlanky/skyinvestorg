import CryptoHero from '@/components/crypto/CryptoHero';
import CryptoMarketsTable from '@/components/crypto/CryptoMarketsTable';
import CryptoFeatures from '@/components/crypto/CryptoFeatures';
import CryptoCTA from '@/components/crypto/CryptoCTA';

export default function CryptocurrenciesPage() {
  return (
    <main id="main-content" className="flex-grow">
      <CryptoHero />
      <CryptoMarketsTable />
      <CryptoFeatures />
      <CryptoCTA />
    </main>
  );
}