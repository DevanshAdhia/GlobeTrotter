import React from 'react';

export const SpecialRequirements = ({ requirements, setRequirements }) => {
  const maxLength = 500;
  
  return (
    <div className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-1">Anything else we should know?</h3>
      <p className="text-sm text-gray-500 mb-4">E.g. birthday celebration, dietary preference, special room request.</p>
      
      <div className="relative">
        <textarea
          value={requirements}
          onChange={(e) => setRequirements(e.target.value.substring(0, maxLength))}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors h-32 resize-none"
          placeholder="Type your special requests here..."
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
          {requirements.length} / {maxLength}
        </div>
      </div>
    </div>
  );
};
