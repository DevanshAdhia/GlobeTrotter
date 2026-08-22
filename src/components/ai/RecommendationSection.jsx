/**
 * components/ai/RecommendationSection.jsx
 * A labeled section of recommendation cards with horizontal scroll on mobile.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { RecommendationCard } from './RecommendationCard';

export const RecommendationSection = ({ title, subtitle, icon, items, emptyMessage, horizontal = false }) => {
  if (!items || items.length === 0) {
    if (!emptyMessage) return null;
    return (
      <div className="text-sm text-gray-400 italic px-1">{emptyMessage}</div>
    );
  }

  return (
    <section aria-labelledby={`section-${title}`} className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        {icon && <span className="text-xl" role="img" aria-hidden>{icon}</span>}
        <div>
          <h2 id={`section-${title}`} className="text-xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      {horizontal ? (
        /* Horizontal scroll — great for mobile "swipe" UX */
        <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
          {items.map((scored, i) => (
            <div key={scored.item.id} className="w-72 shrink-0">
              <RecommendationCard scored={scored} delay={i * 0.05} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {items.map((scored, i) => (
            <RecommendationCard key={scored.item.id} scored={scored} delay={i * 0.05} />
          ))}
        </div>
      )}
    </section>
  );
};
