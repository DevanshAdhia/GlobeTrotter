import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
          <input type="text" readOnly value={user?.name || ''} className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 text-gray-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input type="email" readOnly value={user?.email || ''} className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 text-gray-500" />
        </div>
      </div>
      <div className="border-t border-gray-100 pt-8">
        <button onClick={handleLogout} className="bg-red-50 text-red-600 hover:bg-red-100 px-6 py-2 rounded-xl font-bold transition-colors">
          Log Out
        </button>
      </div>
    </motion.div>
  );
};
export default Settings;
