import React from 'react';

export const ChildAgeSelector = ({ childAges, setChildAges, childrenCount }) => {
  const handleChange = (index, age) => {
    const newAges = [...childAges];
    newAges[index] = age;
    setChildAges(newAges);
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Array.from({ length: childrenCount }).map((_, index) => (
        <div key={index}>
          <label className="block text-xs font-semibold text-gray-500 mb-1">
            Child {index + 1} Age
          </label>
          <select 
            value={childAges[index] || '5'}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50 text-sm"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <option key={i} value={i}>{i} {i === 1 ? 'year' : 'years'}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};
