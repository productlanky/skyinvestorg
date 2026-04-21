"use client";

import { useState } from 'react';
import { Monitor, BellRing, PlayCircle, ShieldAlert, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const exploreItems = [
  {
    id: 1,
    title: 'Ultimate Platform',
    desc: "A multichart layout, technical analysis, historical quotes and beyond. Everything you're looking for in a platform — on the device of your choice.",
    icon: Monitor,
    color: 'blue',
    linkText: 'Explore platform',
    href: '/trade'
  },
  {
    id: 2,
    title: 'Analysis & Alerts',
    desc: 'Get the most out of fundamental and technical analysis with our News Feed and Economic Calendars. More than 100 most widely-used technical indicators.',
    icon: BellRing,
    color: 'emerald',
    linkText: 'View tools',
    href: '/trade'
  },
  {
    id: 3,
    title: 'Demo Account',
    desc: 'Master your skills with a demo/practice account and educational content. Practice with virtual funds in real market conditions without any risk.',
    icon: PlayCircle,
    color: 'purple',
    linkText: 'Start demo',
    href: '/register'
  },
  {
    id: 4,
    title: 'Risk Management',
    desc: 'With features like Stop Loss/Take Profit, Negative balance protection and Trailing Stop you can manage your losses and profits at the levels predetermined by you.',
    icon: ShieldAlert,
    color: 'indigo',
    linkText: 'Learn more',
    href: '/trade'
  }
];

export default function EducationExplore() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gray-800 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <pattern id="trading-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M25,0 L25,50 M0,25 L50,25" stroke="currentColor" strokeWidth="0.5"></path>
            <circle cx="25" cy="25" r="1" fill="currentColor"></circle>
          </pattern>
          <rect width="100%" height="100%" fill="url(#trading-grid)"></rect>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-900/30 border border-emerald-800/30 rounded-full mb-4">
            Trading Toolkit
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">More to Explore</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover our advanced trading features designed to enhance your trading experience and improve your results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {exploreItems.map((item) => {
            const isActive = activeCard === item.id;
            
            return (
              <div 
                key={item.id} 
                className="relative h-full group"
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-${item.color}-600 to-${item.color}-400 rounded-xl blur transition duration-300 ${isActive ? 'opacity-70' : 'opacity-30'}`}></div>
                
                <div className={`relative bg-gray-900/90 backdrop-filter backdrop-blur-sm p-6 rounded-xl border border-gray-700 h-full flex flex-col transition duration-300 ${isActive ? `border-${item.color}-500 transform scale-[1.02]` : ''}`}>
                  
                  <div className={`w-16 h-16 rounded-full bg-${item.color}-900/50 flex items-center justify-center mb-6 mx-auto`}>
                    <item.icon className={`w-8 h-8 text-${item.color}-400`} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 text-center">{item.title}</h3>

                  <p className="text-gray-300 flex-grow text-center text-sm leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Hidden Link that appears on Hover */}
                  <div className={`mt-6 pt-4 border-t border-gray-700 transition-all duration-300 ${isActive ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden pt-0 mt-0 border-transparent'}`}>
                    <Link href={item.href} className={`flex items-center justify-center text-${item.color}-400 hover:text-${item.color}-300 transition font-medium`}>
                      <span>{item.linkText}</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}