import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, ShieldCheck, Headphones, Star, Lock } from 'lucide-react';

const features = [
  { title: 'Expert Travel Planners', desc: 'Personalized itineraries crafted by experts', icon: UserCheck },
  { title: 'Best Price Guarantee', desc: 'Get the best deals with our promise', icon: ShieldCheck },
  { title: '24x7 Customer Support', desc: "We're always here to assist you", icon: Headphones },
  { title: 'Handpicked Experiences', desc: 'Carefully selected for your comfort', icon: Star },
  { title: 'Secure Bookings', desc: '100% secure payments and data protection', icon: Lock }
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="bg-[#f0f7ff] rounded-3xl p-10 lg:p-14 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#002b5e] mb-12">Why Choose Ajay Modi Travels?</h2>
        
        <div className="flex flex-wrap justify-center items-start gap-8 lg:gap-12">
          {features.map((feature, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center max-w-[160px]">
              <div className="text-[#002b5e] mb-4">
                <feature.icon className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="text-[13px] font-bold text-[#002b5e] leading-tight mb-2">{feature.title}</h3>
              <p className="text-[11px] text-gray-500 leading-snug">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default WhyChooseUs;