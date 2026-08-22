import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Menu, X, Star, MapPin, Users, Clock, Phone, Search, ChevronDown, Facebook, Instagram, Twitter } from 'lucide-react';
import './Topbar.css'; // Optional custom CSS if needed

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
            <Facebook className="w-4 h-4 cursor-pointer hover:text-gray-300" />
            <Instagram className="w-4 h-4 cursor-pointer hover:text-gray-300" />
            <Twitter className="w-4 h-4 cursor-pointer hover:text-gray-300" />
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
