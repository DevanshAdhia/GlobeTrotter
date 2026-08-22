import React from 'react';
import Topbar from '../../components/layout/Topbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/common/Container';
import PackageCard from '../../components/package/PackageCard';
import { featuredPackages } from '../../data/packages';
import { Tag, Sparkles, Clock, Flame } from 'lucide-react';

const Deals = () => {
  const dealPackages = featuredPackages.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Topbar />

      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#001d42] via-[#002b5e] to-indigo-950 text-white py-16 relative">
        <Container className="text-center max-w-4xl mx-auto">
          <span className="text-amber-300 font-bold text-xs uppercase tracking-widest bg-amber-400/20 px-4 py-1.5 rounded-full border border-amber-300/30 mb-3 inline-flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-300" />
            Limited-Time Travel Offers
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Exclusive Travel Deals & Discounts
          </h1>
          <p className="text-base md:text-lg text-blue-100/90 max-w-2xl mx-auto">
            Save up to 30% on top domestic and international packages. Book early to lock in extra perks!
          </p>
        </Container>
      </section>

      {/* Coupon Banner */}
      <section className="-mt-8 relative z-20 max-w-5xl mx-auto px-4 w-full">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-amber-100">Special Promo Code</div>
              <div className="text-2xl font-extrabold tracking-tight">GLOBE2026 — Save ₹5,000 Extra</div>
            </div>
          </div>
          <button 
            onClick={() => navigator.clipboard.writeText('GLOBE2026')}
            className="bg-white text-orange-600 font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-amber-50 transition-colors shadow-md"
          >
            Copy Code
          </button>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="py-16">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Hot Trending Deals Right Now
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dealPackages.map(pkg => (
              <PackageCard key={pkg.id} packageData={pkg} />
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default Deals;
