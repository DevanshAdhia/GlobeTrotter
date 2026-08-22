import React from 'react';
import Container from './Container';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Plane, Building2, Palmtree, Users, Heart, Map } from 'lucide-react';

const categories = [
  { 
    id: 'c1', 
    title: 'Domestic Trips', 
    desc: 'Explore incredible destinations across India.', 
    icon: Building2, 
    link: '/domestic-destinations',
    badge: 'Popular',
    accent: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 'c2', 
    title: 'International Holidays', 
    desc: 'Discover unforgettable global experiences.', 
    icon: Plane, 
    link: '/international-destinations',
    badge: 'Trending',
    accent: 'from-indigo-500 to-purple-500'
  },
  { 
    id: 'c3', 
    title: 'Weekend Getaways', 
    desc: 'Short trips, big memories near you.', 
    icon: Map, 
    link: '/weekend-gateways',
    badge: 'Quick Escape',
    accent: 'from-emerald-500 to-teal-500'
  },
  { 
    id: 'c4', 
    title: 'Family Holidays', 
    desc: 'Perfectly planned for all ages.', 
    icon: Users, 
    link: '/domestic-destinations',
    badge: 'Best Value',
    accent: 'from-amber-500 to-orange-500'
  },
  { 
    id: 'c5', 
    title: 'Honeymoon', 
    desc: 'Romantic escapes for couples.', 
    icon: Heart, 
    link: '/international-destinations',
    badge: 'Romantic',
    accent: 'from-rose-500 to-pink-500'
  },
  { 
    id: 'c6', 
    title: 'Beach Holidays', 
    desc: 'Relaxing stays on pristine shores.', 
    icon: Palmtree, 
    link: '/domestic-destinations',
    badge: 'Relaxing',
    accent: 'from-sky-500 to-blue-600'
  }
];

const TravelCategories = () => {
  return (
    <section className="pt-10 pb-16 bg-gradient-to-b from-gray-50/60 via-white to-gray-50/40">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="h-full"
              >
                <Link 
                  to={cat.link} 
                  className="group relative flex flex-col justify-between p-6 sm:p-7 bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_35px_rgba(0,71,179,0.1)] hover:border-primary/30 transition-all duration-300 hover:-translate-y-1.5 no-underline h-full"
                >
                  {/* Top Accent Line */}
                  <div className={`absolute top-0 left-6 right-6 h-1 rounded-b-full bg-gradient-to-r ${cat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div>
                    {/* Top Row: Icon & Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/60 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>

                      <span className="text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {cat.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors leading-snug">
                      {cat.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  {/* Bottom Link CTA */}
                  <div className="flex items-center text-primary font-bold text-sm group-hover:text-primary-dark pt-4 border-t border-gray-100 mt-auto leading-normal">
                    <span>Explore Packages</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default TravelCategories;