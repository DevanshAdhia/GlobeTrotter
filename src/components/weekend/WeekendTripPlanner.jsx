import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import StartingLocation from './StartingLocation';
import WeekendDatePicker from './WeekendDatePicker';
import DurationSelector from './DurationSelector';
import TravellerSelector from './TravellerSelector';
import WeekendTripType from './WeekendTripType';
import WeekendBudget from './WeekendBudget';

const WeekendTripPlanner = ({ onSearch, initialValues }) => {
  const [from, setFrom] = useState(initialValues.from || '');
  const [dates, setDates] = useState(initialValues.dates || '');
  const [duration, setDuration] = useState(initialValues.duration || '2 Days');
  const [adults, setAdults] = useState(parseInt(initialValues.adults) || 2);
  const [children, setChildren] = useState(parseInt(initialValues.children) || 0);
  const [infants, setInfants] = useState(parseInt(initialValues.infants) || 0);
  const [type, setType] = useState(initialValues.type || 'Any Type');
  const [budget, setBudget] = useState(initialValues.budget || 'Any Budget');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!from) { toast.error('Please select your starting city.'); return; }
    if (!dates) { toast.error('Please select your travel dates.'); return; }
    
    onSearch({ from, dates, duration, adults, children, infants, type, budget });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:-mt-16">
      <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 lg:p-6">
        <fieldset className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <legend className="sr-only">Weekend Trip Planner</legend>
          <StartingLocation value={from} onChange={setFrom} />
          <WeekendDatePicker value={dates} onChange={setDates} />
          <DurationSelector value={duration} onChange={setDuration} />
          <TravellerSelector adults={adults} setAdults={setAdults} children={children} setChildren={setChildren} infants={infants} setInfants={setInfants} />
          <WeekendTripType value={type} onChange={setType} />
          <WeekendBudget value={budget} onChange={setBudget} />
        </fieldset>
        <div className="mt-6 flex justify-end">
          <button type="submit" className="w-full lg:w-auto bg-primary hover:bg-primary-dark text-white px-10 py-3.5 rounded-xl font-bold text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-md">
            Find Weekend Trips
          </button>
        </div>
      </form>
    </motion.div>
  );
};
export default WeekendTripPlanner;