/**
 * components/ai/RecommendationCard.jsx
 * Rich interactive card for a single recommendation.
 * Shows: image, name, category, rating, match score,
 *        Like/Save/Skip actions, and "Why this?" tooltip.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Bookmark, XCircle, Star, Sparkles, Info, Plus, Check } from 'lucide-react';
import { useTripContext } from '../../context/TripContext';
import { generateWhyThis } from '../../engine/recommender';

const scoreLabel = (score) => {
  if (score >= 0.75) return { text: 'Perfect match',   color: 'bg-green-500' };
  if (score >= 0.5)  return { text: 'Great match',     color: 'bg-primary' };
  if (score >= 0.3)  return { text: 'Good match',      color: 'bg-amber-500' };
  return                    { text: 'Worth exploring', color: 'bg-gray-400' };
};

export const RecommendationCard = ({ scored, delay = 0 }) => {
  const { item, score, matchReasons } = scored;
  const { ctx, likeItem, saveItem, unsaveItem, skipItem, addToItinerary } = useTripContext();

  const isLiked   = ctx.likedIds.includes(item.id);
  const isSaved   = ctx.savedIds.includes(item.id);
  const inItinery = ctx.itinerary.some(i => i.id === item.id);
  const [showWhy, setShowWhy] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const whyText = generateWhyThis(item, ctx);
  const { text: matchText, color: matchColor } = scoreLabel(score);

  const handleAdd = () => {
    addToItinerary(item);
    saveItem(item.id);
    likeItem(item.id);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, delay }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow group"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Match badge */}
        <div className={`absolute top-3 left-3 ${matchColor} text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1`}>
          <Sparkles className="w-3 h-3" /> {matchText}
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex gap-2">
          <ActionButton
            onClick={() => isSaved ? unsaveItem(item.id) : saveItem(item.id)}
            active={isSaved} activeColor="text-amber-400"
            ariaLabel={isSaved ? 'Unsave' : 'Save'}
          >
            <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
          </ActionButton>
          <ActionButton
            onClick={() => likeItem(item.id)}
            active={isLiked} activeColor="text-red-400"
            ariaLabel="Like"
          >
            <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} />
          </ActionButton>
        </div>

        {/* Bottom category & price */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <span className="bg-black/40 backdrop-blur text-white text-xs font-semibold px-2 py-1 rounded-lg">
            {item.category}
          </span>
          {item.pricePP > 0 && (
            <span className="bg-black/40 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded-lg">
              ₹{item.pricePP.toLocaleString('en-IN')}/person
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-gray-900 text-base leading-snug">{item.name}</h3>
          <div className="flex items-center gap-1 shrink-0 text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-sm font-bold">{item.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Tags */}
        {matchReasons.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {matchReasons.slice(0, 3).map(tag => (
              <span key={tag} className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between gap-2 text-xs text-gray-400 mb-4">
          <span>⏱ {item.duration}</span>
          {item.bestTime && <span>🗓 {item.bestTime}</span>}
        </div>

        {/* Why This */}
        <div className="mb-3">
          <button
            onClick={() => setShowWhy(v => !v)}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline focus:outline-none"
            aria-expanded={showWhy}
          >
            <Info className="w-3.5 h-3.5" />
            Why we recommend this
          </button>
          <AnimatePresence>
            {showWhy && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2 bg-primary/5 border border-primary/10 rounded-xl p-3 text-xs text-gray-700 leading-relaxed">
                  <p className="font-semibold text-primary mb-1">Why we recommend this</p>
                  {whyText}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            disabled={inItinery}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition-all
              ${inItinery || justAdded
                ? 'bg-green-500 text-white'
                : 'bg-primary hover:bg-primary-dark text-white'
              }`}
            aria-label={inItinery ? 'Added to trip' : 'Add to trip'}
          >
            {inItinery || justAdded
              ? <><Check className="w-4 h-4" /> Added</>
              : <><Plus className="w-4 h-4" /> Add to Trip</>
            }
          </button>
          <button
            onClick={() => skipItem(item.id)}
            className="p-2.5 rounded-xl border border-gray-200 text-gray-400 hover:text-red-400 hover:border-red-200 transition-colors"
            aria-label={`Skip ${item.name}`}
          >
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

const ActionButton = ({ onClick, active, activeColor, ariaLabel, children }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className={`w-8 h-8 bg-black/30 backdrop-blur rounded-full flex items-center justify-center transition-colors
      ${active ? activeColor : 'text-white hover:text-white hover:bg-black/50'}`}
  >
    {children}
  </button>
);
