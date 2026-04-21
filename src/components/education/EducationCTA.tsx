import Link from 'next/link';
import { UserPlus, LogIn } from 'lucide-react';

export default function EducationCTA() {
  return (
    <section className="py-16 bg-gray-900 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-gray-900 opacity-50 pointer-events-none"></div>
      
      {/* SVG Wave Bottom Pattern */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#111827" fillOpacity="1" d="M0,224L40,213.3C80,203,160,181,240,181.3C320,181,400,203,480,218.7C560,235,640,245,720,229.3C800,213,880,171,960,165.3C1040,160,1120,192,1200,192C1280,192,1360,160,1400,144L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gray-800/80 backdrop-filter backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700 shadow-2xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Trading?</h2>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              Apply your knowledge and begin your trading journey with our advanced platform. Create an account today and access all our educational resources.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold rounded-lg transition duration-300 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center">
                <span>Create Account</span>
                <UserPlus className="w-5 h-5 ml-2" />
              </Link>
              
              <Link href="/login" className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition duration-300 shadow-lg flex items-center justify-center border border-gray-600 hover:border-gray-500">
                <span>Login</span>
                <LogIn className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}