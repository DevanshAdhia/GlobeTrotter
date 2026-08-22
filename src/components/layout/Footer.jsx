import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  MapPin, ShieldCheck, Headset, Lock, Award, DollarSign, 
  HeadphonesIcon, Shield, Globe, ChevronDown, ArrowRight, Send
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter a valid email address.');
      return;
    }
    toast.success('Successfully subscribed to newsletter!');
    setEmail('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <footer className="w-full font-sans overflow-visible mt-20">
      {/* Top Trust Badge Strip (Overlapping Design) */}
      <div className="relative -mb-16 z-20 max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: MapPin, title: '500+', desc: 'Destinations Worldwide' },
            { icon: ShieldCheck, title: 'Best Price', desc: 'Guaranteed Best Rates' },
            { icon: Headset, title: '24/7 Support', desc: 'Always Here For You' },
            { icon: Lock, title: 'Secure Booking', desc: '100% Encrypted & Safe' }
          ].map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div key={idx} variants={itemVariants} className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" strokeWidth={1.75} />
                </div>
                <h4 className="font-extrabold text-gray-900 text-lg mb-1">{badge.title}</h4>
                <p className="text-sm text-gray-500 font-medium">{badge.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Main Dark Footer */}
      <div className="bg-gradient-to-b from-[#001d42] to-[#0b1120] text-gray-300 pt-32 pb-8 relative">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-amber-500/10 blur-[100px]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10"
          >
            {/* Column 1: Brand Info */}
            <motion.div variants={itemVariants} className="lg:col-span-4 pr-0 lg:pr-8">
              <div className="flex items-center gap-3 mb-6 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                  <span className="text-primary font-black text-2xl tracking-tighter">AM</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-black text-2xl tracking-tight leading-none mb-1 group-hover:text-amber-400 transition-colors">Ajay Modi</span>
                  <span className="text-blue-200 text-xs font-bold tracking-[0.25em] uppercase">Travels</span>
                </div>
              </div>
              
              <p className="text-sm text-blue-100/70 mb-8 leading-relaxed">
                Experience the world with Ajay Modi Travels. With over decades of expertise, we curate unforgettable holidays and premium travel packages for you.
              </p>
              
              <div className="flex items-center gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-200 hover:text-white hover:bg-primary hover:border-primary hover:-translate-y-1 hover:shadow-lg shadow-primary/30 transition-all duration-300">
                  <svg xmlns="http://www.3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-200 hover:text-white hover:bg-primary hover:border-primary hover:-translate-y-1 hover:shadow-lg shadow-primary/30 transition-all duration-300">
                  <svg xmlns="http://www.3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-200 hover:text-white hover:bg-primary hover:border-primary hover:-translate-y-1 hover:shadow-lg shadow-primary/30 transition-all duration-300">
                  <svg xmlns="http://www.3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-200 hover:text-white hover:bg-primary hover:border-primary hover:-translate-y-1 hover:shadow-lg shadow-primary/30 transition-all duration-300">
                  <svg xmlns="http://www.3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
              </div>
            </motion.div>

            {/* Column 2: Explore */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <h4 className="font-extrabold text-white text-lg mb-6 relative inline-block">
                Explore
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-amber-400 rounded-full"></span>
              </h4>
              <ul className="space-y-3.5 text-sm font-medium !p-0 !m-0 list-none">
                {['Domestic Trips', 'International Tours', 'Weekend Gateways', 'Family Packages', 'Honeymoon Specials'].map((link) => (
                  <li key={link} className="!p-0 !m-0">
                    <Link to="#" className="text-blue-100/70 hover:text-amber-400 transition-colors flex items-center group">
                      <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-amber-400" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Plan Your Trip */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <h4 className="font-extrabold text-white text-lg mb-6 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-amber-400 rounded-full"></span>
              </h4>
              <ul className="space-y-3.5 text-sm font-medium !p-0 !m-0 list-none">
                {['All Packages', 'Exclusive Deals', 'Popular Cities', 'Custom Itinerary', 'Travel Insurance'].map((link) => (
                  <li key={link} className="!p-0 !m-0">
                    <Link to="#" className="text-blue-100/70 hover:text-amber-400 transition-colors flex items-center group">
                      <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-amber-400" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 4: Newsletter */}
            <motion.div variants={itemVariants} className="lg:col-span-4 lg:pl-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full"></div>
                <h4 className="font-extrabold text-white text-xl mb-3 relative z-10">Get Travel Updates!</h4>
                <p className="text-sm text-blue-100/70 mb-6 leading-relaxed relative z-10">
                  Subscribe to our newsletter for exclusive deals, travel tips, and holiday inspiration.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3 relative z-10">
                  <div className="relative">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address" 
                      className="w-full bg-[#001d42] text-white pl-4 pr-12 py-3.5 rounded-xl text-sm border border-white/10 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-blue-200/40"
                      required
                    />
                    <button 
                      type="submit" 
                      aria-label="Subscribe to newsletter"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-primary hover:bg-amber-400 text-white hover:text-[#001d42] rounded-lg flex items-center justify-center transition-colors shadow-md shadow-primary/20"
                    >
                      <Send className="w-4 h-4 ml-0.5" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
            
          </motion.div>

          {/* Secondary Trust Features */}
          <div className="py-10 border-b border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Award, title: 'Best Price', desc: 'Guaranteed' },
                { icon: DollarSign, title: 'Easy Booking', desc: 'Instant Confirmation' },
                { icon: HeadphonesIcon, title: '24/7 Support', desc: 'Expert Assistance' },
                { icon: Shield, title: '100% Secure', desc: 'Protected Payments' }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-amber-400 group-hover:bg-amber-400 group-hover:text-[#001d42] transition-colors duration-300">
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <div>
                      <h5 className="text-white font-extrabold text-sm mb-1">{item.title}</h5>
                      <p className="text-xs text-blue-200/50 font-medium">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Absolute Bottom Strip */}
          <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            <p className="text-xs text-blue-100/50 font-medium text-center lg:text-left">
              © {new Date().getFullYear()} Ajay Modi Travels. All rights reserved.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-blue-100/60 font-medium">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
              
              <div className="relative ml-2">
                <button className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg px-3 py-1.5 text-white text-xs transition-colors">
                  <Globe className="w-3.5 h-3.5" />
                  <span>English (IN)</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;