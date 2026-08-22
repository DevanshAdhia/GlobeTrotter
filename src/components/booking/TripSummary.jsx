import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isValid } from 'date-fns';
import { getReturnDate } from '../../utils/dateUtils';
import { places } from '../../data/places';
import { activities } from '../../data/activities';

export const TripSummary = ({
  destination,
  pkg,
  departureDate,
  adults,
  children,
  rooms,
  selectedPlaces,
  includedPlaces,
  selectedActivities,
  hotel,
  transport,
  totalPrice,
  onContinue
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const durationStr = pkg?.duration;
  const returnDate = getReturnDate(departureDate, durationStr);
  const isValidDates = departureDate && returnDate && isValid(returnDate);

  const getPlaceNames = (ids) => ids.map(id => places.find(p => p.id === id)?.name).filter(Boolean);
  const getActivityNames = (ids) => ids.map(id => activities.find(a => a.id === id)?.name).filter(Boolean);

  const allPlaces = [...includedPlaces, ...selectedPlaces];
  const placeNames = getPlaceNames(allPlaces);
  const activityNames = getActivityNames(selectedActivities);

  const toggleSheet = () => setIsOpen(!isOpen);

  const SummaryContent = () => (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">YOUR {destination?.name?.toUpperCase()} TRIP</h4>
        <h3 className="text-lg font-bold text-gray-900">{pkg?.name}</h3>
        <p className="text-sm text-gray-600">{pkg?.duration}</p>
      </div>

      {(isValidDates || adults > 0) && (
        <div className="bg-gray-50 p-4 rounded-xl space-y-2">
          {isValidDates && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Dates</span>
              <span className="font-semibold text-gray-900">
                {format(new Date(departureDate), 'dd MMM')} - {format(returnDate, 'dd MMM')}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 font-medium">Travellers</span>
            <span className="font-semibold text-gray-900">
              {adults} {adults === 1 ? 'Adult' : 'Adults'} 
              {children > 0 && ` · ${children} ${children === 1 ? 'Child' : 'Children'}`}
            </span>
          </div>
        </div>
      )}

      {placeNames.length > 0 && (
        <div>
          <h4 className="font-bold text-gray-900 text-sm mb-2">Places</h4>
          <ul className="space-y-1.5">
            {placeNames.map((name, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start">
                <span className="text-primary mr-2 font-bold">✓</span> {name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {activityNames.length > 0 && (
        <div>
          <h4 className="font-bold text-gray-900 text-sm mb-2">Experiences</h4>
          <ul className="space-y-1.5">
            {activityNames.map((name, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start">
                <span className="text-primary mr-2 font-bold">✓</span> {name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold text-gray-900 text-sm mb-1">Stay</h4>
          <p className="text-sm text-gray-600 capitalize">{hotel}</p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm mb-1">Transport</h4>
          <p className="text-sm text-gray-600 capitalize">{transport.replace('cab', 'Cab').replace('transfer', 'Transfer')}</p>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4 mt-2">
        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Estimated Total</p>
        <p className="text-2xl font-bold text-gray-900">₹{totalPrice.toLocaleString('en-IN')}</p>
      </div>

      <button 
        onClick={onContinue}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl transition-colors mt-2"
      >
        Continue to Review
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-96 shrink-0">
        <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <SummaryContent />
        </div>
      </div>

      {/* Mobile Bottom Sheet & Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleSheet}
                className="fixed inset-0 bg-black/50 z-40"
              />
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[85vh] overflow-y-auto pb-24"
              >
                <div className="p-6">
                  <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
                  <SummaryContent />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] relative z-50 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-900">₹{totalPrice.toLocaleString('en-IN')}</p>
            <button onClick={toggleSheet} className="text-xs text-primary font-semibold hover:underline">
              View Trip Summary
            </button>
          </div>
          <button 
            onClick={onContinue}
            className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};
