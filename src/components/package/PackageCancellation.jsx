import React from 'react';
import { ShieldAlert } from 'lucide-react';

const PackageCancellation = ({ policy }) => {
  if (!policy) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <ShieldAlert className="w-6 h-6 mr-3 text-gray-400" /> Cancellation & Policies
      </h2>
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-gray-700 leading-relaxed">
        {policy.text || "Cancellation policy will be confirmed during enquiry."}
      </div>
    </section>
  );
};
export default PackageCancellation;