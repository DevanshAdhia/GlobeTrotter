import React from 'react';
import { Clock, Moon, MapPin, IndianRupee, Star } from 'lucide-react';

const PackageQuickInfo = ({ pkg }) => {
  const items = [
    { icon: Clock, label: 'Duration', value: pkg.duration },
    { icon: Moon, label: 'Nights', value: `${pkg.nights} Nights` },
    { icon: MapPin, label: 'Destination', value: pkg.destinationSlug.charAt(0).toUpperCase() + pkg.destinationSlug.slice(1) },
    { icon: IndianRupee, label: 'Starting Price', value: `From ${pkg.currency}${pkg.startingPrice.toLocaleString('en-IN')}` },
    { icon: Star, label: 'Rating', value: `${pkg.rating} / 5.0` }
  ];

  return (
    <div className="w-full overflow-x-auto pb-4 mb-10 hide-scrollbar">
      <div className="flex gap-4 min-w-max">
        {items.map((item, i) => (
          <div key={i} className="flex items-center bg-white border border-gray-100 shadow-sm rounded-2xl px-5 py-4 min-w-[160px]">
            <div className="bg-primary/10 p-2.5 rounded-xl text-primary mr-4">
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">{item.label}</p>
              <p className="text-sm font-bold text-gray-900 mt-0.5">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PackageQuickInfo;