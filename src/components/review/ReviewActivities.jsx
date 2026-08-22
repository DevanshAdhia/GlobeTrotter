import React from 'react';
import { Zap, Check, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { activities as allActivities } from '../../data/activities';

export const ReviewActivities = ({ selectedActivities, includedActivities, destinationSlug, onEdit }) => {
  const validIds = [...new Set([...includedActivities, ...selectedActivities])].filter(id => {
    const act = allActivities.find(a => a.id === id);
    return act && act.destinationSlug === destinationSlug;
  });

  const resolvedActivities = validIds
    .map(id => allActivities.find(a => a.id === id))
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.14 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-gray-900">
            Experiences
            {resolvedActivities.length > 0 && (
              <span className="ml-2 text-sm text-gray-400 font-normal">
                ({resolvedActivities.length} selected)
              </span>
            )}
          </h3>
        </div>
        <button
          onClick={onEdit}
          aria-label="Edit selected experiences"
          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
        >
          <Edit3 className="w-3.5 h-3.5" /> Edit Experiences
        </button>
      </div>

      {resolvedActivities.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No additional experiences selected.</p>
      ) : (
        <div className="space-y-3">
          {resolvedActivities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3">
              <img
                src={activity.image}
                alt={activity.name}
                className="w-16 h-12 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="font-semibold text-gray-900 truncate">{activity.name}</span>
                  {includedActivities.includes(activity.id) && (
                    <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-md shrink-0">
                      Included
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-0.5 pl-6 text-xs text-gray-400">
                  <span>{activity.duration}</span>
                  {activity.price > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-gray-600 font-semibold">
                        +₹{activity.price.toLocaleString('en-IN')}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
