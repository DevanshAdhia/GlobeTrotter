import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import SearchTabs from './SearchTabs';
import DestinationField from './DestinationField';
import DateField from './DateField';
import DurationField from './DurationField';
import TravelerField from './TravelerField';
import BudgetField from './BudgetField';
import { toast } from 'react-hot-toast';

const TravelSearch = () => {
  const [tab, setTab] = useState('Domestic');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [duration, setDuration] = useState('1 Day');
  const [travelers, setTravelers] = useState({ adults: 2, children: 0, infants: 0 });
  const [budget, setBudget] = useState('Any Budget');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!destination) return toast.error('Please select a destination.');
    if (!startDate) return toast.error('Please select your travel date.');
    if (travelers.adults === 0) return toast.error('At least one adult is required.');

    const query = new URLSearchParams({
      type: tab.toLowerCase(),
      destination,
      startDate: startDate.toISOString(),
      duration,
      adults: travelers.adults,
      children: travelers.children,
      budget
    }).toString();
    navigate('/search?' + query);
  };

  return (
    <div className="relative -mt-16 z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        
        {/* Tabs */}
        <div className="bg-white/90 backdrop-blur-md inline-flex rounded-t-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.02)] px-2 pt-2">
          <SearchTabs active={tab} onChange={setTab} />
        </div>

        {/* Search Bar Container */}
        <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6 border border-gray-100 flex flex-col mt-4">
          
          <div className="flex flex-col lg:flex-row items-end gap-4 w-full">
            <div className="flex-1 w-full relative">
              <DestinationField value={destination} onChange={setDestination} />
            </div>
            
            <div className="flex-1 w-full relative">
              <DateField value={startDate} onChange={setStartDate} />
            </div>

            <div className="flex-1 w-full relative">
              <TravelerField value={travelers} onChange={setTravelers} />
            </div>

            <div className="flex-1 w-full relative">
              <BudgetField value={budget} onChange={setBudget} />
            </div>

            <button onClick={handleSearch} className="bg-[#002b5e] hover:bg-blue-900 text-white rounded-md px-8 py-3 h-[42px] mb-[2px] flex items-center justify-center font-bold text-sm transition-transform shadow-md w-full lg:w-auto shrink-0">
              Explore Packages
            </button>
          </div>
        </div>
        
      </motion.div>
    </div>
  );
};
export default TravelSearch;