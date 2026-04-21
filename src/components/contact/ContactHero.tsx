import Link from 'next/link';

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-20 md:z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-60 md:opacity-20">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="contactGrad" x1="50%" x2="50%" y1="0%" y2="100%">
                <stop stopColor="#3B82F6" stopOpacity=".25" offset="0%"></stop>
                <stop stopColor="#10B981" stopOpacity=".2" offset="100%"></stop>
              </linearGradient>
            </defs>
            <path fill="url(#contactGrad)" d="M400,115 C515.46,115 615,214.54 615,330 C615,445.46 515.46,545 400,545 C284.54,545 185,445.46 185,330 C185,214.54 284.54,115 400,115 Z" transform="translate(0 -50)"></path>
            <path fill="url(#contactGrad)" d="M400,115 C515.46,115 615,214.54 615,330 C615,445.46 515.46,545 400,545 C284.54,545 185,445.46 185,330 C185,214.54 284.54,115 400,115 Z" transform="translate(350 150)"></path>
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-full h-full opacity-50 md:opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="#6366F1" strokeWidth="2">
              <path d="M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764"></path>
              <path d="M-4 44L190 190 731 737 520 660 309 538 40 599 295 764"></path>
            </g>
          </svg>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center">
        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 border border-blue-800/50 rounded-full">
          Get in Touch
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          <span className="block">Contact Us</span>
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            We're Here to Help
          </span>
        </h1>
        <p className="max-w-2xl mt-5 mx-auto text-xl text-gray-300">
          Have questions about trading? Our multilingual support team is available to assist you 24/7.
        </p>
      </div>
    </section>
  );
}