import React from 'react';
import { clsx } from 'clsx';
import { MapPin, Globe, Compass } from 'lucide-react';

const SearchTabs = ({ active, onChange }) => {
  const tabs = [
    { name: 'Domestic', icon: MapPin },
    { name: 'International', icon: Globe },
    { name: 'Weekend', icon: Compass }
  ];

  return (
    <div className="flex items-center space-x-1.5 p-1 bg-white/95 backdrop-blur-md rounded-2xl">
      {tabs.map(({ name, icon: Icon }) => (
        <button 
          key={name} 
          onClick={() => onChange(name)}
          className={clsx(
            'flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-extrabold transition-all duration-300 select-none cursor-pointer',
            active === name 
              ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
          )}
        >
          <Icon className={clsx('w-4 h-4', active === name ? 'text-accent' : 'text-gray-400')} />
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
};

export default SearchTabs;