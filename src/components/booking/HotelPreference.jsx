import React from 'react';

export const HotelPreference = ({ hotel, setHotel }) => {
  const options = [
    { id: 'standard', name: 'Standard', desc: 'Comfortable 3-star stay', price: 0 },
    { id: 'premium', name: 'Premium', desc: 'Excellent 4-star stay', price: 15000 },
    { id: 'luxury', name: 'Luxury', desc: 'Exceptional 5-star stay', price: 35000 },
  ];

  return (
    <div className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Choose Your Stay</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <div 
            key={option.id}
            onClick={() => setHotel(option.id)}
            className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${hotel === option.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}
            role="radio"
            aria-checked={hotel === option.id}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setHotel(option.id); } }}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-gray-900">{option.name}</span>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${hotel === option.id ? 'border-primary' : 'border-gray-300'}`}>
                {hotel === option.id && <div className="w-2 h-2 rounded-full bg-primary" />}
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-3">{option.desc}</p>
            <p className="text-sm font-semibold text-gray-900">
              {option.price === 0 ? 'Included' : `+ ₹${option.price.toLocaleString('en-IN')}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
