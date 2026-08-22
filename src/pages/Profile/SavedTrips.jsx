import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SavedTrips = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-12 rounded-3xl border border-gray-100 text-center">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Saved Trips</h2>
    <p className="text-gray-500 mb-6">You haven't saved any trips yet.</p>
    <Link to="/domestic-destinations" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark">Explore Destinations</Link>
  </motion.div>
);
export default SavedTrips;
