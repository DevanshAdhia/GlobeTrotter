import React from 'react';
import { getReturnDate } from '../../utils/dateUtils';
import { format, isValid } from 'date-fns';

export const TravelDatePicker = ({ departureDate, setDepartureDate, duration }) => {
  const returnDate = getReturnDate(departureDate, duration);
  
  // Need to ensure date string works for input value
  const dateValue = departureDate ? new Date(departureDate).toISOString().split('T')[0] : '';
  
  const handleDateChange = (e) => {
    setDepartureDate(e.target.value);
  };
  
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4">When are you travelling?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Departure Date</label>
          <input 
            type="date" 
            min={today}
            value={dateValue}
            onChange={handleDateChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Return Date (Auto-calculated)</label>
          <input 
            type="text" 
            readOnly
            value={returnDate && isValid(returnDate) ? format(returnDate, 'dd MMM yyyy') : 'Select departure'}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};
