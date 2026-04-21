import Link from 'next/link';

export default function CryptoCTA() {
  return (
    <section className="py-24 bg-[#05070a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjMiPjxwYXRoIGQ9Ik0zNiAzNGhLTJWMjRoMnpNNDAgMjRoLTJ2MTBoMnpNNDQgMjRoLTJ2MTBoMnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter leading-none mb-8">
            The Digital Frontier <br /> <span className="text-brand-500 italic">Is Open.</span>
          </h2>
          <p className="text-xl text-gray-400 font-light mb-12">
            Join thousands of traders executing Bitcoin and Ethereum trades with sub-millisecond precision. Start your sovereign journey today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/register" className="w-full sm:w-auto px-10 py-5 bg-brand-600 hover:bg-brand-500 text-white font-black uppercase tracking-widest text-xs rounded-full shadow-2xl shadow-brand-500/20 transition-all transform hover:-translate-y-1">
              Start Trading Cryptocurrencies
            </Link>
            <Link href="/contact" className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-white/10 transition-all">
              Request VIP Support
            </Link>
          </div>
          <p className="mt-12 text-[9px] font-mono text-gray-600 uppercase tracking-[0.4em]">
            Institutional Grade // AES-256 Encrypted // 24/7 Monitoring
          </p>
        </div>
      </div>
    </section>
  );
}