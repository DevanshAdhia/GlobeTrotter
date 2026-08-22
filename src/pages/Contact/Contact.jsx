import React, { useState } from 'react';
import Topbar from '../../components/layout/Topbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/common/Container';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', destination: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      return toast.error('Please fill in all required fields.');
    }
    setSubmitted(true);
    toast.success('Thank you! Your enquiry has been received.');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Topbar />

      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#001d42] via-[#002b5e] to-indigo-950 text-white py-24 relative overflow-hidden flex flex-col items-center justify-center">
        <Container className="text-center max-w-3xl mx-auto relative z-10">
          <span className="text-amber-300 font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full border border-white/20 mb-4 inline-block">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            We'd Love to Hear From You
          </h1>
          <p className="text-lg text-blue-100/90 leading-relaxed mb-0">
            Have questions about a holiday package, custom itinerary, or booking? Our travel experts are available 24/7.
          </p>
        </Container>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Contact Information Sidebar */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col h-auto overflow-hidden">
                <h3 className="text-xl font-extrabold text-[#002b5e] mb-6">Contact Information</h3>
                
                <ul className="flex flex-col gap-6 text-sm mb-8">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-0.5">Headquarters</div>
                      <div className="text-gray-500 text-xs">Navrangpura, Ahmedabad, Gujarat 380009</div>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-0.5">Call Us</div>
                      <div className="text-gray-500 text-xs">+91 99988 12345 / +91 79 2640 0000</div>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-0.5">Email Support</div>
                      <div className="text-gray-500 text-xs">info@ajaymoditravels.com</div>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-0.5">Working Hours</div>
                      <div className="text-gray-500 text-xs">Monday - Sunday: 9:00 AM - 8:00 PM</div>
                    </div>
                  </li>
                </ul>

                <a 
                  href="https://wa.me/919998812345" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20b858] text-white font-bold py-3.5 px-6 rounded-2xl transition-all text-sm no-underline shadow-md"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Branch Offices Summary */}
              <div className="bg-[#002b5e] text-white rounded-3xl p-8 shadow-sm">
                <h4 className="font-extrabold text-lg mb-3">45+ Branches Across India</h4>
                <p className="text-xs text-blue-100/80 mb-4 leading-relaxed">
                  Visit our regional offices in Ahmedabad, Mumbai, Delhi, Surat, Vadodara, and Rajkot for face-to-face consultation.
                </p>
                <span className="text-amber-300 font-bold text-xs">Walk-ins Welcome Every Day</span>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
              {submitted ? (
                <div className="text-center py-16 flex flex-col items-center">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                    Our travel experts will contact you within 30 minutes to discuss your itinerary.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)} 
                    className="inline-flex bg-primary text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-primary-dark"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-2xl font-extrabold text-[#002b5e] mb-2">Send Us an Enquiry</h3>
                    <p className="text-sm text-gray-500">Fill out the form below and we will help you plan your dream vacation.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Phone Number *</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address *</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Interested Destination</label>
                      <input 
                        type="text" 
                        value={formData.destination}
                        onChange={e => setFormData({ ...formData, destination: e.target.value })}
                        placeholder="e.g. Kashmir, Dubai, Bali" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Your Message / Requirements</label>
                    <textarea 
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us your travel dates, group size, or budget..." 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#002b5e] hover:bg-blue-900 text-white font-bold py-4 px-6 rounded-xl text-base transition-all duration-200 shadow-lg shadow-[#002b5e]/20"
                  >
                    <Send className="w-5 h-5 text-amber-300" />
                    <span>Submit Enquiry</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
