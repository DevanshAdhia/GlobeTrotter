import React from 'react';
import Topbar from '../../components/layout/Topbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/common/Container';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Topbar />

      <section className="bg-[#002b5e] text-white py-16">
        <Container className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2">Terms & Conditions</h1>
          <p className="text-sm text-blue-100/80">Last Updated: January 2026</p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm text-gray-700 space-y-6 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900">1. Acceptance of Terms</h2>
          <p>By accessing or using the services provided by Ajay Modi Travels and GlobeTrotter, you agree to comply with and be bound by these terms and conditions.</p>

          <h2 className="text-xl font-bold text-gray-900">2. Bookings & Payments</h2>
          <p>All bookings are subject to availability and confirmation upon receipt of advance payment. Balance payments must be cleared prior to departure as specified in your booking confirmation.</p>

          <h2 className="text-xl font-bold text-gray-900">3. Cancellations & Modifications</h2>
          <p>Cancellation requests must be submitted in writing. Refund amounts vary depending on how far in advance the cancellation is requested prior to departure date.</p>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default TermsConditions;
