import React, { useState } from 'react';
import Container from './Container';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2 } from 'lucide-react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('default');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email) return;
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section className="py-12 bg-white px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="bg-[#002b5e] rounded-xl p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
        
        {/* Airplane Decorative Icon */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 hidden lg:block pointer-events-none">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{transform: 'rotate(-45deg)'}}>
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l6 5-4 4-3-1-1 1 3 4 4 3 1-1-1-3 4-4 5 6 1.2-.7c.4-.2.7-.6.6-1.1z"/>
          </svg>
        </div>

        <div className="flex items-center gap-6 z-10 w-full lg:w-auto">
          <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center shrink-0">
            <Mail className="w-7 h-7 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
              Get Exclusive Travel Deals
            </h2>
            <p className="text-sm text-white/80 max-w-sm leading-snug">
              Subscribe to our newsletter and get the best offers and travel inspiration straight to your inbox.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-[400px] z-10 shrink-0">
          {status === 'success' ? (
            <div className="bg-white/10 p-4 rounded-md border border-white/20 flex items-center text-white font-medium">
              <CheckCircle2 className="w-5 h-5 mr-3" />
              You're subscribed!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative w-full flex">
              <input type="email" placeholder="Enter your email address" required value={email} onChange={e => setEmail(e.target.value)} disabled={status === 'loading'} className="flex-1 bg-white px-5 py-3.5 outline-none text-gray-900 rounded-l-md text-sm placeholder-gray-400" />
              <button type="submit" disabled={status === 'loading'} className="bg-[#1a66ff] hover:bg-blue-600 text-white px-6 py-3.5 rounded-r-md font-bold text-sm transition-colors disabled:opacity-70">
                {status === 'loading' ? '...' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
export default NewsletterSection;