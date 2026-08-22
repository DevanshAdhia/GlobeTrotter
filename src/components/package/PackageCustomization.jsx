import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, X, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PackageCustomization = ({ pkg }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const options = [
    'Change Hotel Category',
    'Add Extra Nights',
    'Modify Sightseeing / Itinerary',
    'Upgrade Vehicle',
    'Add Special Activities'
  ];

  return (
    <section className="mb-12">
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
            <Settings2 className="w-6 h-6 mr-3 text-primary" /> Customize Your Trip
          </h2>
          <p className="text-gray-600 max-w-xl">
            Make changes to your package based on your dates, stay preferences and travel needs. Our experts will craft the perfect itinerary for you.
          </p>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        >
          Customize Package
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[90] backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-white z-[100] shadow-2xl flex flex-col"
              role="dialog" aria-modal="true" aria-label="Customize Package Drawer"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Customize Package</h3>
                  <p className="text-sm text-gray-500 mt-1">{pkg.name}</p>
                </div>
                <button onClick={() => setIsOpen(false)} aria-label="Close" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 uppercase text-xs tracking-wider">Available Customizations</h4>
                    <div className="space-y-3">
                      {options.map((opt, i) => (
                        <label key={i} className="flex items-center p-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
                          <input type="checkbox" className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary" />
                          <span className="ml-3 font-medium text-gray-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="font-bold text-gray-900 mb-3 uppercase text-xs tracking-wider block">Special Requirements</label>
                    <textarea 
                      rows="4" 
                      placeholder="Tell us what exactly you'd like to change..." 
                      className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-100 bg-white flex gap-4">
                <button onClick={() => setIsOpen(false)} className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold py-3.5 rounded-xl transition-colors">
                  Cancel
                </button>
                <button onClick={() => { setIsOpen(false); navigate(`/contact?package=${pkg.slug}&intent=custom`); }} className="flex-[2] bg-primary text-white hover:bg-primary-dark font-bold py-3.5 rounded-xl transition-colors shadow-md">
                  Request Custom Plan
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
export default PackageCustomization;