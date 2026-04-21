"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    topic: 'Trading Question',
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replicating original mailto behavior
    window.location.href = `mailto:info@skyinvestorg.com?subject=${formData.topic}&body=Name: ${formData.name}%0D%0A%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage: ${formData.message}`;
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-xl overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Select Type */}
                  <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">Select Topic</label>
                    <select 
                      id="topic"
                      value={formData.topic}
                      onChange={(e) => setFormData({...formData, topic: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      <option value="Trading Question">Trading Question</option>
                      <option value="Finance Question">Finance Question</option>
                      <option value="Technical Question">Technical Question</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                        placeholder="Your name" 
                      />
                    </div>
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                        placeholder="email@example.com" 
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
                    <textarea 
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[150px]" 
                      placeholder="How can we help you?"
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button type="submit" className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </button>
                    <p className="mt-3 text-xs text-gray-400 text-center">
                      Your information is secure and encrypted
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Information Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Customer Support */}
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center mr-4">
                  <HelpCircle className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Customer Support</h3>
              </div>
              <p className="text-gray-300 mb-4 text-sm">
                Our multilingual support team is ready to assist you with any questions or concerns.
              </p>
              <div className="flex items-center text-blue-400 text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                24/7 Support Available
              </div>
            </div>

            {/* Address */}
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center mr-4">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Address</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                11 GRACE AVENUE, STE 108<br/>
                GREAT NECK, NEW YORK, 11021<br/>
                USA
              </p>
            </div>

            {/* Phone & Email */}
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Contact Info</h3>
              </div>
              <div className="space-y-3">
                <a href="mailto:info@skyinvestorg.com" className="text-gray-300 hover:text-blue-400 transition flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-3 text-blue-500" />
                  info@skyinvestorg.com
                </a>
                <a href="tel:" className="text-gray-300 hover:text-blue-400 transition flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-3 text-blue-500" />
                  Request a callback
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}