import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Home, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const RequestSuccess = ({ destination, requestId, tripSnapshot }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const id = requestId;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 py-20"
    >
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.15, stiffness: 180, damping: 14 }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-500" strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Trip Request Sent!</h1>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Your {destination?.name} trip request has been successfully submitted. Our travel team will contact you shortly.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Request ID</p>
            <p className="text-2xl font-bold text-primary tracking-wide">{id}</p>
            <p className="text-xs text-gray-400 mt-2">Save this for your records</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mb-6 text-sm text-blue-700 leading-relaxed">
            Our travel experts will review your trip and get back to you within <strong>24 hours</strong> to confirm details.
          </div>

          {/* Guest: prompt to create account */}
          {!isAuthenticated && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 text-left">
              <p className="font-bold text-amber-800 mb-1">Track your trip!</p>
              <p className="text-sm text-amber-700 mb-3">Create an account to save and track this trip request.</p>
              <button
                onClick={() => navigate('/signup', { state: { requestId: id } })}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <UserPlus className="w-4 h-4" /> Create Account
              </button>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {isAuthenticated && (
              <button
                onClick={() => navigate(`/profile/requests/${id}`)}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl transition-colors"
              >
                View My Request
              </button>
            )}
            <button
              onClick={() => navigate('/')}
              className="w-full border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
