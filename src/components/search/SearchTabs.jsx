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
            'search-tab-button select-none cursor-pointer',
            active === name ? 'search-tab-button-active' : 'search-tab-button-inactive'
          )}
        >
          <Icon className={clsx('w-4 h-4 shrink-0', active === name ? 'text-amber-300' : 'text-gray-400')} />
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
};

export default SearchTabs;