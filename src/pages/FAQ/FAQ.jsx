import React, { useState } from 'react';
import Topbar from '../../components/layout/Topbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/common/Container';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'How do I book a tour package with Ajay Modi Travels?',
    a: 'You can browse any tour package on our website, select your preferred travel date and travelers, and click "Book Now" or "Enquire Now". Our travel experts will assist you with instant confirmation.'
  },
  {
    q: 'What is included in the package price?',
    a: 'Most of our packages include 3-star to 5-star hotel accommodations, daily breakfast, airport transfers, sightseeing in private AC vehicles, and guided tours. Detailed inclusions are listed on each package page.'
  },
  {
    q: 'Can I customize an itinerary?',
    a: 'Yes! We specialize in custom trip planning. You can use our Custom Itinerary Builder or contact our travel advisors to add extra cities, extend durations, or upgrade hotels.'
  },
  {
    q: 'What is the cancellation and refund policy?',
    a: 'Cancellations made 30 days prior to travel are eligible for a full refund minus a nominal processing fee. Full details can be reviewed in our Terms & Conditions.'
  },
  {
    q: 'Do you offer travel insurance?',
    a: 'Yes, comprehensive travel insurance covering flight delays, medical emergencies, and luggage protection is available upon request.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [query, setQuery] = useState('');

  const filteredFaqs = faqs.filter(f => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Topbar />

      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#001d42] via-[#002b5e] to-indigo-950 text-white py-16 relative">
        <Container className="text-center max-w-3xl mx-auto">
          <span className="text-amber-300 font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full border border-white/20 mb-3 inline-block">
            Frequently Asked Questions
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            How Can We Help You?
          </h1>
          <p className="text-base text-blue-100/90 leading-relaxed">
            Find answers to common questions about bookings, payments, customizations, and travel policies.
          </p>
        </Container>
      </section>

      {/* Search Input */}
      <section className="-mt-7 relative z-20 max-w-2xl mx-auto px-4 w-full">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type your question here..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm font-medium shadow-lg focus:outline-none focus:border-primary"
          />
        </div>
      </section>

      {/* FAQ Accordions */}
      <section className="py-16">
        <Container className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {filteredFaqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full p-6 text-left font-bold text-gray-900 text-base flex justify-between items-center gap-4 hover:text-primary transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-primary' : ''}`} />
                </button>

                {openIndex === i && (
                  <div className="px-6 pb-6 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
