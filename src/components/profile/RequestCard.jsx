import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { useNavigate } from 'react-router-dom';

export const RequestCard = ({ request, index = 0 }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.06 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{request.requestId}</p>
          <h3 className="font-bold text-gray-900 text-lg">{request.packageName || 'Trip Request'}</h3>
          <p className="text-sm text-gray-500">{request.destinationName || request.destinationSlug}</p>
        </div>
        <StatusBadge status={request.status || 'Request Submitted'} />
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-sm text-gray-500">
        {request.departureDate && (
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary" />
            {request.departureDate}
          </span>
        )}
        {request.adults && (
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-primary" />
            {request.adults} {request.adults === 1 ? 'Adult' : 'Adults'}
            {request.children > 0 ? ` · ${request.children} ${request.children === 1 ? 'Child' : 'Children'}` : ''}
          </span>
        )}
        {request.estimatedTotal && (
          <span className="font-semibold text-gray-900">
            ≈ ₹{Number(request.estimatedTotal).toLocaleString('en-IN')}
          </span>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => navigate(`/profile/requests/${request.requestId}`)}
          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
        >
          View Request <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
