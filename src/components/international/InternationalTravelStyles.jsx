import React from 'react';
import { Link } from 'react-router-dom';
import { Palmtree, Building2, Crown, Heart, Compass, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const styles = [
  { id: 'beach', title: 'Beach Escapes', desc: 'Relax beside crystal-clear waters.', icon: Palmtree, image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80' },
  { id: 'city', title: 'City Breaks', desc: 'Explore vibrant global metropolises.', icon: Building2, image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80' },
  { id: 'luxury', title: 'Luxury Holidays', desc: 'Premium experiences and stays.', icon: Crown, image: 'https://images.unsplash.com/photo-1542314831-c6a4d14d8373?w=600&q=80' },
  { id: 'honeymoon', title: 'Honeymoon', desc: 'Romantic getaways for couples.', icon: Heart, image: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=600&q=80' },
  { id: 'adventure', title: 'Adventure', desc: 'Thrilling global expeditions.', icon: Compass, image: 'https://images.unsplash.com/photo-1533587851505-d119e13bf0b5?w=600&q=80' },
  { id: 'family', title: 'Family Holidays', desc: 'Memorable trips for all ages.', icon: Users, image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=80' }
];

const InternationalTravelStyles = ({ onSelectStyle }) => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Your Kind of Escape</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {styles.map((style, i) => (
          <motion.button key={style.id} onClick={() => onSelectStyle(style.id)} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="group relative h-48 rounded-2xl overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            <img src={style.image} alt={style.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-300 group-hover:opacity-90"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white group-hover:bg-primary transition-colors">
                  <style.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">{style.title}</h3>
              </div>
              <p className="text-white/80 text-sm mb-3">{style.desc}</p>
              <span className="flex items-center text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                Explore <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
export default InternationalTravelStyles;