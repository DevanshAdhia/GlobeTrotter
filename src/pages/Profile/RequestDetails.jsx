import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { requestStore } from '../../services/requestStore';
import { motion } from 'framer-motion';

const RequestDetails = () => {
  const { requestId } = useParams();
  const req = requestStore.getRequest(requestId);

  if (!req) return <div className="p-8 text-center text-gray-500">Request not found. <Link to="/profile/requests" className="text-primary underline">Go back</Link></div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Details</h2>
      <p className="text-gray-500 mb-6">ID: {req.requestId}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500 font-semibold uppercase">Destination</p>
          <p className="text-lg font-bold text-gray-900">{req.destinationName || req.destinationSlug}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 font-semibold uppercase">Status</p>
          <p className="text-lg font-bold text-primary">{req.status}</p>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-100">
        <Link to="/profile/requests" className="text-gray-500 hover:text-gray-900 font-semibold">← Back to Requests</Link>
      </div>
    </motion.div>
  );
};
export default RequestDetails;
