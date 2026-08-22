import React from 'react';
import { motion } from 'framer-motion';
import { Camera, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const Initials = ({ name }) => {
  const parts = (name || 'U').split(' ').filter(Boolean);
  const letters = parts.length >= 2 ? `${parts[0][0]}${parts[parts.length-1][0]}` : parts[0]?.[0] || 'U';
  return (
    <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold shrink-0"
      aria-label={`Profile picture for ${name}`}
    >
      {letters.toUpperCase()}
    </div>
  );
};

export const ProfileHeader = ({ user, onEdit }) => {
  const memberYear = user?.memberSince
    ? format(new Date(user.memberSince), 'MMM yyyy')
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
      {/* Blue top band */}
      <div className="h-24 bg-gradient-to-r from-primary to-blue-500" />

      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-10">
          <div className="relative">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={`Profile picture for ${user.name}`}
                className="w-20 h-20 rounded-full border-4 border-white shadow object-cover"
              />
            ) : (
              <div className="border-4 border-white shadow rounded-full">
                <Initials name={user?.name} />
              </div>
            )}
          </div>

          <button
            onClick={onEdit}
            className="self-start sm:self-auto bg-primary hover:bg-primary-dark text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Edit Profile
          </button>
        </div>

        <div className="mt-4">
          <h2 className="text-2xl font-bold text-gray-900">{user?.name || 'Traveller'}</h2>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
            {user?.email && (
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Mail className="w-4 h-4 text-primary" /> {user.email}
              </div>
            )}
            {user?.phone && (
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Phone className="w-4 h-4 text-primary" /> {user.phone}
              </div>
            )}
            {memberYear && (
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar className="w-4 h-4 text-primary" /> Member since {memberYear}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
