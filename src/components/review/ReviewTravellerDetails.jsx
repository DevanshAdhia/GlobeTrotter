import React from 'react';
import { User, Mail, Phone, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';

export const ReviewTravellerDetails = ({ details, contactPreference, onEdit }) => {
  const { firstName, lastName, email, phone } = details || {};

  const maskedPhone = phone
    ? phone.replace(/(\d{2})(\d+)(\d{2})/, (_, a, mid, b) => `${a}${'•'.repeat(mid.length)}${b}`)
    : null;

  const preferenceLabel = {
    whatsapp: 'WhatsApp',
    phone: 'Phone Call',
    email: 'Email',
  }[contactPreference] ?? contactPreference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.22 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-gray-900">Traveller Details</h3>
        </div>
        <button
          onClick={onEdit}
          aria-label="Edit traveller details"
          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
        >
          <Edit3 className="w-3.5 h-3.5" /> Edit Details
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div>
            {firstName || lastName ? (
              <p className="font-semibold text-gray-900">{[firstName, lastName].filter(Boolean).join(' ')}</p>
            ) : (
              <p className="text-sm text-amber-600 font-medium">Name not provided</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4 text-primary" />
          </div>
          <div>
            {email ? (
              <p className="text-sm text-gray-700">{email}</p>
            ) : (
              <p className="text-sm text-amber-600 font-medium">Email not provided</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4 text-primary" />
          </div>
          <div>
            {maskedPhone ? (
              <p className="text-sm text-gray-700">{maskedPhone}</p>
            ) : (
              <p className="text-sm text-amber-600 font-medium">Phone not provided</p>
            )}
          </div>
        </div>
      </div>

      {contactPreference && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
          <span className="text-xs text-gray-400 font-semibold uppercase">Preferred Contact:</span>
          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
            {preferenceLabel}
          </span>
        </div>
      )}
    </motion.div>
  );
};
