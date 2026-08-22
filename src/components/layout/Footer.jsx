import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, MessageCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';

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
            <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#3b5998] hover:bg-[#3b5998] hover:text-white transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#e1306c] hover:bg-[#e1306c] hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#ff0000] hover:bg-[#ff0000] hover:text-white transition-colors"><Youtube className="w-4 h-4" /></a>
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