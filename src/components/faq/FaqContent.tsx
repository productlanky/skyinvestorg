"use client";

import { useState } from 'react';
import { Building2, UserCircle, Wallet, Banknote, Users, HelpCircle, ChevronDown } from 'lucide-react';

const categories = [
  { id: 'about', label: 'About Us', icon: Building2 },
  { id: 'account', label: 'My Account', icon: UserCircle },
  { id: 'deposit', label: 'Deposit', icon: Wallet },
  { id: 'withdrawal', label: 'Withdrawal', icon: Banknote },
  { id: 'referral', label: 'Referral', icon: Users },
  { id: 'other', label: 'Other', icon: HelpCircle },
];

const faqData = {
  about: [
    {
      q: 'What is SkyInvestOrg?',
      a: 'SkyInvestOrg - Professional team of cryptocurrency industry developers. The main advantage of the company is a unique trading bot that makes a profit at the stage of growth and market decline.'
    },
    {
      q: 'Is SkyInvestOrg an officially registered company?',
      a: 'Yes, we are legally binding and officially registered in the UK under the company registration number #08683932'
    },
    {
      q: 'Do you have any country restrictions?',
      a: "Our company doesn't work and doesn't accept deposits from US residents. During the registration process you need to check the box that you are not a US citizen."
    }
  ],
  account: [
    {
      q: 'How many accounts can I open?',
      a: 'Each user can only open and manage one account. Please follow this rule. In case of violation the company has the right to block all your accounts without a refund.'
    },
    {
      q: 'How to upload personal data?',
      a: 'Please note that we do not require your personal information. To work with our platform, you need to specify your login, your email, come up with a password, and also specify the wallet number to which funds will be withdrawn from the platform.'
    },
    {
      q: 'How much does it cost to open an account?',
      a: "Opening an account is absolutely free. We do not charge you any hidden fees or service charges. The commission on operations and additional costs is included in the company's profits from the development of cryptocurrency robots."
    },
    {
      q: 'Can I register my child?',
      a: 'Any person who has reached the age of majority in their country of residence can register in SkyInvestOrg'
    },
    {
      q: 'How to become an investor?',
      a: (
        <div className="space-y-4">
          <p className="font-medium">3 steps to get started with our company:</p>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-3">
              <span className="text-white font-bold">1</span>
            </div>
            <div>
              <p className="font-medium text-white">REGISTRATION</p>
              <p className="text-gray-300">Click the Register button. Enter your details to quickly create a FREE SkyInvestOrg account.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-3">
              <span className="text-white font-bold">2</span>
            </div>
            <div>
              <p className="font-medium text-white">OPEN A DEPOSIT</p>
              <p className="text-gray-300">We offer different investment plans. You need to choose a plan that suits your financial goals. Make a deposit after reading.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-3">
              <span className="text-white font-bold">3</span>
            </div>
            <div>
              <p className="font-medium text-white">START EARNING</p>
              <p className="text-gray-300">After depositing, watch your capital grow by accumulating daily profit in real time.</p>
            </div>
          </div>
        </div>
      )
    }
  ],
  deposit: [
    {
      q: 'What payment methods can I use to deposit?',
      a: 'We work with payment systems PerfectMoney, BitCoin, Ethereum, LiteCoin, DogeCoin, TRON, Tether TRC20, and Tether ERC20.'
    },
    {
      q: 'Are there any restrictions on the amount of investment?',
      a: (
        <div className="space-y-4">
          <p className="text-gray-300">The tariff plans set the following restrictions on the minimum and maximum amount of the deposit:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h5 className="font-medium text-white mb-2">Minimum Amount:</h5>
              <ul className="text-gray-300 space-y-1">
                <li><span className="text-blue-400">10</span> USD</li>
                <li><span className="text-blue-400">0.005</span> BTC</li>
                <li><span className="text-blue-400">0.02</span> ETH</li>
                <li><span className="text-blue-400">10</span> USDT</li>
              </ul>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h5 className="font-medium text-white mb-2">Maximum Amount:</h5>
              <ul className="text-gray-300 space-y-1">
                <li><span className="text-blue-400">75000</span> USD</li>
                <li><span className="text-blue-400">1.5</span> BTC</li>
                <li><span className="text-blue-400">20</span> ETH</li>
                <li><span className="text-blue-400">75000</span> USDT</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      q: 'Can I make multiple deposits at the same time?',
      a: 'Yes, you can have an unlimited number of deposits, and you can also invest in different tariff plans at the same time.'
    }
  ],
  withdrawal: [
    {
      q: 'How long does it take to process a withdrawal request?',
      a: 'Withdrawal requests will be processed instantly. For crypto networks (BTC, ETH, etc.), at least 3 network confirmations are required and this can take from 20 minutes to several hours depending on network congestion.'
    },
    {
      q: 'What is the minimum withdrawal amount?',
      a: 'There are no restrictions on the maximum withdrawal amount, or the number of operations per day. Minimums vary by currency (e.g., 0.1 USD, 0.002 BTC, 10 USDT TRC20).'
    }
  ],
  referral: [
    {
      q: 'Do you offer a referral program?',
      a: 'We offer an affiliate program for additional income for our investors. Anyone can take part in the development of the company by inviting new members and receiving a generous reward for this.'
    },
    {
      q: 'How does the affiliate program work?',
      a: (
        <div>
          <p className="text-gray-300 mb-4">SkyInvestOrg offers a unique investment and referral program that rewards you not only for direct partners, but also for partners from levels 2, 3 and 4.</p>
          <div className="bg-gray-700/50 p-4 rounded-xl">
            <h5 className="font-medium text-white mb-3">Affiliate Commission Structure:</h5>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-blue-600/20 p-2 rounded">
                <div className="text-xl font-bold text-blue-400">7%</div>
                <div className="text-xs text-gray-300">Level 1</div>
              </div>
              <div className="bg-blue-600/15 p-2 rounded">
                <div className="text-xl font-bold text-blue-400">3%</div>
                <div className="text-xs text-gray-300">Level 2</div>
              </div>
              <div className="bg-blue-600/10 p-2 rounded">
                <div className="text-xl font-bold text-blue-400">2%</div>
                <div className="text-xs text-gray-300">Level 3</div>
              </div>
              <div className="bg-blue-600/5 p-2 rounded">
                <div className="text-xl font-bold text-blue-400">1%</div>
                <div className="text-xs text-gray-300">Level 4</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ],
  other: [
    {
      q: 'What to do if I forgot my password?',
      a: 'Click on the reset password link on the main page of the site in the login section. Enter your email address and follow the instructions.'
    },
    {
      q: 'Where can I exchange one currency for another?',
      a: 'You can use monitoring with trusted exchange offices. Choose the exchanger with the best rate and follow the instructions.'
    }
  ]
};

export default function FaqContent() {
  const [activeCategory, setActiveCategory] = useState('about');
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setActiveQuestionIndex(null); // Reset open questions when changing categories
  };

  const currentQuestions = faqData[activeCategory as keyof typeof faqData] || [];

  return (
    <section className="py-12 bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)} 
                className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 text-sm md:text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                  activeCategory === cat.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
                }`}
              >
                <cat.icon className="w-4 h-4 mr-2" />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Questions Area */}
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-xl overflow-hidden min-h-[400px]">
            <div className="p-6 md:p-8">
              <div className="divide-y divide-gray-700">
                {currentQuestions.map((item, index) => (
                  <div key={index} className="py-4">
                    <button 
                      onClick={() => setActiveQuestionIndex(activeQuestionIndex === index ? null : index)} 
                      className="flex justify-between items-center w-full focus:outline-none group text-left"
                    >
                      <h4 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors pr-6">
                        {item.q}
                      </h4>
                      <ChevronDown 
                        className={`w-5 h-5 text-blue-400 transform transition-transform duration-300 flex-shrink-0 ${activeQuestionIndex === index ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    
                    {/* Answer content */}
                    {activeQuestionIndex === index && (
                      <div className="mt-4 text-gray-300 leading-relaxed animate-in slide-in-from-top-2 duration-200 fade-in pr-6">
                        {typeof item.a === 'string' ? <p>{item.a}</p> : item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}