import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
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
    <div className="relative -mt-16 sm:-mt-20 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <motion.div 
        initial={{ opacity: 0, y: 25 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Category Tabs Pill */}
        <div className="inline-flex bg-white/90 backdrop-blur-md p-1.5 rounded-t-2xl shadow-lg border-t border-x border-gray-100/90 ml-3 md:ml-6">
          <SearchTabs active={tab} onChange={setTab} />
        </div>

        {/* Floating Search Bar Card */}
        <div className="bg-white rounded-3xl rounded-tl-none shadow-[0_20px_50px_rgba(0,51,128,0.12)] p-5 md:p-7 border border-gray-100/90 transition-all duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3 items-end">
            
            {/* Destination Input */}
            <div className="w-full">
              <DestinationField value={destination} onChange={setDestination} />
            </div>

            {/* Date Input */}
            <div className="w-full">
              <DateField value={startDate} onChange={setStartDate} />
            </div>

            {/* Travelers Input */}
            <div className="w-full">
              <TravelerField value={travelers} onChange={setTravelers} />
            </div>

            {/* Budget Input */}
            <div className="w-full">
              <BudgetField value={budget} onChange={setBudget} />
            </div>

            {/* Submit Button */}
            <div className="w-full">
              <button 
                onClick={handleSearch} 
                className="w-full bg-gradient-to-r from-primary via-[#003380] to-[#0a192f] hover:from-primary-dark hover:to-[#002255] text-white font-extrabold rounded-xl px-5 py-3 flex items-center justify-center space-x-2 transition-all duration-300 shadow-md shadow-primary/20 hover:shadow-lg hover:scale-[1.01] active:scale-98 text-sm whitespace-nowrap cursor-pointer min-h-[46px]"
              >
                <Search className="w-4 h-4 text-accent shrink-0" />
                <span>Explore Packages</span>
              </button>
            </div>

          </div>
        </div>
        
      </motion.div>
    </div>
  );
};

export default TravelSearch;