import React from 'react';

export const ContactPreference = ({ preference, setPreference, errors = {} }) => {
  const options = [
    { id: 'whatsapp', name: 'WhatsApp' },
    { id: 'phone', name: 'Phone' },
    { id: 'email', name: 'Email' }
  ];

  return (
    <div className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4">How should we contact you?</h3>
      <div className="flex gap-4 mb-2">
        {options.map((option) => (
          <label key={option.id} className="flex items-center cursor-pointer">
            <input 
              type="radio" 
              name="contactPreference" 
              value={option.id}
              checked={preference === option.id}
              onChange={(e) => setPreference(e.target.value)}
              className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">{option.name}</span>
          </label>
        ))}
      </div>
      {errors.contactPreference && <p className="text-xs text-red-500 mt-1">{errors.contactPreference}</p>}
    </div>
  );
};
