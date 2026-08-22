import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isValid } from 'date-fns';
import { getReturnDate } from '../../utils/dateUtils';

export const RequestSummary = ({ destination, pkg, departureDate, adults, children, rooms, estimatedTotal, onSubmit }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const returnDate = getReturnDate(departureDate, pkg?.duration);
  const depValid   = departureDate && isValid(new Date(departureDate));
  const retValid   = returnDate && isValid(returnDate);

  return (
    <>
      {/* Desktop sticky sidebar — rendered as a child inside the layout grid */}
      <div className="hidden lg:block w-96 shrink-0">
        <div className="sticky top-24">
          <SummaryCard
            destination={destination}
            pkg={pkg}
            departureDate={depValid ? departureDate : null}
            returnDate={retValid ? returnDate : null}
            adults={adults}
            children={children}
            rooms={rooms}
            estimatedTotal={estimatedTotal}
            onSubmit={onSubmit}
          />
        </div>
      </div>

      {/* Mobile bottom sheet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/50 z-40"
              />
              <motion.div
                key="sheet"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[80vh] overflow-y-auto pb-28"
              >
                <div className="p-6">
                  <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
                  <SummaryCard
                    destination={destination}
                    pkg={pkg}
                    departureDate={depValid ? departureDate : null}
                    returnDate={retValid ? returnDate : null}
                    adults={adults}
                    children={children}
                    rooms={rooms}
                    estimatedTotal={estimatedTotal}
                    onSubmit={onSubmit}
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="bg-white border-t border-gray-200 px-4 py-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] relative z-50 flex items-center gap-4">
          <div className="flex-1">
            <p className="text-xs text-gray-400 font-semibold uppercase">Estimated</p>
            <p className="text-lg font-bold text-gray-900">₹{estimatedTotal.toLocaleString('en-IN')}</p>
          </div>
          <button
            onClick={() => setIsOpen(v => !v)}
            className="text-xs text-primary font-semibold hover:underline"
          >
            {isOpen ? 'Close' : 'View Summary'}
          </button>
          <button
            onClick={onSubmit}
            className="bg-primary hover:bg-primary-dark text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm shrink-0"
          >
            Request Trip
          </button>
        </div>
      </div>
    </>
  );
};

const SummaryCard = ({ destination, pkg, departureDate, returnDate, adults, children, rooms, estimatedTotal, onSubmit }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
        YOUR {destination?.name?.toUpperCase()} TRIP
      </p>
      <h3 className="text-xl font-bold text-gray-900">{pkg?.name}</h3>
      <p className="text-sm text-gray-500">{pkg?.duration}</p>
    </div>

    <div className="bg-gray-50 rounded-xl p-4 space-y-2">
      {departureDate && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Dates</span>
          <span className="font-semibold text-gray-900">
            {format(new Date(departureDate), 'dd MMM')}
            {returnDate ? ` – ${format(returnDate, 'dd MMM')}` : ''}
          </span>
        </div>
      )}
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Travellers</span>
        <span className="font-semibold text-gray-900">
          {adults} {adults === 1 ? 'Adult' : 'Adults'}
          {children > 0 ? ` · ${children} ${children === 1 ? 'Child' : 'Children'}` : ''}
        </span>
      </div>
    </div>

    <div className="border-t border-gray-100 pt-4">
      <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Estimated Total</p>
      <p className="text-3xl font-bold text-gray-900">₹{estimatedTotal.toLocaleString('en-IN')}</p>
      <p className="text-xs text-gray-400 mt-1">Subject to confirmation by our team</p>
    </div>

    <button
      onClick={onSubmit}
      className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-colors text-base shadow-sm"
    >
      Request My Trip
    </button>
  </div>
);
