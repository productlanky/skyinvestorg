import { ShieldCheck, FileText, ActivitySquare } from 'lucide-react';

const frameworks = [
  {
    title: 'Client Fund Protection',
    desc: 'All client funds are held in segregated accounts at top-tier banks, ensuring maximum security and compliance with regulatory requirements.',
    icon: ShieldCheck,
    color: 'blue'
  },
  {
    title: 'Regulatory Compliance',
    desc: 'We maintain strict compliance with all applicable regulations and regularly undergo audits to ensure transparency and security.',
    icon: FileText,
    color: 'emerald'
  },
  {
    title: 'Risk Management',
    desc: 'Advanced risk management systems and procedures are in place to protect both our clients and our operations.',
    icon: ActivitySquare,
    color: 'purple'
  }
];

export default function RegulatoryFramework() {
  return (
    <section className="py-16 bg-gray-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="trust-grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="1" fill="currentColor"></circle>
              <circle cx="0" cy="0" r="1" fill="currentColor"></circle>
              <circle cx="0" cy="50" r="1" fill="currentColor"></circle>
              <circle cx="50" cy="0" r="1" fill="currentColor"></circle>
              <circle cx="50" cy="50" r="1" fill="currentColor"></circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#trust-grid)"></rect>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 border border-blue-800/30 rounded-full mb-4">
            Our Commitment
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Regulatory Framework</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We maintain the highest standards of regulatory compliance and financial security to protect our clients' interests.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {frameworks.map((item, i) => (
            <div key={i} className="relative group h-full">
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-${item.color}-600 to-${item.color}-400 rounded-xl opacity-30 group-hover:opacity-100 transition duration-300 blur`}></div>
              <div className="relative bg-gray-900 p-6 rounded-xl border border-gray-700 h-full flex flex-col">
                <div className={`w-14 h-14 rounded-full bg-${item.color}-900/50 flex items-center justify-center mb-6`}>
                  <item.icon className={`w-7 h-7 text-${item.color}-400`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 flex-grow">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}