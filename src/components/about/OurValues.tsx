import { Users, MonitorSmartphone, Zap, ShieldCheck } from 'lucide-react';

const values = [
  {
    title: 'Client Focus',
    desc: 'Providing best customer service is our primary value. More than 100 account managers are focused on needs of our clients.',
    icon: Users
  },
  {
    title: 'Simplicity',
    desc: 'Everybody can become a trader with our easiest to use trading platform. SkyInvestOrg is available on all modern platforms: Web, Windows, MacOS, iPhone, iPad and Android.',
    icon: MonitorSmartphone
  },
  {
    title: 'Speed',
    desc: 'We provide fastest trading using cutting-edge technologies. No delays in order executions and lags in user interface.',
    icon: Zap
  },
  {
    title: 'Reliability',
    desc: 'Being industry leader we provide our clients with extra solidity. We are doing more than anyone else to satisfy needs of our clients.',
    icon: ShieldCheck
  }
];

export default function OurValues() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">Our Values</h2>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-400"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <div key={i} className="relative group">
              {/* Card Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-blue-800/5 rounded-xl transform group-hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>

              {/* Card Content */}
              <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 p-6 transition-all duration-300 group-hover:border-blue-500 group-hover:shadow-lg group-hover:shadow-blue-900/20 h-full flex flex-col items-center">
                <div className="w-20 h-20 mb-6 bg-blue-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-300 text-center leading-relaxed flex-grow">{value.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}