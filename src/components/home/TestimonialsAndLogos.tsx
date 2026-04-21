"use client";

import { useState } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Malcom47', role: 'Verified Trader', text: 'Since I started using SkyInvestOrg, I have been earning like never before. You guys have the best signals.', img: '/temp/custom/imge2.jpg' },
  { name: 'Christy', role: 'Elite Investor', text: 'I already got more than $200,000 within a month investing with SkyInvestOrg. Will again invest soon.', img: '/temp/custom/imge1.jpg' },
  { name: 'Linday8', role: 'Professional Trader', text: 'I was able to earn additional $30,000 to my profit. It\'s amazing, you guys are the best, keep it up.', img: '/temp/custom/imge3.jpg' },
  { name: 'Crian', role: 'Active Trader', text: 'This was a very easy process and I received my funds quickly as I needed them! Highly recommend SkyInvestOrg.', img: '/temp/custom/imge4.jpg' },
  { name: 'Claudia', role: 'Satisfied Investor', text: 'I rate SkyInvestOrg five stars because of the service, you register online, upload ID and you deposit and withdraw after trades. This is so lovely.', img: '/temp/custom/imge5.jpg' },
  { name: 'Jenny', role: 'Premium Member', text: 'I am very pleased with the customer service. Also online service is great and easy thank you SkyInvestOrg team.', img: '/temp/custom/jenny.jpg' },
  { name: 'Mike', role: 'Regular Investor', text: 'I\'m happy, that in difficult times there are people that will support you and help you make more money, thank you SkyInvestOrg.', img: '/temp/custom/mike.jpg' },
  { name: 'Kathy', role: 'Long-term Client', text: 'I\'ve invested with SkyInvestOrg several times, always paid back on time. Very impressed and satisfied.', img: '/temp/custom/kathy.jpg' }
];

const logos = ['btc', 'eth', 'doge', 'bch', 'usdt', 'bnb', 'ltc'];

export default function TestimonialsAndLogos() {
  const [showAll, setShowAll] = useState(false);
  const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 4);

  return (
    <>
      {/* Education & About Us */}
      <section className="py-16 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
          <div>
            <span className="text-blue-500 text-sm font-semibold uppercase tracking-wider">Education Center</span>
            <h2 className="mt-2 text-3xl font-bold text-white mb-4">Learn From Market Experts</h2>
            <div className="bg-gray-800 h-[300px] rounded-xl overflow-hidden mb-4">
              <iframe src="https://www.youtube.com/embed/Gc2en3nHxA4" className="w-full h-full" allowFullScreen />
            </div>
            <p className="text-gray-400">Bitcoin (₿) is a decentralized digital currency that operates without a central authority. Transactions are verified by network nodes through cryptography.</p>
          </div>
          <div>
            <span className="text-blue-500 text-sm font-semibold uppercase tracking-wider">Our Story</span>
            <h2 className="mt-2 text-3xl font-bold text-white mb-4">About SkyInvestOrg</h2>
            <div className="bg-gray-800 p-6 rounded-xl text-gray-300 space-y-4">
              <p>SkyInvestOrg has become one of the most reputable brokers in the industry, offering traders CFDs across Forex, Equities, Commodities and Futures.</p>
              <p>With the right tools, information and access to all the world's currencies, SkyInvestOrg puts you in control of the trades you make.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
             <h2 className="text-3xl font-bold text-white">Client Testimonials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleTestimonials.map((t, i) => (
              <div key={i} className="bg-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition">
                <div className="flex text-yellow-400 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-300 text-sm h-24">{t.text}</p>
                <div className="flex items-center mt-4">
                  <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border-2 border-blue-500">
                     {/* Image placeholder */}
                     <div className="w-full h-full bg-blue-900 flex items-center justify-center text-xs font-bold text-white">{t.name[0]}</div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-white font-semibold text-sm">{t.name}</h4>
                    <p className="text-blue-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => setShowAll(!showAll)} className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
              {showAll ? 'Show Less' : 'View More Success Stories'}
            </button>
          </div>
        </div>
      </section>

      {/* Crypto Logos */}
      <section className="bg-gray-900 py-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {logos.map((logo) => (
              <div key={logo} className="w-20 h-20 bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-blue-500 flex items-center justify-center uppercase font-bold text-gray-500">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}