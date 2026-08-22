import React from 'react';
import { clsx } from 'clsx';

const SearchTabs = ({ active, onChange }) => {
  const tabs = ['Domestic', 'International', 'Weekend'];
  return (
    <div className="flex space-x-2 border-b border-gray-100 pb-2">
      {tabs.map(tab => (
        <button key={tab} onClick={() => onChange(tab)}
          className={clsx('px-4 py-2 rounded-full text-sm font-medium transition-colors',
            active === tab ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
          )}>
          {tab}
        </button>
      ))}
    </div>
  );
};
export default SearchTabs;