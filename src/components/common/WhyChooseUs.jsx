import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, ShieldCheck, Headphones, Star, Lock } from 'lucide-react';
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
    <section className="py-20 bg-gray-50/50">
      <Container>
        <div className="bg-gradient-to-br from-blue-900/5 via-[#002b5e]/5 to-indigo-900/5 rounded-3xl p-8 md:p-12 lg:p-16 border border-blue-100/80 shadow-sm">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-3 inline-block">
              Why GlobeTrotter
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5e] tracking-tight">
              Why Choose Ajay Modi Travels?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#002b5e] flex items-center justify-center mb-5 group-hover:bg-[#002b5e] group-hover:text-white transition-all duration-300 shadow-sm group-hover:scale-110">
                    <Icon className="w-7 h-7 stroke-[1.75]" />
                  </div>
                  
                  <h3 className="text-base font-bold text-[#002b5e] mb-2 leading-snug">
                    {feature.title}
                  </h3>
                  
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
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