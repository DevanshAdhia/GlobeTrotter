import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, ShieldCheck, Headphones, Star, Lock, Sparkles } from 'lucide-react';
import Container from './Container';

const features = [
  { 
    title: 'Expert Travel Planners', 
    desc: 'Personalized itineraries crafted by travel experts for your exact preferences.', 
    icon: UserCheck 
  },
  { 
    title: 'Best Price Guarantee', 
    desc: 'Get the lowest rates and best deals with our price match promise.', 
    icon: ShieldCheck 
  },
  { 
    title: '24x7 Customer Support', 
    desc: "Dedicated travel support team always available to assist you anytime.", 
    icon: Headphones 
  },
  { 
    title: 'Handpicked Experiences', 
    desc: 'Carefully curated hotels, activities, and tours for maximum comfort.', 
    icon: Star 
  },
  { 
    title: 'Secure Bookings', 
    desc: '100% encrypted payments and complete data privacy protection.', 
    icon: Lock 
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50/70 via-white to-gray-50/40 border-t border-gray-100">
      <Container>
        <div className="bg-gradient-to-br from-blue-900/5 via-[#0047b3]/5 to-indigo-900/5 rounded-3xl p-8 md:p-12 lg:p-14 border border-blue-100/70 shadow-xs relative overflow-hidden">
          
          {/* Subtle decorative background circles */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-accent/10 blur-2xl pointer-events-none" />

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
            <span className="inline-flex items-center space-x-1.5 bg-blue-100/60 text-primary font-extrabold text-[11px] uppercase tracking-widest px-4 py-1.5 rounded-full border border-blue-200/60 mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>WHY AJAY MODI TRAVELS</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Why Choose Ajay Modi Travels?
            </h2>
            <p className="text-sm text-gray-500 font-medium mt-2">
              Delivering unforgettable journeys, uncompromised quality, and 100% customer trust.
            </p>
          </div>

          {/* 5-Column Responsive Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative z-10">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_32px_rgba(0,71,179,0.12)] hover:border-primary/30 transition-all duration-300 border border-gray-100 group h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs group-hover:scale-105 shrink-0">
                    <Icon className="w-7 h-7 stroke-[2]" />
                  </div>
                  
                  <h3 className="text-base font-extrabold text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-xs text-gray-500 leading-relaxed font-medium mt-auto">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;