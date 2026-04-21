export default function WhyUsAbout() {
  return (
    <section className="py-16 bg-gray-900 relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-emerald-900/10 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">About Us</h2>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-400"></div>
        </div>

        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-700 shadow-xl overflow-hidden p-8 md:p-12 max-w-4xl mx-auto">
          <div className="prose prose-lg prose-invert max-w-none text-gray-300 space-y-6 leading-relaxed">
            <p>
              SkyInvestOrg has become one of the most reputable brokers in the industry, offering traders CFDs across Forex, Equities, Commodities and Futures. Trading on the Forex market is a legitimate and straightforward way of generating income. And the good news is that you don't have to be a professional trader in order to make money. All you need is the right personality and the right skill set and you can make money trading on foreign exchanges.
            </p>
            <p>
              SkyInvestOrg lets you trade in the way that best suits you. Do you want to risk a little or a lot? Do you want gains in the short term or are you playing a longer game? Are you a day trader, a swing trader or a scalper? Are you an old hand or a rookie just testing the water? It does not matter because SkyInvestOrg puts you in control.
            </p>
            <p>
              If you can control today's success and not let it cloud tomorrow's judgment, you probably have it in you to make money as a currency trader. The prizes in Forex are certainly glittering but it is level headedness and persistence that win the day. With the right tools, information and access to all the world's currencies, SkyInvestOrg puts you in control of the trades you make.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}