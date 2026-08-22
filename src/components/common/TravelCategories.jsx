import React from 'react';
import Container from './Container';
import { Link } from 'react-router-dom';
import { ArrowRight, Plane, Building2, Palmtree, Users, Heart, Map } from 'lucide-react';

const categories = [
  { id: 'c1', title: 'Domestic Trips', desc: 'Explore incredible destinations across India.', icon: Building2, link: '/destinations?type=domestic' },
  { id: 'c2', title: 'International Holidays', desc: 'Discover unforgettable global experiences.', icon: Plane, link: '/destinations?type=international' },
  { id: 'c3', title: 'Weekend Getaways', desc: 'Short trips, big memories near you.', icon: Map, link: '/destinations?type=weekend' },
  { id: 'c4', title: 'Family Holidays', desc: 'Perfectly planned for all ages.', icon: Users, link: '/packages?style=family' },
  { id: 'c5', title: 'Honeymoon', desc: 'Romantic escapes for couples.', icon: Heart, link: '/packages?style=honeymoon' },
  { id: 'c6', title: 'Beach Holidays', desc: 'Relaxing stays on pristine shores.', icon: Palmtree, link: '/packages?style=beach' }
];

const TravelCategories = () => {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => (
            <Link key={cat.id} to={cat.link} className="group flex items-start p-6 bg-white rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <cat.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{cat.title}</h3>
                <p className="text-gray-500 text-sm mb-3">{cat.desc}</p>
                <span className="text-primary text-sm font-semibold flex items-center group-hover:text-primary-dark transition-colors">
                  Explore <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
export default TravelCategories;