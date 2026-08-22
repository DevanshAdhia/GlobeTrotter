import React from 'react';
import { motion } from 'framer-motion';

export const BookingProgress = ({ currentStep = 3, totalSteps = 5, title = "Customize Trip" }) => {
  return (
    <div className="mb-8">
      {/* Mobile view */}
      <div className="md:hidden">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          STEP {currentStep} OF {totalSteps}
        </p>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>

      {/* Desktop view */}
      <div className="hidden md:flex items-center justify-between w-full max-w-2xl mx-auto mb-10">
        {['Destination', 'Package', 'Customize', 'Review', 'Request'].map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2 transition-colors
                  ${isActive ? 'bg-primary text-white' : 
                    isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}
                >
                  {isCompleted ? '✓' : stepNumber}
                </div>
                <span className={`text-xs ${isActive ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                  {step}
                </span>
              </div>
              {index < 4 && (
                <div className={`flex-1 h-1 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
