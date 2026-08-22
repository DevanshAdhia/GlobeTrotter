import React from 'react';

export const TravellerDetails = ({ details, setDetails, errors = {} }) => {
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <div className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Traveller Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
          <input 
            type="text" 
            name="firstName"
            value={details.firstName || ''}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border transition-colors ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary'} focus:ring-2 outline-none`}
            placeholder="John"
          />
          {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
          <input 
            type="text" 
            name="lastName"
            value={details.lastName || ''}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border transition-colors ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary'} focus:ring-2 outline-none`}
            placeholder="Doe"
          />
          {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
          <input 
            type="email" 
            name="email"
            value={details.email || ''}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border transition-colors ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary'} focus:ring-2 outline-none`}
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            value={details.phone || ''}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border transition-colors ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary'} focus:ring-2 outline-none`}
            placeholder="+91 98765 43210"
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>
      </div>
    </div>
  );
};
