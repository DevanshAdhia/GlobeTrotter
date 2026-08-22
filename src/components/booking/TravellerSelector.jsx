import React from 'react';
import { ChildAgeSelector } from './ChildAgeSelector';

export const TravellerSelector = ({ adults, setAdults, children, setChildren, rooms, setRooms, childAges, setChildAges }) => {
  
  const Stepper = ({ label, value, onDecrease, onIncrease, min = 0 }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="font-semibold text-gray-700">{label}</span>
      <div className="flex items-center gap-4">
        <button 
          onClick={onDecrease}
          disabled={value <= min}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <span className="w-4 text-center font-bold">{value}</span>
        <button 
          onClick={onIncrease}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Who's travelling?</h3>
      <div className="space-y-1">
        <Stepper 
          label="Adults (12+ yrs)" 
          value={adults} 
          onDecrease={() => setAdults(Math.max(1, adults - 1))}
          onIncrease={() => setAdults(adults + 1)}
          min={1}
        />
        <Stepper 
          label="Children (0-11 yrs)" 
          value={children} 
          onDecrease={() => {
            const newChildren = Math.max(0, children - 1);
            setChildren(newChildren);
            if (newChildren < childAges.length) {
              setChildAges(childAges.slice(0, newChildren));
            }
          }}
          onIncrease={() => {
            setChildren(children + 1);
            setChildAges([...childAges, '5']); // Default age
          }}
          min={0}
        />
        <Stepper 
          label="Rooms" 
          value={rooms} 
          onDecrease={() => setRooms(Math.max(1, rooms - 1))}
          onIncrease={() => setRooms(rooms + 1)}
          min={1}
        />
      </div>

      {children > 0 && (
        <ChildAgeSelector childAges={childAges} setChildAges={setChildAges} childrenCount={children} />
      )}
    </div>
  );
};
