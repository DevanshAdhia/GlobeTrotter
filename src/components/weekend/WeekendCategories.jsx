import React from 'react';
import { Palmtree, Mountain, Car, Heart, Users, Compass, Landmark, Leaf, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { id: 'beach', title: 'Beach Escape', desc: 'Sunny shores and ocean breeze.', icon: Palmtree, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80' },
  { id: 'mountain', title: 'Mountain Retreat', desc: 'Cool air and peaceful escapes.', icon: Mountain, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80' },
  { id: 'road-trip', title: 'Road Trip', desc: 'Scenic drives and short stops.', icon: Car, image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80' },
  { id: 'romantic', title: 'Romantic Getaway', desc: 'Perfect spots for couples.', icon: Heart, image: 'https://images.unsplash.com/photo-1518091461937-234b3f81e3ac?w=400&q=80' },
  { id: 'family', title: 'Family Break', desc: 'Fun trips for all ages.', icon: Users, image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&q=80' },
  { id: 'heritage', title: 'Heritage', desc: 'Step back in time.', icon: Landmark, image: 'https://images.unsplash.com/photo-1587630737966-70eebbbbb8db?w=400&q=80' },
  { id: 'nature', title: 'Nature', desc: 'Reconnect with the outdoors.', icon: Leaf, image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80' },
  { id: 'adventure', title: 'Adventure', desc: 'Thrills close to home.', icon: Compass, image: 'https://images.unsplash.com/photo-1533587851505-d119e13bf0b5?w=400&q=80' }
];

const WeekendCategories = ({ onSelectCategory }) => {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Weekend Mood</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {categories.map((cat, i) => (
          <motion.button key={cat.id} onClick={() => onSelectCategory(cat.title)} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="group relative rounded-2xl overflow-hidden aspect-[4/5] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            <img src={cat.image} alt={cat.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300"></div>
            <div className="absolute inset-0 p-4 lg:p-5 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-2 text-white">
                <cat.icon className="w-5 h-5" />
                <h3 className="font-bold text-lg leading-tight">{cat.title}</h3>
              </div>
              <p className="text-white/80 text-xs md:text-sm mb-3 line-clamp-2">{cat.desc}</p>
              <span className="flex items-center text-xs md:text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                Explore <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
};
export default WeekendCategories;