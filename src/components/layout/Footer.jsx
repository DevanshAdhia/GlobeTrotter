import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';

const FacebookIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
);

const InstagramIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
);

const YoutubeIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
);


const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 mt-10">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12">
        
        {/* Column 1: Brand */}
        <div className="lg:col-span-1">
          <div className="flex flex-col cursor-pointer mb-6" onClick={() => window.scrollTo(0,0)}>
            <div className="text-[#002b5e] font-extrabold text-3xl tracking-tight leading-none flex items-end gap-1">
              <span className="text-4xl">A</span>jay Modi
            </div>
            <div className="flex flex-col ml-1 leading-none mt-1">
              <span className="text-[#002b5e] text-[11px] font-bold tracking-widest">TRAVELS</span>
              <span className="text-gray-400 text-[7px] tracking-wider">Dream. Travel. Explore.</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            15+ years of creating unforgettable travel experiences. Explore the world with our handpicked tour packages.
          </p>
          <div className="flex items-center space-x-3">
            <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#3b5998] hover:bg-[#3b5998] hover:text-white transition-colors"><FacebookIcon className="w-4 h-4" /></a>
            <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#e1306c] hover:bg-[#e1306c] hover:text-white transition-colors"><InstagramIcon className="w-4 h-4" /></a>
            <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#ff0000] hover:bg-[#ff0000] hover:text-white transition-colors"><YoutubeIcon className="w-4 h-4" /></a>
            <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#25d366] hover:bg-[#25d366] hover:text-white transition-colors"><MessageCircle className="w-4 h-4" /></a>
          </div>

        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-bold text-sm text-gray-900 mb-5">Quick Links</h4>
          <ul className="space-y-3 text-xs text-gray-600 font-medium">
            <li><Link to="/" className="hover:text-[#002b5e]">Home</Link></li>
            <li><Link to="/domestic-destinations" className="hover:text-[#002b5e]">Domestic Destinations</Link></li>
            <li><Link to="/international-destinations" className="hover:text-[#002b5e]">International Destinations</Link></li>
            <li><Link to="/weekend-gateways" className="hover:text-[#002b5e]">Weekend Gateways</Link></li>
            <li><Link to="/packages" className="hover:text-[#002b5e]">Packages</Link></li>
            <li><Link to="/deals" className="hover:text-[#002b5e]">Deals</Link></li>
            <li><Link to="/about" className="hover:text-[#002b5e]">About Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Popular Destinations */}
        <div>
          <h4 className="font-bold text-sm text-gray-900 mb-5">Popular Destinations</h4>
          <ul className="space-y-3 text-xs text-gray-600 font-medium">
            <li><Link to="/discover/kashmir" className="hover:text-[#002b5e]">Kashmir Packages</Link></li>
            <li><Link to="/discover/kerala" className="hover:text-[#002b5e]">Kerala Packages</Link></li>
            <li><Link to="/discover/himachal" className="hover:text-[#002b5e]">Himachal Packages</Link></li>
            <li><Link to="/discover/rajasthan" className="hover:text-[#002b5e]">Rajasthan Packages</Link></li>
            <li><Link to="/discover/goa" className="hover:text-[#002b5e]">Goa Packages</Link></li>
            <li><Link to="/discover/uttarakhand" className="hover:text-[#002b5e]">Uttarakhand Packages</Link></li>
          </ul>
        </div>

        {/* Column 4: Travel Styles */}
        <div>
          <h4 className="font-bold text-sm text-gray-900 mb-5">Travel Styles</h4>
          <ul className="space-y-3 text-xs text-gray-600 font-medium">
            <li><Link to="#" className="hover:text-[#002b5e]">Family Tours</Link></li>
            <li><Link to="#" className="hover:text-[#002b5e]">Couple Tours</Link></li>
            <li><Link to="#" className="hover:text-[#002b5e]">Luxury Tours</Link></li>
            <li><Link to="#" className="hover:text-[#002b5e]">Adventure Tours</Link></li>
            <li><Link to="#" className="hover:text-[#002b5e]">Group Tours</Link></li>
            <li><Link to="#" className="hover:text-[#002b5e]">Women Special Tours</Link></li>
          </ul>
        </div>

        {/* Column 5: Contact Us */}
        <div>
          <h4 className="font-bold text-sm text-gray-900 mb-5">Contact Us</h4>
          <ul className="space-y-4 text-xs text-gray-600 font-medium">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#002b5e] shrink-0 mt-0.5" />
              <span>Ahmedabad, Gujarat, India</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#002b5e] shrink-0" />
              <span>+91 99988 12345</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#002b5e] shrink-0" />
              <span>info@ajaymoditravels.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#002b5e] shrink-0" />
              <span>Mon - Sun: 9:00 AM - 8:00 PM</span>
            </li>
          </ul>
          <a href="#" className="mt-5 inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#20b858] text-white px-5 py-2.5 rounded-md font-bold text-xs transition-colors">
            <MessageCircle className="w-4 h-4" /> WhatsApp Us
          </a>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="bg-[#002b5e] text-white py-4 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between text-[11px] font-medium">
        <p>© 2025 Ajay Modi Travels. All rights reserved.</p>
        <div className="flex items-center gap-4 mt-2 md:mt-0 opacity-80">
          <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
          <Link to="/cancellation" className="hover:text-white">Cancellation Policy</Link>
          <Link to="/sitemap" className="hover:text-white">Sitemap</Link>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a href="#" className="fixed bottom-6 right-6 w-14 h-14 bg-[#25d366] rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform z-50">
        <MessageCircle className="w-8 h-8" />
      </a>
    </footer>
  );
};
export default Footer;