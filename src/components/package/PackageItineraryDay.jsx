import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Utensils, BedDouble, Activity, MapPin } from 'lucide-react';

const PackageItineraryDay = ({ dayData, isLast }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative pl-8 md:pl-12 pb-8">
      {/* Timeline line */}
      {!isLast && <div className="absolute top-8 bottom-0 left-[11px] md:left-[19px] w-0.5 bg-gray-200"></div>}
      
      {/* Timeline dot */}
      <div className="absolute top-1 left-0 md:left-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center border-4 border-white shadow-sm z-10">
        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden transition-all hover:border-gray-200">
        <button onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:bg-gray-50">
          <div>
            <p className="text-primary font-bold text-sm tracking-wide uppercase mb-1">Day {dayData.day}</p>
            <h3 className="text-lg font-bold text-gray-900">{dayData.title}</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="px-6 pb-6 pt-2 border-t border-gray-50">
                <p className="text-gray-700 leading-relaxed mb-5">{dayData.description}</p>
                
                <div className="flex flex-col gap-3">
                  {dayData.activities && dayData.activities.length > 0 && (
                    <div className="flex items-start">
                      <Activity className="w-4 h-4 text-gray-400 mt-1 mr-3 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Activities</span>
                        <div className="flex flex-wrap gap-2">
                          {dayData.activities.map((act, i) => (
                            <span key={i} className="bg-gray-100 text-gray-700 text-sm px-2.5 py-1 rounded-md">{act}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {dayData.meals && dayData.meals.length > 0 && (
                    <div className="flex items-start">
                      <Utensils className="w-4 h-4 text-gray-400 mt-1 mr-3 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Meals Included</span>
                        <span className="text-gray-700 text-sm">{dayData.meals.join(', ')}</span>
                      </div>
                    </div>
                  )}

                  {dayData.stay && (
                    <div className="flex items-start">
                      <BedDouble className="w-4 h-4 text-gray-400 mt-1 mr-3 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Stay</span>
                        <span className="text-gray-700 text-sm">{dayData.stay}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default PackageItineraryDay;