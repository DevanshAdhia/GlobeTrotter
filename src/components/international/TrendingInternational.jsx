import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import ImageSlider from '../common/ImageSlider';

const TrendingInternational = ({ destinations }) => {
  if (!destinations || destinations.length < 3) return null;
  const mainDest = destinations[0];
  const sideDests = destinations.slice(1, 3);

  return (
    <div className="mb-16">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Trending Around the World</h2>
        <p className="text-gray-500 mt-1">Explore destinations travellers are loving right now.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Card */}
        <Link to={`/discover/${mainDest.slug}`} className="lg:col-span-2 group relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto min-h-[400px] block shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          <ImageSlider images={mainDest.image} alt={mainDest.name} className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 p-8 w-full text-white pointer-events-none">
            <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4 shadow-sm">Top Choice</span>
            <h3 className="text-3xl lg:text-4xl font-bold mb-2 drop-shadow-md">{mainDest.name}</h3>
            <p className="text-white/90 text-lg mb-4 line-clamp-2 max-w-xl drop-shadow-sm">{mainDest.shortDescription}</p>
            <span className="inline-flex items-center font-bold border-b-2 border-primary pb-1 text-primary group-hover:text-primary-light transition-colors drop-shadow-sm">
              <Sparkles className="w-4 h-4 mr-1.5" /> Plan with AI <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
        {/* Small Cards */}
        <div className="flex flex-col gap-6">
          {sideDests.map((dest) => (
            <Link key={dest.id} to={`/discover/${dest.slug}`} className="group relative rounded-3xl overflow-hidden flex-1 aspect-[4/3] lg:aspect-auto block shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              <ImageSlider images={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full text-white pointer-events-none">
                <span className="text-sm font-semibold text-primary mb-1 block uppercase tracking-wider drop-shadow-sm">{dest.country}</span>
                <h3 className="text-2xl font-bold mb-1 drop-shadow-md">{dest.name}</h3>
                <span className="inline-flex items-center text-sm font-bold text-primary group-hover:text-primary-light transition-colors mt-1 drop-shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 mr-1" /> AI Plan
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TrendingInternational;