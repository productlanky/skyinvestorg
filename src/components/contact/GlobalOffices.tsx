"use client";

import { useState } from 'react';
import { Map, Globe, Navigation, ChevronDown } from 'lucide-react';

const regions = [
  {
    name: 'North America',
    icon: Map,
    summary: 'New York, San Francisco, Toronto',
    offices: [
      { city: 'New York', address: '11 GRACE AVENUE, STE 108\nGREAT NECK, NEW YORK, 11021', hours: '9:30 AM - 4:00 PM EST' },
      { city: 'San Francisco', address: '301 HOWARD STREET\nSAN FRANCISCO, CA 94105', hours: '6:30 AM - 1:00 PM PST' },
      { city: 'Toronto', address: '199 BAY STREET\nTORONTO, ONTARIO, M5L 1E2', hours: '9:30 AM - 4:00 PM EST' }
    ]
  },
  {
    name: 'Europe',
    icon: Globe,
    summary: 'London, Frankfurt, Zurich',
    offices: [
      { city: 'London', address: '1 CANADA SQUARE\nCANARY WHARF, LONDON, E14 5AB', hours: '8:00 AM - 4:30 PM GMT' },
      { city: 'Frankfurt', address: 'MAINZER LANDSTRASSE 50\nFRANKFURT, 60325', hours: '9:00 AM - 5:30 PM CET' },
      { city: 'Zurich', address: 'BAHNHOFSTRASSE 64\nZURICH, 8001', hours: '9:00 AM - 5:30 PM CET' }
    ]
  },
  {
    name: 'Asia Pacific',
    icon: Navigation,
    summary: 'Singapore, Hong Kong, Tokyo',
    offices: [
      { city: 'Singapore', address: 'ONE RAFFLES QUAY\nSINGAPORE, 048583', hours: '9:00 AM - 5:00 PM SGT' },
      { city: 'Hong Kong', address: 'INTERNATIONAL FINANCE CENTRE\nCENTRAL, HONG KONG', hours: '9:30 AM - 4:00 PM HKT' },
      { city: 'Tokyo', address: 'MARUNOUCHI BUILDING\nCHIYODA-KU, TOKYO, 100-0005', hours: '9:00 AM - 3:00 PM JST' }
    ]
  }
];

export default function GlobalOffices() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <section className="py-16 bg-gray-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 800 800">
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
          <h2 className="text-3xl font-bold text-white">Global Presence</h2>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-400"></div>
          <p className="mt-4 max-w-3xl mx-auto text-gray-300">
            With teams around the world, we provide support in multiple languages and time zones
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {regions.map((region) => (
            <div key={region.name} className="relative bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden shadow-xl group hover:border-blue-500 transition-all duration-300">
              <div 
                className="p-6 cursor-pointer"
                onClick={() => setActiveRegion(activeRegion === region.name ? null : region.name)}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center mr-4">
                    <region.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{region.name}</h3>
                  <div className="ml-auto">
                    <ChevronDown className={`h-5 w-5 text-blue-400 transition-transform duration-300 ${activeRegion === region.name ? 'rotate-180' : ''}`} />
                  </div>
                </div>
                <p className="text-gray-300">{region.summary}</p>
              </div>

              {/* Collapsible Content */}
              {activeRegion === region.name && (
                <div className="bg-gray-800 border-t border-gray-700 p-6 animate-in slide-in-from-top-2 duration-200">
                  <div className="space-y-6">
                    {region.offices.map((office) => (
                      <div key={office.city}>
                        <h4 className="font-semibold text-blue-400">{office.city}</h4>
                        <p className="text-gray-300 text-sm mt-1 whitespace-pre-line">{office.address}</p>
                        <p className="text-gray-400 text-xs mt-1">Trading Hours: {office.hours}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}