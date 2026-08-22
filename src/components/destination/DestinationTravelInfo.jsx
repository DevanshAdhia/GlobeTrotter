import React from 'react';
import { Globe, Plane, Map, CreditCard, Languages, Clock, Sun, FileText } from 'lucide-react';

const InfoItem = ({ icon: Icon, label, value }) => {
  if (!value) return null;
  return (
    <div className="flex items-start bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
      <div className="bg-primary/10 p-3 rounded-full text-primary mr-4 shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-500 mb-1">{label}</p>
        <p className="text-gray-900 font-medium">{value}</p>
      </div>
    </div>
  );
};

const DestinationTravelInfo = ({ destination }) => {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Essential Travel Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {destination.category === 'international' && (
          <>
            <InfoItem icon={FileText} label="Visa Information" value={destination.visaType} />
            <InfoItem icon={CreditCard} label="Currency" value={destination.currencyInfo} />
          </>
        )}
        <InfoItem icon={Languages} label="Local Language" value={destination.language} />
        <InfoItem icon={Clock} label="Timezone" value={destination.timezone} />
        {destination.weather && (
          <InfoItem icon={Sun} label="Average Weather" value={`${destination.weather.temp} — ${destination.weather.condition}`} />
        )}
        {destination.category === 'weekend' && destination.distance && (
          <InfoItem icon={Map} label="Distance from Origin" value="Check route in planner for exact distance." />
        )}
      </div>
    </section>
  );
};
export default DestinationTravelInfo;