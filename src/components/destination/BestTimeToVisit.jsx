import React from 'react';
import { CloudSun, Info } from 'lucide-react';

const BestTimeToVisit = ({ bestTime }) => {
  if (!bestTime) return null;

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <CloudSun className="w-6 h-6 mr-3 text-primary" /> Best Time to Visit
      </h2>
      <div className="bg-gradient-to-br from-[#0a192f] to-[#112240] rounded-2xl p-8 text-white relative overflow-hidden">
        {/* Background decorative circle */}
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none"></div>
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-white/60 text-sm uppercase tracking-widest font-bold mb-1">Peak Season</p>
            <p className="text-3xl font-bold">{bestTime.season}</p>
            <p className="text-primary-light font-medium mt-1 text-lg">{bestTime.months}</p>
          </div>
          <div>
            <p className="text-white/60 text-sm uppercase tracking-widest font-bold mb-1">Weather</p>
            <p className="text-xl font-medium">{bestTime.weather}</p>
          </div>
          <div>
            <p className="text-white/60 text-sm uppercase tracking-widest font-bold mb-1 flex items-center"><Info className="w-4 h-4 mr-1" /> Why Visit</p>
            <p className="text-white/90 leading-relaxed">{bestTime.reason}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BestTimeToVisit;