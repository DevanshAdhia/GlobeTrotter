import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import SearchTabs from './SearchTabs';
import DestinationField from './DestinationField';
import DateField from './DateField';
import TravelerField from './TravelerField';
import BudgetField from './BudgetField';
import { toast } from 'react-hot-toast';

const TravelSearch = () => {
  const [tab, setTab] = useState('Domestic');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [travelers, setTravelers] = useState({ adults: 2, children: 0, infants: 0 });
  const [budget, setBudget] = useState('Any Budget');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!destination) return toast.error('Please select a destination.');
    if (!startDate) return toast.error('Please select your travel date.');

    const query = new URLSearchParams({
      type: tab.toLowerCase(),
      destination,
      startDate: startDate.toISOString(),
      adults: travelers.adults,
      children: travelers.children,
      budget
    }).toString();
    navigate('/search?' + query);
  };

  return (
    <div className="relative -mt-20 z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        
        {/* Category Tabs Pill */}
        <div className="inline-flex bg-white/95 backdrop-blur-md p-1.5 rounded-t-2xl shadow-[0_-8px_25px_rgba(0,0,0,0.06)] border-t border-x border-gray-100/80 ml-4">
          <SearchTabs active={tab} onChange={setTab} />
        </div>

        {/* Floating Search Bar Card */}
        <div className="bg-white rounded-3xl rounded-tl-none shadow-[0_20px_50px_rgba(0,43,94,0.12)] p-6 md:p-8 border border-gray-100/80 transition-all duration-300">
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 w-full">
            
            {/* Destination Input */}
            <div className="flex-1 min-w-[200px]">
              <DestinationField value={destination} onChange={setDestination} />
            </div>
            
            <div className="hidden lg:block w-px h-10 bg-gray-200" />

            {/* Date Input */}
            <div className="flex-1 min-w-[180px]">
              <DateField value={startDate} onChange={setStartDate} />
            </div>

            <div className="hidden lg:block w-px h-10 bg-gray-200" />

            {/* Travelers Input */}
            <div className="flex-1 min-w-[180px]">
              <TravelerField value={travelers} onChange={setTravelers} />
            </div>

            <div className="hidden lg:block w-px h-10 bg-gray-200" />

            {/* Budget Input */}
            <div className="flex-1 min-w-[180px]">
              <BudgetField value={budget} onChange={setBudget} />
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleSearch} 
              className="bg-gradient-to-r from-[#002b5e] to-indigo-900 hover:from-blue-900 hover:to-indigo-950 text-white font-bold rounded-2xl px-8 py-4 flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#002b5e]/25 hover:shadow-xl hover:shadow-[#002b5e]/35 hover:scale-[1.02] active:scale-95 text-base shrink-0 border border-white/10 mt-2 lg:mt-0"
            >
              <Search className="w-5 h-5 text-amber-300" />
              <span>Explore Packages</span>
            </button>

          </div>
        </div>
        
      </motion.div>
    </div>
  );
};

export default TravelSearch;