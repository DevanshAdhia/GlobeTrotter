import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Menu, X, Star, MapPin, Users, Clock, Phone, Search, ChevronDown } from 'lucide-react';

const FacebookIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
);

const InstagramIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
);

const TwitterIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/></svg>
);

const Topbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm flex flex-col w-full">
      {/* TOP STRIP - Dark Blue */}
      <div className="hidden lg:flex justify-between items-center px-8 py-2 bg-[#002b5e] text-white text-xs font-medium">
        <div className="flex items-center space-x-6">
          <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> 15+ Years of Excellence</span>
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> 45+ Branches</span>
          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> 50,000+ Happy Travelers</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 24x7 Travel Support</span>
        </div>
        <div className="flex items-center space-x-6">
          <span className="flex items-center gap-1.5 font-bold"><Phone className="w-3.5 h-3.5" /> +91 99988 12345</span>
          <span className="cursor-pointer hover:text-gray-300">Talk to Expert</span>
          <div className="flex items-center space-x-3 ml-2 border-l border-white/20 pl-6">
            <FacebookIcon className="w-4 h-4 cursor-pointer hover:text-gray-300" />
            <InstagramIcon className="w-4 h-4 cursor-pointer hover:text-gray-300" />
            <TwitterIcon className="w-4 h-4 cursor-pointer hover:text-gray-300" />

          </div>
        </div>
      </div>

      {/* MAIN NAV - White */}
      <div className="flex justify-between items-center px-4 lg:px-8 py-3 bg-white">
        
        {/* LOGO */}
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <div className="text-[#002b5e] font-extrabold text-2xl tracking-tight leading-none flex items-end gap-1">
            <span className="text-3xl">A</span>jay Modi
          </div>
          <div className="flex flex-col ml-1 leading-none mt-1">
            <span className="text-[#002b5e] text-[10px] font-bold tracking-widest">TRAVELS</span>
            <span className="text-gray-400 text-[6px] tracking-wider">Dream. Travel. Explore.</span>
          </div>
        </div>

        {/* CENTER LINKS */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-bold text-[#002b5e]">
          <NavLink to="/" className="hover:text-primary transition-colors">Home</NavLink>
          <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">Domestic <ChevronDown className="w-3.5 h-3.5 text-gray-400" /></div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">International <ChevronDown className="w-3.5 h-3.5 text-gray-400" /></div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">Weekend Gateways <ChevronDown className="w-3.5 h-3.5 text-gray-400" /></div>
          <NavLink to="/packages" className="hover:text-primary transition-colors">Packages</NavLink>
          <NavLink to="/deals" className="hover:text-primary transition-colors">Deals</NavLink>
          <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">About Us <ChevronDown className="w-3.5 h-3.5 text-gray-400" /></div>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 text-gray-600 hidden lg:block cursor-pointer hover:text-primary" />
          <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center hidden lg:flex cursor-pointer hover:bg-gray-100">
            <Phone className="w-4 h-4 text-[#002b5e]" />
          </div>
          <button onClick={() => navigate('/discover/goa')} className="hidden lg:block bg-[#002b5e] hover:bg-blue-900 text-white px-6 py-2.5 rounded-md font-bold text-sm transition-colors">
            Enquire Now
          </button>
          
          {user && (
            <div className="hidden lg:flex items-center gap-2 cursor-pointer ml-4" onClick={() => navigate('/profile')}>
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=002b5e&color=fff`} alt="User" className="w-8 h-8 rounded-full" />
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 text-gray-600 focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 w-full bg-white border-b border-gray-100 shadow-xl z-50 flex flex-col py-4 px-6 max-h-[80vh] overflow-y-auto">
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="py-3 font-semibold text-lg border-b border-gray-50 text-[#002b5e]">Home</NavLink>
          <NavLink to="/domestic-destinations" onClick={() => setMobileMenuOpen(false)} className="py-3 font-semibold text-lg border-b border-gray-50 text-[#002b5e]">Domestic</NavLink>
          <NavLink to="/international-destinations" onClick={() => setMobileMenuOpen(false)} className="py-3 font-semibold text-lg border-b border-gray-50 text-[#002b5e]">International</NavLink>
          <NavLink to="/weekend-gateways" onClick={() => setMobileMenuOpen(false)} className="py-3 font-semibold text-lg border-b border-gray-50 text-[#002b5e]">Weekend Gateways</NavLink>
          {!user && (
            <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="mt-4 bg-[#002b5e] text-white py-3 rounded-md font-bold w-full">
              Sign In
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Topbar;
