import React from 'react';
import { motion } from 'framer-motion';

export const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f7ff] p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div className="p-8 md:p-10">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="text-[#002b5e] font-extrabold text-3xl tracking-tight leading-none flex items-end gap-1">
              <span className="text-4xl">A</span>jay Modi
            </div>
            <div className="flex flex-col ml-1 text-center leading-none mt-1">
              <span className="text-[#002b5e] text-[11px] font-bold tracking-widest">TRAVELS</span>
              <span className="text-gray-400 text-[7px] tracking-wider">Dream. Travel. Explore.</span>
            </div>
          </div>

          {/* Form Content */}
          {children}
        </div>
      </motion.div>
    </div>
  );
};
