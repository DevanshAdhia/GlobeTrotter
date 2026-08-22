import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const RequestAgreement = ({ accepted, setAccepted, error }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.24 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-gray-900">Confirm & Agree</h3>
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <div className="mt-0.5">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            aria-label="Confirm trip details and agree to terms"
            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
          />
        </div>
        <span className="text-sm text-gray-600 leading-relaxed">
          I confirm that the travel details above are correct and I agree to the{' '}
          <a href="#" className="text-primary font-semibold hover:underline focus:outline-none focus:ring-1 focus:ring-primary rounded">
            Terms &amp; Conditions
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary font-semibold hover:underline focus:outline-none focus:ring-1 focus:ring-primary rounded">
            Privacy Policy
          </a>.
          I understand this is a booking request and the final price will be confirmed by the travel team.
        </span>
      </label>

      {error && (
        <p className="text-xs text-red-500 font-medium mt-2 ml-8">{error}</p>
      )}
    </motion.div>
  );
};
