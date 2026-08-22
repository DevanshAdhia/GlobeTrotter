/**
 * components/ai/PreferenceCollector.jsx
 * Multi-step preference wizard shown before recommendations.
 * Collects: group type, travel style, interests, budget, duration.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import { INTEREST_TAGS, TRAVEL_STYLES, GROUP_TYPES, BUDGET_BANDS } from '../../data/ai/catalogue';

const STEPS = [
  { id: 'group',  title: "Who's travelling?", subtitle: 'This helps us match activities and places to your group.' },
  { id: 'style',  title: 'Your travel vibe?', subtitle: 'How do you like to explore new places?' },
  { id: 'interests', title: 'What excites you?', subtitle: 'Pick everything that applies — the more the better!' },
  { id: 'budget', title: 'Budget per person?', subtitle: 'Per person, excluding flights.' },
];

const Chip = ({ label, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
      ${selected
        ? 'bg-primary text-white border-primary shadow-md scale-105'
        : 'bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary'}`}
  >
    {label}
  </button>
);

export const PreferenceCollector = ({ destinationName, onComplete }) => {
  const [step, setStep] = useState(0);
  const [prefs, setPrefs] = useState({
    group: '', travelStyle: '', interests: [], budget: 30000, budgetBand: 'mid',
  });

  const current = STEPS[step];
  const isLast  = step === STEPS.length - 1;

  const canNext = () => {
    if (current.id === 'group')     return !!prefs.group;
    if (current.id === 'style')     return !!prefs.travelStyle;
    if (current.id === 'interests') return prefs.interests.length > 0;
    if (current.id === 'budget')    return true;
    return true;
  };

  const toggleInterest = (tag) => {
    setPrefs(p => ({
      ...p,
      interests: p.interests.includes(tag)
        ? p.interests.filter(i => i !== tag)
        : [...p.interests, tag],
    }));
  };

  const handleNext = () => {
    if (isLast) {
      onComplete({ ...prefs, budgetPP: prefs.budget });
    } else {
      setStep(s => s + 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
          <Sparkles className="w-4 h-4" /> AI Trip Planner
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Let's personalise your {destinationName} trip
        </h1>
        <p className="text-gray-500">A few quick questions to find the perfect places for you.</p>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s.id}
            className={`h-1.5 rounded-full flex-1 transition-all ${i <= step ? 'bg-primary' : 'bg-gray-200'}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-1">{current.title}</h2>
          <p className="text-sm text-gray-500 mb-6">{current.subtitle}</p>

          {current.id === 'group' && (
            <div className="flex flex-wrap gap-3">
              {GROUP_TYPES.map(g => (
                <Chip key={g} label={g} selected={prefs.group === g}
                  onClick={() => setPrefs(p => ({ ...p, group: g }))} />
              ))}
            </div>
          )}

          {current.id === 'style' && (
            <div className="flex flex-wrap gap-3">
              {TRAVEL_STYLES.map(s => (
                <Chip key={s} label={s} selected={prefs.travelStyle === s}
                  onClick={() => setPrefs(p => ({ ...p, travelStyle: s }))} />
              ))}
            </div>
          )}

          {current.id === 'interests' && (
            <div className="flex flex-wrap gap-2">
              {INTEREST_TAGS.map(tag => (
                <Chip key={tag} label={tag} selected={prefs.interests.includes(tag)}
                  onClick={() => toggleInterest(tag)} />
              ))}
              <p className="w-full text-xs text-gray-400 mt-2">
                {prefs.interests.length} selected
              </p>
            </div>
          )}

          {current.id === 'budget' && (
            <div className="space-y-3">
              {BUDGET_BANDS.map(b => (
                <button key={b.id}
                  type="button"
                  onClick={() => setPrefs(p => ({ ...p, budgetBand: b.id, budget: b.max === Infinity ? 100000 : b.max }))}
                  aria-pressed={prefs.budgetBand === b.id}
                  className={`w-full flex justify-between items-center px-5 py-4 rounded-2xl border transition-all text-left
                    ${prefs.budgetBand === b.id
                      ? 'bg-primary/5 border-primary text-primary font-bold shadow-sm'
                      : 'border-gray-200 text-gray-700 hover:border-primary/40'}`}
                >
                  <span className="font-semibold">{b.label}</span>
                  {prefs.budgetBand === b.id && (
                    <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <svg viewBox="0 0 12 12" className="w-3 h-3 fill-white"><path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between items-center mt-6">
        {step > 0 ? (
          <button onClick={() => setStep(s => s - 1)}
            className="text-gray-500 font-semibold hover:text-gray-700 text-sm">
            ← Back
          </button>
        ) : <div />}

        <button
          onClick={handleNext}
          disabled={!canNext()}
          className={`flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white transition-all
            ${canNext()
              ? 'bg-primary hover:bg-primary-dark shadow-sm'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          {isLast ? <><Sparkles className="w-4 h-4" /> Build My Trip</> : <>Next <ChevronRight className="w-4 h-4" /></>}
        </button>
      </div>
    </div>
  );
};
