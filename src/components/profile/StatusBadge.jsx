import React from 'react';

const STATUS_STYLES = {
  'Draft':             'bg-gray-100 text-gray-600',
  'Request Submitted': 'bg-blue-100 text-blue-700',
  'Under Review':      'bg-amber-100 text-amber-700',
  'Quote Ready':       'bg-purple-100 text-purple-700',
  'Confirmed':         'bg-green-100 text-green-700',
  'Completed':         'bg-teal-100 text-teal-700',
  'Cancelled':         'bg-red-100 text-red-700',
};

export const StatusBadge = ({ status }) => {
  const cls = STATUS_STYLES[status] || STATUS_STYLES['Draft'];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${cls}`}>
      {status}
    </span>
  );
};
