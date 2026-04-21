"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How does a cBot work?',
    a: (
      <>
        <p className="mb-3">A cBot analyses the indicators or the other parameters that it was programmed to use and once the predefined rules are met, it takes a particular action, such as entering, exiting or modifying a trade.</p>
        <p>For example, if you are using a cBot that trades breakouts, your trade will be entered when the price breaks above a resistance or below a support level. Apart from rules for identifying trading opportunities, a cBot typically contains parameters for managing open positions such as Stop Loss/Take Profit Levels, trailing stops or other risk management features.</p>
      </>
    )
  },
  {
    q: 'Can I convert an Expert Advisor that I am using on MT4 to a cBot?',
    a: <p>Yes, your MQL4 indicators and Expert Advisors can be converted to C#, for use on cTrader. Please contact a consultant from the <a className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer" href="https://ctdn.com/consultants/">cTDN community</a>, who will be able to do this for you.</p>
  },
  {
    q: 'Based on which criteria should I select a cBot?',
    a: (
      <>
        <p className="mb-3">There is no best way to select a cBot, but it's advisable to do your research first. When you are downloading a cBot from cTDN, you can get a good idea about how it works by viewing the developer's description which includes characteristics and tips about its usage.</p>
        <p className="mb-3">Traders usually select a bot that suits their trading style, so if for example, you prefer trading with Fibonacci ratios, you may choose a Fibonacci cBot, and if you are into news trading, you may choose a cBot that trades when there's an important economic release.</p>
        <p>In cTDN, you can also rank cBots according to popularity and user rating, so this could be another deciding factor, especially if you are a beginner.</p>
      </>
    )
  },
  {
    q: 'How do I know if my cBot is set to run correctly?',
    a: <p>Once you download the cBot file, you will have to run and install it on your computer. You should then be able to view it on cTrader, at the left side of your chart under the cBots column. Once you define which instrument you'd like to run it for, click the "Play" button. The cBot will start working when the right conditions are met. Please note that you can stop it anytime, just by clicking the "Stop" button.</p>
  },
  {
    q: 'Can I run multiple cBots at the same time?',
    a: <p>Yes, you can run multiple cBots at the same time and for the same instrument.</p>
  },
  {
    q: 'Can I create my own cBot?',
    a: (
      <>
        <p className="mb-3">If you have a specific trading strategy that you follow and has been proven effective, then it might be a good idea to automate it. It's important that your strategy is simple enough and that you are clear about the set of rules that your bot is going to be built on.</p>
        <p>If you have no coding experience yourself, you may opt to hire a developer from the <a className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer" href="https://ctdn.com/consultants/">cTDN community</a>. Please post your request at the forum or contact one of the expert consultants.</p>
      </>
    )
  },
  {
    q: 'What types of custom indicators are available?',
    a: (
      <>
        <p className="mb-3">Trend indicators that are smoothened or combined versions of the standard version, such as MACD, RSI, Heiken Ashi, Ichimoku and more.</p>
        <p className="mb-3">Adjusted formulas of standard Volatility indicators such as Bollinger Bands, Donchian channels, Keltner channels, Average True Range etc.</p>
        <p>Multiple other custom indicators that are based on Support &amp; Resistance, Pivot Points, Harmonics, Polynomial Regression, Fibonacci etc.</p>
      </>
    )
  },
  {
    q: 'How can I start trading with a live account?',
    a: (
      <>
        <p className="mb-3">Your live trading account can be up and running in less than 2 minutes. Please follow the steps below:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Step 1. Create Account.</li>
          <li>Step 2. Fill in your email, password and phone number.</li>
          <li>Step 3. Launch the platform and fund your account to start trading!</li>
        </ul>
      </>
    )
  }
];

export default function AutomateFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 border border-blue-800/30 rounded-full">
            Knowledge Base
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-xl text-gray-300">Everything you need to know about our automated trading solutions</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden transition-colors hover:border-gray-600">
              <button 
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="flex items-center justify-between w-full px-6 py-4 text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-white pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-blue-400 flex-shrink-0 transition-transform duration-300 ${activeIndex === i ? 'rotate-180' : ''}`} />
              </button>
              
              {activeIndex === i && (
                <div className="px-6 pb-5 text-gray-300 animate-in slide-in-from-top-2 duration-200 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}