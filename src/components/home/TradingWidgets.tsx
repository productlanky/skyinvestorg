"use client";

import { BarChart3, Wrench, ShieldAlert, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TradingWidgets() {
  return (
    <section className="py-24 bg-[#0B0E14] relative overflow-hidden">
      {/* Ambient Lighting Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-brand-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-success-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 text-sm font-semibold tracking-wide text-brand-400 uppercase bg-brand-500/10 rounded-full border border-brand-500/20 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-500 mr-2 animate-pulse"></span>
            Real-Time Intelligence
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            Market Analysis & Insights
          </h2>
          <p className="text-lg text-gray-400 font-light leading-relaxed">
            Stay ahead with institutional-grade market data, algorithmic insights, and expert analysis delivered directly to your terminal.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column - TradingView Embedded Widget */}
          <div className="lg:col-span-7 group relative flex flex-col p-1 rounded-3xl bg-gray-900/60 border border-white/5 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-white/10">
            {/* Subtle Top Border Highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="p-6 md:p-8 flex flex-col h-full">
              <h3 className="mb-6 text-xl font-bold text-white tracking-wide flex items-center">
                Live Market Overview
                <span className="ml-3 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-success-500/20 text-success-400">Live</span>
              </h3>

              <div className="w-full flex-grow min-h-[500px] overflow-hidden rounded-2xl border border-white/5 bg-black/40 relative">
                {/* Fallback loader state background */}
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                  <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                </div>

                <iframe
                  scrolling="no"
                  /* Deleted allowtransparency here */
                  frameBorder="0"
                  className="w-full h-full relative z-10"
                  src="https://www.tradingview-widget.com/embed-widget/market-overview/..."
                  title="Market Overview"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Expert Analysis List */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Card 1 */}
            <div className="p-6 md:p-8 rounded-3xl bg-gray-900/60 border border-white/5 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:bg-white/[0.02] hover:-translate-y-1 group">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <BarChart3 className="text-brand-400 w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2 tracking-wide">Daily Market Updates</h4>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">
                    Receive daily market analysis directly to your inbox. Our team provides actionable insights on market trends across all major asset classes.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 md:p-8 rounded-3xl bg-gray-900/60 border border-white/5 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:bg-white/[0.02] hover:-translate-y-1 group">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-success-500/10 border border-success-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <Wrench className="text-success-400 w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2 tracking-wide">Premium Trading Tools</h4>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">
                    Access advanced trading tools designed for all experience levels. Our platform offers customizable solutions to meet diverse trading needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 md:p-8 rounded-3xl bg-gray-900/60 border border-white/5 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:bg-white/[0.02] hover:-translate-y-1 group flex-grow">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <ShieldAlert className="text-orange-400 w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2 tracking-wide">Funds Protection</h4>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">
                    Your security is our priority. We provide industry-leading insurance protection for client funds, utilizing strictly segregated accounts.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/about"
              className="mt-2 group inline-flex items-center justify-center px-8 py-5 border border-brand-500/30 text-base font-bold rounded-2xl text-white bg-brand-500/10 hover:bg-brand-500 hover:shadow-[0_0_30px_rgba(31,149,201,0.3)] transition-all duration-300 w-full"
            >
              Explore Our Ecosystem
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}