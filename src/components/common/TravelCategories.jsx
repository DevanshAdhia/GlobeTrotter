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
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop'
  },
  { 
    id: 'c2', 
    title: 'International Holidays', 
    desc: 'Discover unforgettable global experiences.', 
    icon: Plane, 
    link: '/international-destinations',
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop'
  },
  { 
    id: 'c3', 
    title: 'Weekend Getaways', 
    desc: 'Short trips, big memories near you.', 
    icon: Map, 
    link: '/weekend-gateways',
    badge: 'Quick Escape',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop'
  },
  { 
    id: 'c4', 
    title: 'Family Holidays', 
    desc: 'Perfectly planned for all ages.', 
    icon: Users, 
    link: '/domestic-destinations',
    badge: 'Best Value',
    image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1974&auto=format&fit=crop'
  },
  { 
    id: 'c5', 
    title: 'Honeymoon', 
    desc: 'Romantic escapes for couples.', 
    icon: Heart, 
    link: '/international-destinations',
    badge: 'Romantic',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: 'c6', 
    title: 'Beach Holidays', 
    desc: 'Relaxing stays on pristine shores.', 
    icon: Palmtree, 
    link: '/domestic-destinations',
    badge: 'Relaxing',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop'
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
                className="h-[320px]"
              >
                <Link 
                  to={cat.link} 
                  className="group relative block w-full h-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer no-underline"
                >
                  {/* Background Image */}
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001d42] via-[#003380]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Badge */}
                  <div className="absolute top-5 left-5 z-10">
                    <span className="text-[10px] font-extrabold tracking-wider uppercase px-4 py-1.5 rounded-full bg-white/95 text-[#003380] shadow-sm backdrop-blur-sm">
                      {cat.badge}
                    </span>
                  </div>

                  {/* Icon floating */}
                  <div className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content Container (Bottom) */}
                  <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end h-full text-white">
                    <h3 className="text-2xl font-bold mb-1 transform transition-transform duration-300 group-hover:-translate-y-2 text-white">
                      {cat.title}
                    </h3>
                    <p className="text-white/80 text-sm mb-0 leading-relaxed max-h-0 opacity-0 group-hover:opacity-100 group-hover:max-h-20 group-hover:mb-4 transition-all duration-500 ease-in-out overflow-hidden">
                      {cat.desc}
                    </p>
                    <div className="flex items-center text-accent font-bold text-sm transform transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                      <span>Explore Packages</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                    </div>
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