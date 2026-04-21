export default function HowCopyWorks() {
  const steps = [
    {
      num: '1',
      title: 'Browse Strategies',
      desc: 'Explore our marketplace of trading strategies. Filter by performance metrics, risk level, asset class, and more to find strategies that match your investment goals.'
    },
    {
      num: '2',
      title: 'Select & Subscribe',
      desc: 'Choose the strategies you want to follow. Set your risk parameters and allocation amount to customize how much capital you want to allocate to each strategy.'
    },
    {
      num: '3',
      title: 'Automated Trading',
      desc: "Once subscribed, trades will be automatically executed in your account based on the strategy provider's activity, adjusted to your risk settings and capital allocation."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 border border-blue-800/30 rounded-full">
            Trading Process
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            How Copy Trading Works
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Get started with copy trading in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Optional connecting line for desktop */}
          <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-0.5 bg-gray-700 -z-10"></div>
          
          {steps.map((step) => (
            <div key={step.num} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 relative pt-12 text-center group hover:border-blue-500/50 transition-colors">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-gray-900 group-hover:scale-110 transition-transform">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
