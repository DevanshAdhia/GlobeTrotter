/**
 * components/ai/AILoadingState.jsx
 * Shows a sequence of AI "thinking" messages to make loading feel intentional.
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const MESSAGES = [
  'Understanding your travel preferences…',
  'Finding places that match your interests…',
  'Personalising your recommendations…',
  'Almost ready — building your perfect trip…',
];

export const AILoadingState = ({ destination }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= MESSAGES.length - 1) return;
    const t = setTimeout(() => setStep(s => s + 1), 700);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8"
      >
        <Sparkles className="w-7 h-7 text-primary" />
      </motion.div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Building your {destination} trip
      </h2>

      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="text-gray-500 text-base font-medium"
        >
          {MESSAGES[step]}
        </motion.p>
      </AnimatePresence>

      <div className="flex gap-2 mt-6">
        {MESSAGES.map((_, i) => (
          <div key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i <= step ? 'bg-primary scale-110' : 'bg-gray-200'}`}
          />
        ))}
      </div>
    </div>
  );
};
