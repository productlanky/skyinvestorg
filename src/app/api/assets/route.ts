import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. Attempt to fetch live Crypto from CoinGecko
    const cryptoRes = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1', {
        // Next.js caching: keep this data fresh for 60 seconds to prevent rate-limiting
        next: { revalidate: 60 } 
    });

    if (!cryptoRes.ok) throw new Error("CoinGecko API Rate Limited");

    const cryptoData = await cryptoRes.json();
    
    const cryptoFormatted = {
      label: "Crypto",
      options: cryptoData.map((c: any) => ({
        value: `${c.symbol.toUpperCase()}/USD`,
        name: c.name,
        logo: c.image
      }))
    };

    // 2. Static Fallbacks for Forex and Stocks (to protect API keys)
    const forexFormatted = {
      label: "Forex",
      options: [
        { value: "EURUSD", name: "EUR/USD", logo: "" },
        { value: "GBPUSD", name: "GBP/USD", logo: "" },
        { value: "USDJPY", name: "USD/JPY", logo: "" },
      ]
    };

    const stocksFormatted = {
      label: "Stocks",
      options: [
        { value: "AAPL", name: "Apple Inc", logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.png" },
        { value: "TSLA", name: "Tesla Inc", logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/TSLA.png" },
      ]
    };

    // 3. Return the aggregated data successfully
    return NextResponse.json([cryptoFormatted, forexFormatted, stocksFormatted]);

  } catch (error) {
    console.error("API Fetch Failed, returning safe fallbacks:", error);
    
    // SAFETY NET: If the API fails, return static data so the UI doesn't crash (500 Error Fix)
    return NextResponse.json([
      {
        label: "Crypto (Fallback)",
        options: [
          { value: "BTC/USD", name: "Bitcoin", logo: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png" },
          { value: "ETH/USD", name: "Ethereum", logo: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png" }
        ]
      }
    ]);
  }
}