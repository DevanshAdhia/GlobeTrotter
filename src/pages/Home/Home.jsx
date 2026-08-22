import React from 'react';
import { motion } from 'framer-motion';
import Topbar from '../../components/layout/Topbar';
import HeroSection from '../../components/common/HeroSection';
import TravelSearch from '../../components/search/TravelSearch';
import TravelCategories from '../../components/common/TravelCategories';
import PopularDestinations from '../../components/destination/PopularDestinations';
import DomesticSection from '../../components/destination/DomesticSection';
import InternationalSection from '../../components/destination/InternationalSection';
import WeekendSection from '../../components/destination/WeekendSection';
import PopularPackages from '../../components/package/PopularPackages';
import TravelExperiences from '../../components/common/TravelExperiences';
import WhyChooseUs from '../../components/common/WhyChooseUs';
import TravelCTA from '../../components/common/TravelCTA';
import Testimonials from '../../components/common/Testimonials';
import Footer from '../../components/layout/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <main>
        <HeroSection />
        <TravelSearch />
        <TravelCategories />
        <PopularDestinations />
        <DomesticSection />
        <InternationalSection />
        <WeekendSection />
        <PopularPackages />
        <TravelExperiences />
        <WhyChooseUs />
        <TravelCTA />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Home;