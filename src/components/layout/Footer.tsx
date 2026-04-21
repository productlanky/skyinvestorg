import Link from 'next/link';
import { Twitter, Linkedin, Mail, Monitor, Smartphone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Footer: Links & Info */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div>
              <div className="mb-6">
                <Link href="/" className="text-xl font-bold text-white tracking-wider">
                  SKY<span className="text-blue-500">INVEST</span>ORG
                </Link>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                SkyInvestOrg offers CFD trading on stocks, forex, indices, commodities, and cryptocurrencies with competitive spreads and advanced trading tools.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:info@skyinvestorg.com" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Email</span>
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-sm text-gray-400 hover:text-white transition">About Us</Link></li>
                <li><Link href="/why-us" className="text-sm text-gray-400 hover:text-white transition">Why Choose Us</Link></li>
                <li><Link href="/education" className="text-sm text-gray-400 hover:text-white transition">Education</Link></li>
                <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition">Contact</Link></li>
              </ul>
            </div>

            {/* Trading */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Trading</h3>
              <ul className="space-y-3">
                <li><Link href="/cryptocurrencies" className="text-sm text-gray-400 hover:text-white transition">Cryptocurrencies</Link></li>
                <li><Link href="/forex" className="text-sm text-gray-400 hover:text-white transition">Forex</Link></li>
                <li><Link href="/shares" className="text-sm text-gray-400 hover:text-white transition">Shares</Link></li>
                <li><Link href="/indices" className="text-sm text-gray-400 hover:text-white transition">Indices</Link></li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Your Account</h3>
              <ul className="space-y-3">
                <li><Link href="/login" className="text-sm text-gray-400 hover:text-white transition">Log In</Link></li>
                <li><Link href="/register" className="text-sm text-gray-400 hover:text-white transition">Create Account</Link></li>
                <li><Link href="/help" className="text-sm text-gray-400 hover:text-white transition">Help Center</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Platform Availability */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h4 className="text-sm font-semibold text-white mb-4 md:mb-0">Available On</h4>
            <div className="flex items-center space-x-6">
              <span className="flex items-center text-gray-400">
                <Monitor className="w-4 h-4 mr-2" /> <span className="text-sm">Web & Desktop</span>
              </span>
              <span className="flex items-center text-gray-400">
                <Smartphone className="w-4 h-4 mr-2" /> <span className="text-sm">Mobile App</span>
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="py-6 border-t border-gray-800">
          <div className="text-xs text-gray-400">
            <p className="mb-4 leading-relaxed">
              <span className="font-semibold text-gray-300">RISK WARNING:</span> The Financial Products offered by the company include Contracts for Difference ('CFDs') and other complex financial products. Trading CFDs carries a high level of risk since leverage can work both to your advantage and disadvantage. You should never invest money that you cannot afford to lose.
            </p>
            <div className="flex flex-wrap gap-4 mb-4">
              <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition">Terms & Conditions</Link>
              <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition">Privacy Policy</Link>
            </div>
            <p>&copy; {currentYear} SkyInvestOrg. All Rights Reserved.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}