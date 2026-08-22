import React from 'react';
import Topbar from '../../components/layout/Topbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/common/Container';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Topbar />

      <section className="bg-[#002b5e] text-white py-16">
        <Container className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2">Privacy Policy</h1>
          <p className="text-sm text-blue-100/80">Last Updated: January 2026</p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm text-gray-700 space-y-6 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900">1. Information We Collect</h2>
          <p>At Ajay Modi Travels / GlobeTrotter, we respect your personal privacy. We collect information such as your name, email address, phone number, and travel preferences when you submit an enquiry, book a package, or register an account.</p>

          <h2 className="text-xl font-bold text-gray-900">2. How We Use Your Information</h2>
          <p>Your information is strictly used to facilitate booking reservations, customize travel itineraries, provide customer support, and send booking updates or promotional offers (which you may opt out of at any time).</p>

          <h2 className="text-xl font-bold text-gray-900">3. Data Security & Encryption</h2>
          <p>We employ industry-standard SSL encryption and secure server protocols to safeguard your personal data against unauthorized access, disclosure, or alteration.</p>

          <h2 className="text-xl font-bold text-gray-900">4. Contact Information</h2>
          <p>If you have any questions regarding our Privacy Policy, please contact us at info@ajaymoditravels.com.</p>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
