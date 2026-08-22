import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  MapPin, ShieldCheck, Headset, Lock, Award, DollarSign, 
  HeadphonesIcon, Shield, Globe, ChevronDown, ArrowRight, Send,
  Plane, Phone, Mail, Map
} from 'lucide-react';

const Facebook = ({ className }) => <svg xmlns="http://www.3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const Instagram = ({ className }) => <svg xmlns="http://www.3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const Twitter = ({ className }) => <svg xmlns="http://www.3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
const Youtube = ({ className }) => <svg xmlns="http://www.3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;

const AnimatedCounter = ({ end, duration = 2.5, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        // easeOutQuart curve
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOut * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

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
      transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <footer className="w-full font-sans overflow-hidden mt-16 relative">
      {/* 1. Stats Counters (Full Width, White Background) */}
      <div className="w-full bg-white relative z-20 shadow-sm border-t border-gray-100 py-12 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10"
          >
            {[
              { end: 500, suffix: '+', title: 'Destinations', desc: 'Worldwide Coverage' },
              { end: 15000, suffix: '+', title: 'Happy Travelers', desc: 'Memories Created' },
              { end: 25, suffix: '', title: 'Years Experience', desc: 'Trusted by Thousands' },
              { end: 100, suffix: '%', title: 'Secure Booking', desc: 'Safe & Protected' }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left group border-r border-transparent md:border-gray-200 last:border-0 pr-0 md:pr-4">
                <div className="text-3xl md:text-5xl font-extrabold !text-[#020b18] mb-2 flex items-baseline gap-1 group-hover:text-amber-500 transition-colors duration-300">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <h5 className="!text-[#020b18] font-bold text-sm mb-1 uppercase tracking-wider">{stat.title}</h5>
                <p className="text-xs !text-gray-500 font-medium">{stat.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Dark Footer */}
      <div className="bg-[#020b18] text-gray-300 pt-20 pb-8 relative border-t-4 border-amber-400">
        
        {/* Subtle Background Art */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none rounded-full blur-[100px] bg-blue-500"></div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          
          {/* 2. Main 4-Column Layout */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10"
          >
            {/* Column 1: Brand */}
            <motion.div variants={itemVariants} className="lg:col-span-4 pr-0 lg:pr-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                  <span className="text-[#020b18] font-black text-2xl tracking-tighter">IT</span>
                </div>
                <div className="flex flex-col">
                  <span className="!text-white font-black text-2xl tracking-tight leading-none mb-1">Infinity</span>
                  <span className="text-amber-400 text-xs font-bold tracking-[0.25em] uppercase">Travel</span>
                </div>
              </div>
              
              <p className="text-sm !text-gray-400 mb-8 leading-relaxed font-medium">
                From breathtaking destinations to unforgettable experiences, we make every journey extraordinary.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-amber-400 transition-colors cursor-pointer">
                  <Phone className="w-5 h-5 text-amber-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-amber-400 transition-colors cursor-pointer">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>info@infinitytravel.com</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-400 hover:text-amber-400 transition-colors cursor-pointer">
                  <Map className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>123 Travel Boulevard, Premium Business District, Mumbai, 400001</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {[Facebook, Instagram, Twitter, Youtube].map((SocialIcon, idx) => (
                  <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#020b18] hover:bg-amber-400 hover:border-amber-400 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_0_15px_rgba(251,191,36,0.4)] transition-all duration-300">
                    <SocialIcon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Column 2: Explore */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <h4 className="font-extrabold !text-white text-lg mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> Explore
              </h4>
              <ul className="space-y-3 list-none">
                {[
                  { name: 'Domestic Tours', path: '/domestic-destinations' },
                  { name: 'International Tours', path: '/international-destinations' },
                  { name: 'Weekend Getaways', path: '/weekend-gateways' },
                  { name: 'Honeymoon Packages', path: '/packages?category=honeymoon' },
                  { name: 'Family Holidays', path: '/packages?category=family' },
                  { name: 'Group Tours', path: '/packages?category=group' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-gray-400 hover:text-white transition-colors flex items-center group text-sm font-medium">
                      <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-amber-400" />
                      <span className="relative overflow-hidden">
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Popular Destinations */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <h4 className="font-extrabold !text-white text-lg mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> Destinations
              </h4>
              <ul className="space-y-3 list-none">
                {[
                  { name: 'Kashmir', path: '/destinations/kashmir' },
                  { name: 'Dubai', path: '/destinations/dubai' },
                  { name: 'Kerala', path: '/destinations/kerala' },
                  { name: 'Goa', path: '/destinations/goa' },
                  { name: 'Europe', path: '/destinations/europe' },
                  { name: 'Thailand', path: '/destinations/thailand' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-gray-400 hover:text-white transition-colors flex items-center group text-sm font-medium">
                      <MapPin className="w-3.5 h-3.5 mr-2 text-white/20 group-hover:text-amber-400 transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 4: Newsletter */}
            <motion.div variants={itemVariants} className="lg:col-span-4 lg:pl-4">
              <div className="relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 blur-[50px] rounded-full group-hover:bg-amber-400/20 transition-colors duration-500 pointer-events-none"></div>
                <h4 className="font-extrabold !text-white text-xl mb-4 relative z-10">Get Travel Updates</h4>
                <p className="text-sm !text-gray-400 mb-6 leading-relaxed relative z-10 font-medium">
                  Be the first to receive exclusive deals, travel inspiration, and special offers.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col xl:flex-row gap-3 relative z-10">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address" 
                    className="w-full flex-1 bg-[#03132b] text-white px-4 py-3.5 rounded-xl text-sm border border-white/10 focus:outline-none focus:border-amber-400 transition-all placeholder:text-gray-600"
                    required
                  />
                  <button 
                    type="submit" 
                    aria-label="Subscribe to newsletter"
                    className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-[#020b18] rounded-xl flex items-center justify-center font-bold text-sm transition-colors shadow-lg whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </motion.div>
            
          </motion.div>

          {/* (Stats & Counters have been moved to overlap at the top) */}

          {/* 4. Trust & Benefits Strip */}
          <div className="py-10 border-b border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Award, title: 'Best Value', desc: 'For Every Journey' },
                { icon: DollarSign, title: 'Easy Booking', desc: 'Quick & Hassle-Free' },
                { icon: HeadphonesIcon, title: '24/7 Expert Support', desc: 'Always Here to Help' },
                { icon: Shield, title: 'Secure Payments', desc: '100% Safe & Protected' }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-4 group justify-center sm:justify-start">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-amber-400 group-hover:bg-amber-400 group-hover:text-[#020b18] group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h5 className="!text-white font-extrabold text-sm mb-0.5">{item.title}</h5>
                      <p className="text-xs !text-gray-400 font-medium">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Absolute Bottom Strip */}
          <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            <p className="text-gray-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} Infinity Travel. All Rights Reserved.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-medium">
              <Link to="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-amber-400 transition-colors">Terms & Conditions</Link>
              <Link to="/sitemap" className="hover:text-amber-400 transition-colors">Sitemap</Link>
              
              <div className="relative ml-2">
                <button className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg px-3 py-1.5 text-white text-xs transition-colors">
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
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