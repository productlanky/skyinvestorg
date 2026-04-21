import { Shield, Trophy, Headset, Lock, UserCheck, Activity } from 'lucide-react';
import Link from 'next/link';

const reasons = [
  { text: 'Globally Regulated', icon: Shield },
  { text: '40+ International Awards', icon: Trophy },
  { text: '24/7 Multilingual Customer Support', icon: Headset },
  { text: 'Segregated Client Funds', icon: Lock },
  { text: 'Personal Account Managers', icon: UserCheck },
  { text: 'Consistently Tighter Spreads', icon: Activity },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5"></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"></rect>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Why is SkyInvestOrg One of the World's Most Trusted Brands?</h2>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-400"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image Side */}
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden shadow-2xl h-64 md:h-96 flex items-center justify-center">
               {/* Replace with actual image path if needed */}
               <p className="text-gray-500">[ Trading Platform Image Placeholder ]</p>
               <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-400 opacity-10"></div>
            </div>
          </div>

          {/* List Side */}
          <div className="w-full lg:w-1/2">
            <ul className="space-y-6">
              {reasons.map((reason, i) => (
                <li key={i} className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center">
                      <reason.icon className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-white">{reason.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link href="/login" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200">
                Learn About Our Commissions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}