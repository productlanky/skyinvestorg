"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How can I contact customer support?',
    answer: 'You can contact our customer support team through email, phone, or by filling out the contact form on this page. Our team is available 24/7 to assist you with any questions or concerns.'
  },
  {
    question: 'How long does it take to get a response?',
    answer: 'Our support team typically responds to inquiries within 1-2 hours. For urgent matters, we recommend using our live chat for immediate assistance.'
  },
  {
    question: 'In which languages is support available?',
    answer: 'We provide multilingual support including English, Spanish, Chinese, Japanese, Russian, German, French, Arabic, and Portuguese. This ensures clear communication with our global client base.'
  }
];

export default function ContactFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-400"></div>
          <p className="mt-4 max-w-3xl mx-auto text-gray-300">
            Find answers to common questions about our services and support
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-xl overflow-hidden">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-700 last:border-b-0">
              <button 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)} 
                className="flex items-center justify-between w-full py-5 px-6 text-left text-white focus:outline-none hover:bg-gray-700/30 transition-colors"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-blue-400 transition-transform duration-200 ${activeIndex === index ? 'rotate-180' : ''}`} />
              </button>
              
              {activeIndex === index && (
                <div className="px-6 pb-5 text-gray-300 animate-in slide-in-from-top-2 duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}