import React from 'react';
import { CloudSun, Info } from 'lucide-react';

const BestTimeToVisit = ({ bestTime }) => {
  if (!bestTime) return null;

  const seasonText = typeof bestTime === 'object' ? (bestTime.season || bestTime.months || 'Peak Season') : bestTime;
  const weatherText = typeof bestTime === 'object' ? (bestTime.weather || 'Pleasant & Warm') : 'Pleasant & Warm Weather';
  const reasonText = typeof bestTime === 'object' ? (bestTime.reason || 'Ideal for sightseeing and outdoor exploration') : 'Perfect weather for sightseeing, coastal drives, and outdoor activities.';

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <CloudSun className="w-6 h-6 mr-3 text-primary" /> Best Time to Visit
      </h2>
      <div className="bg-gradient-to-br from-[#001d42] to-[#002b5e] rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
        {/* Background decorative circle */}
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none"></div>
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-amber-300 text-xs uppercase tracking-widest font-bold mb-1">Peak Travel Season</p>
            <p className="text-2xl font-bold">{seasonText}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs uppercase tracking-widest font-bold mb-1">Expected Weather</p>
            <p className="text-lg font-medium">{weatherText}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs uppercase tracking-widest font-bold mb-1 flex items-center">
              <Info className="w-4 h-4 mr-1 text-amber-300" /> Travel Tip
            </p>
            <p className="text-white/90 text-sm leading-relaxed">{reasonText}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestTimeToVisit;