import React from 'react';
import { Clock, CalendarDays, IndianRupee, Star, Package } from 'lucide-react';

const QuickDestinationInfo = ({ destination }) => {
  if (!destination) return null;

  const seasonVal = typeof destination.bestTime === 'object' 
    ? (destination.bestTime.season || destination.bestTime.months || 'Sep - Apr') 
    : (destination.bestTime || 'Sep - Apr');

  const currencySym = destination.currency || '₹';
  const priceVal = `${currencySym}${(destination.startingPrice || 49999).toLocaleString('en-IN')}`;

  const items = [
    { icon: Clock, label: 'Duration', value: destination.duration || '7 - 10 Days' },
    { icon: CalendarDays, label: 'Best Season', value: seasonVal },
    { icon: IndianRupee, label: 'Starting Price', value: priceVal },
    { icon: Star, label: 'Rating', value: `${destination.rating || 4.8} (${destination.reviewCount || 300})` },
    { icon: Package, label: 'Available', value: `${destination.packageCount || 12} Packages` },
  ];

  return (
    <div className="w-full overflow-x-auto pb-4 mb-8 hide-scrollbar">
      <div className="flex gap-4 min-w-max">
        {items.map((item, i) => (
          <div key={i} className="flex items-center bg-white border border-gray-100 shadow-sm rounded-xl px-5 py-4 min-w-[170px]">
            <div className="bg-[#002b5e]/10 p-2.5 rounded-lg text-[#002b5e] mr-3 shrink-0">
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{item.label}</p>
              <p className="text-xs font-extrabold text-gray-900 mt-0.5">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickDestinationInfo;