import React from 'react';
import Topbar from '../../components/layout/Topbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/common/Container';
import { motion } from 'framer-motion';
import { Award, Users, MapPin, ShieldCheck, Heart, Sparkles, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Topbar />
      
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#001d42] via-[#002b5e] to-indigo-950 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent" />
        <Container className="relative z-10 text-center max-w-4xl mx-auto">
          <span className="text-amber-300 font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full border border-white/20 mb-4 inline-block">
            About Ajay Modi Travels & GlobeTrotter
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Crafting Unforgettable Journeys Since 2009
          </h1>
          <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
            With over 15+ years of travel excellence, 45+ branch locations, and 50,000+ happy adventurers, we turn your travel dreams into lifelong memories.
          </p>
        </Container>
      </section>

      {/* Stats Counter Row */}
      <section className="-mt-10 relative z-20 max-w-5xl mx-auto px-4 w-full">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-[#002b5e] mb-1">15+</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-[#002b5e] mb-1">50K+</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Happy Travelers</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-[#002b5e] mb-1">45+</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Branch Offices</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-[#002b5e] mb-1">500+</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Destinations</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <span className="text-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 mb-4 inline-block">
                Our Mission & Story
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                Empowering Travelers to Dream, Design, and Discover
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded with a passion for world exploration, Ajay Modi Travels has evolved from a local agency into an industry leader offering personalized domestic and international tours.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Through GlobeTrotter, our intelligent travel planning platform, we enable travelers to customize multi-city itineraries, estimate budgets transparently, and discover authentic local experiences.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" alt="Beach" className="rounded-3xl shadow-md h-56 w-full object-cover" />
              <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80" alt="Mountains" className="rounded-3xl shadow-md h-56 w-full object-cover mt-6" />
            </div>
          </div>

          {/* Core Values */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Our Core Commitments</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">We believe in transparent pricing, uncompromised quality, and round-the-clock support for every traveler.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Price Match Guarantee</h3>
              <p className="text-gray-500 text-sm leading-relaxed">We negotiate directly with top resorts and airlines to guarantee you the best rates with zero hidden fees.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tailored Experience Design</h3>
              <p className="text-gray-500 text-sm leading-relaxed">From honeymoon specials to luxury retreats and family holidays, every detail is custom tailored for you.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Global On-Trip Support</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Our travel coordinators are active around the clock to assist you before, during, and after your trip.</p>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default About;
