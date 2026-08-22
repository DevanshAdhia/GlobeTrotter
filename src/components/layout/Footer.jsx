import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  ShieldCheck, 
  Headset, 
  Lock,
  Award,
  DollarSign,
  HeadphonesIcon,
  Shield,
  Globe,
  ChevronDown
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full font-sans">
      {/* Top Trust Badge Strip (White Background) */}
      <div className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Badge 1 */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-gray-50/80 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 text-[#8b5cf6]" strokeWidth={1.75} />
              </div>
              <h4 className="font-bold text-gray-900 text-base mb-1">500+</h4>
              <p className="text-xs text-gray-500 font-medium">Destinations Worldwide</p>
            </div>
            
            {/* Badge 2 */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-gray-50/80 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-4">
                <ShieldCheck className="w-7 h-7 text-[#8b5cf6]" strokeWidth={1.75} />
              </div>
              <h4 className="font-bold text-gray-900 text-base mb-1">Best Price</h4>
              <p className="text-xs text-gray-500 font-medium">Guaranteed Best Rates</p>
            </div>

            {/* Badge 3 */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-gray-50/80 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-4">
                <Headset className="w-7 h-7 text-[#8b5cf6]" strokeWidth={1.75} />
              </div>
              <h4 className="font-bold text-gray-900 text-base mb-1">24/7 Support</h4>
              <p className="text-xs text-gray-500 font-medium">Always Here For You</p>
            </div>

            {/* Badge 4 */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-gray-50/80 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-4">
                <Lock className="w-7 h-7 text-[#8b5cf6]" strokeWidth={1.75} />
              </div>
              <h4 className="font-bold text-gray-900 text-base mb-1">Secure Booking</h4>
              <p className="text-xs text-gray-500 font-medium">100% Encrypted & Safe</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dark Footer */}
      <div className="bg-[#0b1120] text-gray-300 pt-20 pb-8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          {/* Main Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10 pb-16 border-b border-gray-800">
            
            {/* Column 1: Brand Info */}
            <div className="lg:col-span-1 pr-0 lg:pr-4">
              <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="w-10 h-10 text-[#8b5cf6]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-extrabold text-xl tracking-tight leading-none mb-1">GlobeTrotter</span>
                  <span className="text-gray-400 text-[9px] font-semibold tracking-[0.2em] uppercase">Ajay Modi Travels</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Explore the world with confidence. We help you discover amazing destinations, plan trips, and create memories that last forever.
              </p>
              
              <div className="flex items-center gap-3">
                <a href="#" className="w-9 h-9 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/10 transition-all">
                  <svg xmlns="http://www.3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/10 transition-all">
                  <svg xmlns="http://www.3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/10 transition-all">
                  <svg xmlns="http://www.3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/10 transition-all">
                  <svg xmlns="http://www.3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
              </div>
            </div>

            {/* Column 2: Explore */}
            <div>
              <h4 className="font-bold text-white text-base mb-5 tracking-wide">Explore</h4>
              <ul className="space-y-3 text-sm text-gray-400 font-medium">
                <li><Link to="/domestic-destinations" className="hover:text-white transition-colors">Domestic Trips</Link></li>
                <li><Link to="/international-destinations" className="hover:text-white transition-colors">International Tours</Link></li>
                <li><Link to="/weekend-gateways" className="hover:text-white transition-colors">Weekend Gateways</Link></li>
                <li><Link to="/domestic-destinations" className="hover:text-white transition-colors">Family Packages</Link></li>
                <li><Link to="/international-destinations" className="hover:text-white transition-colors">Honeymoon Specials</Link></li>
              </ul>
            </div>

            {/* Column 3: Plan Your Trip */}
            <div>
              <h4 className="font-bold text-white text-base mb-5 tracking-wide">Plan Your Trip</h4>
              <ul className="space-y-3 text-sm text-gray-400 font-medium">
                <li><Link to="/packages" className="hover:text-white transition-colors">All Packages</Link></li>
                <li><Link to="/deals" className="hover:text-white transition-colors">Exclusive Deals</Link></li>
                <li><Link to="/domestic-destinations" className="hover:text-white transition-colors">Popular Cities</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Custom Itinerary</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Travel Insurance</Link></li>
              </ul>
            </div>

            {/* Column 4: Company & Support */}
            <div>
              <h4 className="font-bold text-white text-base mb-5 tracking-wide">Company & Support</h4>
              <ul className="space-y-3 text-sm text-gray-400 font-medium">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">FAQs & Help</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Terms & Policies</Link></li>
              </ul>
            </div>

            {/* Column 5: Newsletter */}
            <div>
              <h4 className="font-bold text-white text-base mb-5 tracking-wide">Newsletter</h4>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full bg-[#1e293b] text-white px-4 py-3 rounded-xl text-sm border border-gray-700/80 focus:outline-none focus:border-[#8b5cf6] transition-colors placeholder:text-gray-500"
                />
                <button 
                  type="submit" 
                  className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-semibold py-3 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-[#8b5cf6]/20 active:scale-[0.98]"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
            
          </div>

          {/* Secondary Trust Features */}
          <div className="py-12 border-b border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 text-[#8b5cf6]">
                  <Award className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h5 className="text-white font-bold text-sm mb-0.5">Best Price Guarantee</h5>
                  <p className="text-xs text-gray-400">Guaranteed lowest travel rates.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 text-[#8b5cf6]">
                  <DollarSign className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h5 className="text-white font-bold text-sm mb-0.5">Easy Booking</h5>
                  <p className="text-xs text-gray-400">Instant confirmation in minutes.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 text-[#8b5cf6]">
                  <HeadphonesIcon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h5 className="text-white font-bold text-sm mb-0.5">24/7 Expert Support</h5>
                  <p className="text-xs text-gray-400">Dedicated assistance anytime.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 text-[#8b5cf6]">
                  <Shield className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h5 className="text-white font-bold text-sm mb-0.5">Secure Payments</h5>
                  <p className="text-xs text-gray-400">100% encrypted & protected.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Absolute Bottom Strip */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs text-gray-500 font-medium">
              © {new Date().getFullYear()} GlobeTrotter (Ajay Modi Travels). All rights reserved.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-medium">
              <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/about" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <Link to="/about" className="hover:text-white transition-colors">Sitemap</Link>
              
              <div className="relative ml-2">
                <button className="flex items-center gap-2 bg-[#1e293b] border border-gray-700/80 hover:border-gray-500 rounded-lg px-3 py-1.5 text-white text-xs transition-colors">
                  <Globe className="w-3.5 h-3.5" />
                  <span>English (US)</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;