import React from 'react';
import { Clock, CalendarDays, IndianRupee, Star, Package } from 'lucide-react';

const QuickDestinationInfo = ({ destination }) => {
  const items = [
    { icon: Clock, label: 'Duration', value: destination.duration },
    { icon: CalendarDays, label: 'Best Season', value: destination.bestTime.season },
    { icon: IndianRupee, label: 'Starting Price', value: `${destination.currency}${destination.startingPrice.toLocaleString('en-IN')}` },
    { icon: Star, label: 'Rating', value: `${destination.rating} (${destination.reviewCount})` },
    { icon: Package, label: 'Available', value: `${destination.packageCount} Packages` },
  ];

  return (
    <div className="w-full overflow-x-auto pb-4 mb-8 hide-scrollbar">
      <div className="flex gap-4 min-w-max">
        {items.map((item, i) => (
          <div key={i} className="flex items-center bg-white border border-gray-100 shadow-sm rounded-xl px-5 py-4 min-w-[160px]">
            <div className="bg-primary/10 p-2.5 rounded-lg text-primary mr-4">
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{item.label}</p>
              <p className="text-sm font-bold text-gray-900 mt-0.5">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default QuickDestinationInfo;