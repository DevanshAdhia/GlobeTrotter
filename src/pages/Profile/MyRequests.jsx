import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { requestStore } from '../../services/requestStore';
import { RequestCard } from '../../components/profile/RequestCard';
import { Link } from 'react-router-dom';

const MyRequests = () => {
  const { user } = useAuth();
  const requests = requestStore.getUserRequests(user?.id);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Trip Requests</h2>
      {requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map(req => <RequestCard key={req.requestId} request={req} />)}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center">
          <p className="text-gray-500 mb-6">You have no active trip requests.</p>
          <Link to="/domestic-destinations" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark">Start Planning</Link>
        </div>
      )}
    </motion.div>
  );
};
export default MyRequests;
