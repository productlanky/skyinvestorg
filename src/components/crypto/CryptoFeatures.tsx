import { Lock, Fingerprint, Globe } from 'lucide-react';

const features = [
  { t: 'Multi-Sig Custody', d: 'Your assets are held in institutional-grade cold storage wallets with multi-signature verification.', icon: Lock },
  { t: 'Instant Fiat Gateway', d: 'On-ramp and off-ramp effortlessly with our global network of banking partners.', icon: Globe },
  { t: 'Biometric Security', d: 'Protect your terminal with facial recognition and fingerprint authentication.', icon: Fingerprint },
];

export default function CryptoFeatures() {
  return (
    <section className="py-24 bg-gray-950 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <div key={i} className="group flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-brand-500/50 transition-all duration-500 shadow-2xl shadow-brand-500/10">
                <f.icon className="w-8 h-8 text-brand-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{f.t}</h3>
              <p className="text-gray-500 font-light leading-relaxed max-w-xs">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}