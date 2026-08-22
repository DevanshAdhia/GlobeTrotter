import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const cities = ['Ahmedabad', 'Vadodara', 'Surat', 'Mumbai', 'Rajkot', 'Delhi', 'Jaipur'];

const StartingLocation = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filtered = cities.filter(c => c.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative flex-1" ref={ref}>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Travelling from</label>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full text-left flex items-center bg-white border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
        <MapPin className="w-5 h-5 text-gray-400 mr-2" />
        <span className={value ? 'text-gray-900 font-medium' : 'text-gray-400'}>{value || 'Select city'}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute z-50 top-full mt-2 w-full lg:w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-2">
            <div className="relative mb-2">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input type="text" placeholder="Search city..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary" autoFocus />
            </div>
            <ul className="max-h-48 overflow-y-auto custom-scrollbar">
              {filtered.map(city => (
                <li key={city}>
                  <button type="button" onClick={() => { onChange(city); setIsOpen(false); setSearch(''); }} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary rounded-lg focus:bg-primary/5 focus:outline-none">
                    {city}
                  </button>
                </li>
              ))}
              {filtered.length === 0 && <li className="px-3 py-2 text-sm text-gray-500">No cities found.</li>}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default StartingLocation;