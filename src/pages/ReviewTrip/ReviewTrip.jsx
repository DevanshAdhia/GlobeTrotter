import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { useBooking } from '../../hooks/useBooking';
import { validateTripRequest, hasErrors } from '../../utils/validation';
import { BookingProgress } from '../../components/booking/BookingProgress';
import { requestStore } from '../../services/requestStore';

import { ReviewDestinationCard }    from '../../components/review/ReviewDestinationCard';
import { ReviewPackageCard }         from '../../components/review/ReviewPackageCard';
import { ReviewTravelDates }         from '../../components/review/ReviewTravelDates';
import { ReviewTravellers }          from '../../components/review/ReviewTravellers';
import { ReviewPlaces }              from '../../components/review/ReviewPlaces';
import { ReviewActivities }          from '../../components/review/ReviewActivities';
import { ReviewHotel }               from '../../components/review/ReviewHotel';
import { ReviewTransport }           from '../../components/review/ReviewTransport';
import { ReviewSpecialRequirements } from '../../components/review/ReviewSpecialRequirements';
import { ReviewTravellerDetails }    from '../../components/review/ReviewTravellerDetails';
import { PriceBreakdown }            from '../../components/review/PriceBreakdown';
import { RequestAgreement }          from '../../components/review/RequestAgreement';
import { RequestSummary }            from '../../components/review/RequestSummary';
import { RequestSuccess }            from '../../components/review/RequestSuccess';

/* ─── Confirmation dialog for destination change ─── */
const ChangeDestinationDialog = ({ onKeep, onConfirm, destinationName }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4"
  >
    <motion.div
      initial={{ scale: 0.93, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.93, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl p-7 max-w-sm w-full shadow-2xl"
    >
      <div className="flex justify-center mb-4">
        <AlertTriangle className="w-10 h-10 text-amber-400" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Change Destination?</h2>
      <p className="text-sm text-gray-500 text-center leading-relaxed mb-6">
        Changing your destination from <strong>{destinationName}</strong> will clear the places and
        experiences you selected for this trip.
      </p>
      <div className="flex flex-col gap-3">
        <button
          onClick={onConfirm}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-colors"
        >
          Change Destination
        </button>
        <button
          onClick={onKeep}
          className="w-full border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-colors"
        >
          Keep {destinationName}
        </button>
      </div>
    </motion.div>
  </motion.div>
);

/* ─── Main ReviewTrip page ─── */
const ReviewTrip = () => {
  const { destinationSlug, packageSlug } = useParams();
  const navigate = useNavigate();

  const booking = useBooking(destinationSlug, packageSlug);
  const {
    destination, pkg, isLoading, error,
    departureDate, adults, children, rooms, childAges,
    selectedPlaces, selectedActivities,
    hotel, transport, specialRequirements,
    travellerDetails, contactPreference,
    estimatedTotal, clearTrip,
  } = booking;

  const [termsAccepted,      setTermsAccepted]     = useState(false);
  const [validationErrors,   setValidationErrors]   = useState({});
  const [submitting,         setSubmitting]         = useState(false);
  const [submitError,        setSubmitError]        = useState(null);
  const [success,            setSuccess]            = useState(false);
  const [requestId,          setRequestId]          = useState(null);
  const [showDestDialog,     setShowDestDialog]     = useState(false);

  const hasSubmitted = useRef(false);

  /* ─── Navigate back to Phase 09 at a specific section ─── */
  const goToCustomize = (hash = '') =>
    navigate(`/plan-your-trip/${destinationSlug}/${packageSlug}${hash}`);

  /* ─── Destination change ─── */
  const handleChangeDestination = () => setShowDestDialog(true);
  const handleConfirmDestChange = () => {
    setShowDestDialog(false);
    clearTrip();
    navigate('/domestic-destinations');
  };

  /* ─── Submit ─── */
  const handleSubmit = async () => {
    if (hasSubmitted.current) return;

    const errors = validateTripRequest({
      departureDate,
      adults,
      travellerDetails,
      termsAccepted,
    });

    if (hasErrors(errors)) {
      setValidationErrors(errors);
      toast.error('Please fix the errors before submitting.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setValidationErrors({});
    setSubmitting(true);
    setSubmitError(null);
    hasSubmitted.current = true;

    try {
      // Simulate async API call
      await new Promise((res, rej) => setTimeout(() => {
        // Uncomment next line to test error state:
        // rej(new Error('Network error'));
        res();
      }, 1800));

      const generatedId = `AMT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      // Persist to requestStore for Phase 11
      requestStore.save({
        requestId:       generatedId,
        status:          'Request Submitted',
        destinationSlug,
        destinationName: destination?.name,
        packageSlug,
        packageName:     pkg?.name,
        duration:        pkg?.duration,
        departureDate,
        adults,
        children,
        rooms,
        childAges,
        selectedPlaces,
        selectedActivities,
        hotel,
        transport,
        specialRequirements,
        travellerDetails,
        contactPreference,
        estimatedTotal,
        submittedAt: new Date().toISOString(),
      });
      setRequestId(generatedId);
      setSuccess(true);
    } catch (err) {
      setSubmitError('We couldn\'t submit your request. Please check your connection and try again.');
      hasSubmitted.current = false;
    } finally {
      setSubmitting(false);
    }
  };

  /* ─── Guard: success ─── */
  if (success) return <RequestSuccess destination={destination} requestId={requestId} />;

  /* ─── Guard: loading ─── */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-gray-500 font-medium">Loading your trip details...</p>
        </div>
      </div>
    );
  }

  /* ─── Guard: error / missing data ─── */
  if (error || !destination || !pkg) {
    return (
      <div className="min-h-screen bg-[#fafafa] pt-32 pb-20 px-4 text-center">
        <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">{error || 'Trip data not found'}</h2>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          We couldn't load your trip details. Please go back and customize your trip.
        </p>
        <button
          onClick={() => navigate('/domestic-destinations')}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold transition-colors"
        >
          Choose a Destination
        </button>
      </div>
    );
  }

  const section = (delay) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.24, delay },
  });

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-36">
      {/* ─── Destination-change confirmation dialog ─── */}
      <AnimatePresence>
        {showDestDialog && (
          <ChangeDestinationDialog
            destinationName={destination.name}
            onKeep={() => setShowDestDialog(false)}
            onConfirm={handleConfirmDestChange}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress */}
        <BookingProgress currentStep={4} title="Review Your Trip" />

        {/* Page heading */}
        <motion.div {...section(0)} className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Review Your {destination.name} Trip
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Everything looks good? Review your trip details before sending your request.
          </p>
        </motion.div>

        {/* Reassurance strip */}
        <motion.div {...section(0.04)} className="bg-primary/5 border border-primary/10 rounded-2xl px-6 py-4 mb-10 flex items-start gap-3">
          <span className="text-2xl">✈️</span>
          <div>
            <p className="font-bold text-gray-900">You're almost done.</p>
            <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
              Send your trip request and our travel team will contact you to confirm availability,
              pricing and final arrangements.
            </p>
          </div>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── Left: review sections ── */}
          <div className="flex-1 w-full space-y-5">

            {/* 1. Destination */}
            <ReviewDestinationCard
              destination={destination}
              onChangeDestination={handleChangeDestination}
            />

            {/* 2. Package */}
            <ReviewPackageCard
              pkg={pkg}
              destination={destination}
              onEdit={() => navigate(`/packages/${pkg.slug}`)}
            />

            {/* 3. Travel dates */}
            <ReviewTravelDates
              departureDate={departureDate}
              duration={pkg.duration}
              onEdit={() => goToCustomize()}
            />

            {/* 4. Travellers */}
            <ReviewTravellers
              adults={adults}
              children={children}
              rooms={rooms}
              childAges={childAges}
              onEdit={() => goToCustomize()}
            />

            {/* 5. Places */}
            <ReviewPlaces
              selectedPlaces={selectedPlaces}
              includedPlaces={pkg.includedPlaces || []}
              destinationSlug={destinationSlug}
              onEdit={() => goToCustomize()}
            />

            {/* 6. Activities */}
            <ReviewActivities
              selectedActivities={selectedActivities}
              includedActivities={pkg.includedActivities || []}
              destinationSlug={destinationSlug}
              onEdit={() => goToCustomize()}
            />

            {/* 7. Hotel */}
            <ReviewHotel hotel={hotel} onEdit={() => goToCustomize()} />

            {/* 8. Transport */}
            <ReviewTransport transport={transport} onEdit={() => goToCustomize()} />

            {/* 9. Special Requirements */}
            <ReviewSpecialRequirements
              requirements={specialRequirements}
              onEdit={() => goToCustomize()}
            />

            {/* 10. Traveller Details + Contact */}
            <ReviewTravellerDetails
              details={travellerDetails}
              contactPreference={contactPreference}
              onEdit={() => goToCustomize()}
            />

            {/* 11. Price Breakdown */}
            <PriceBreakdown
              pkg={pkg}
              hotel={hotel}
              transport={transport}
              selectedActivities={selectedActivities}
              selectedPlaces={selectedPlaces}
              estimatedTotal={estimatedTotal}
            />

            {/* 12. Terms agreement */}
            <RequestAgreement
              accepted={termsAccepted}
              setAccepted={setTermsAccepted}
              error={validationErrors.terms}
            />

            {/* Error state */}
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-2xl p-5"
              >
                <p className="font-bold text-red-700 mb-1">Submission failed</p>
                <p className="text-sm text-red-600">{submitError}</p>
                <button
                  onClick={() => { hasSubmitted.current = false; handleSubmit(); }}
                  className="mt-3 text-sm font-bold text-red-600 hover:underline"
                >
                  Try Again
                </button>
              </motion.div>
            )}

            {/* ── Desktop CTA buttons ── */}
            <motion.div {...section(0.26)} className="hidden lg:flex items-center gap-4 pt-2">
              <button
                onClick={() => goToCustomize()}
                className="flex items-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold px-6 py-3.5 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Customize
              </button>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting Request...
                  </>
                ) : (
                  'Request My Trip'
                )}
              </button>
            </motion.div>
          </div>

          {/* ── Right: sticky summary ── */}
          <RequestSummary
            destination={destination}
            pkg={pkg}
            departureDate={departureDate}
            adults={adults}
            children={children}
            rooms={rooms}
            estimatedTotal={estimatedTotal}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewTrip;
