import { ShieldCheck, FileCheck } from 'lucide-react';

export default function RegulationContent() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Box */}
        <div className="bg-gray-800/50 backdrop-filter backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-xl">
          <div className="space-y-8">
            
            {/* Entity 1: FSA */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center border border-blue-500/20">
                  <ShieldCheck className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="pt-2">
                <p className="text-gray-300 leading-relaxed text-lg">
                  <span className="font-semibold text-white">Shield Gold Signal</span> with registration number 709718501 is a company registered under the Laws of Seychelles and is licensed by the <span className="text-blue-400">Financial Services Authority (FSA)</span> of Seychelles.
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-gray-700/50"></div>

            {/* Entity 2: CySEC */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-emerald-900/50 flex items-center justify-center border border-emerald-500/20">
                  <FileCheck className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
              <div className="pt-2">
                <p className="text-gray-300 leading-relaxed text-lg">
                  Shield Gold Signal is a tradename of Shield Gold Signal with registration number HE 19818009, which is registered as a Cyprus Investment Firm (CIF) and licensed by the <span className="text-emerald-400">Cyprus Securities and Exchange Commission (CySEC)</span> in accordance with the Markets In Financial Instruments Directive (MiFID II).
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}