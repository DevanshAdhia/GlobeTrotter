import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDestinationRecommendations } from '../../hooks/useDestinationRecommendations';
import { useBookingStorage } from '../../hooks/useBookingStorage';
import { calculateTotal } from '../../utils/pricing';

import { BookingProgress } from '../../components/booking/BookingProgress';
import { PackageSummary } from '../../components/booking/PackageSummary';
import { TravelDatePicker } from '../../components/booking/TravelDatePicker';
import { TravellerSelector } from '../../components/booking/TravellerSelector';
import { RecommendedPlaces } from '../../components/booking/RecommendedPlaces';
import { RecommendedActivities } from '../../components/booking/RecommendedActivities';
import { HotelPreference } from '../../components/booking/HotelPreference';
import { TransportPreference } from '../../components/booking/TransportPreference';
import { SpecialRequirements } from '../../components/booking/SpecialRequirements';
import { TravellerDetails } from '../../components/booking/TravellerDetails';
import { ContactPreference } from '../../components/booking/ContactPreference';
import { TripSummary } from '../../components/booking/TripSummary';

import { toast } from 'react-hot-toast';

const PlanYourTrip = () => {
  const { destinationSlug, packageSlug } = useParams();
  const navigate = useNavigate();

  const { destination, pkg, recommendedPlaces, recommendedActivities, isLoading, error } = useDestinationRecommendations(destinationSlug, packageSlug);

  // Form States using sessionStorage
  const [departureDate, setDepartureDate] = useBookingStorage(`trip_${packageSlug}_date`, '');
  const [adults, setAdults] = useBookingStorage(`trip_${packageSlug}_adults`, 2);
  const [children, setChildren] = useBookingStorage(`trip_${packageSlug}_children`, 0);
  const [rooms, setRooms] = useBookingStorage(`trip_${packageSlug}_rooms`, 1);
  const [childAges, setChildAges] = useBookingStorage(`trip_${packageSlug}_childAges`, []);
  const [selectedPlaces, setSelectedPlaces] = useBookingStorage(`trip_${packageSlug}_places`, []);
  const [selectedActivities, setSelectedActivities] = useBookingStorage(`trip_${packageSlug}_activities`, []);
  const [hotel, setHotel] = useBookingStorage(`trip_${packageSlug}_hotel`, 'standard');
  const [transport, setTransport] = useBookingStorage(`trip_${packageSlug}_transport`, 'shared');
  const [specialRequirements, setSpecialRequirements] = useBookingStorage(`trip_${packageSlug}_reqs`, '');
  const [travellerDetails, setTravellerDetails] = useBookingStorage(`trip_${packageSlug}_traveller`, { firstName: '', lastName: '', email: '', phone: '' });
  const [contactPreference, setContactPreference] = useBookingStorage(`trip_${packageSlug}_contact`, 'whatsapp');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [validationErrors, setValidationErrors] = useState({});

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Loading your trip details...</p>
        </div>
      </div>
    );
  }

  if (error || !destination || !pkg) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Trip details not found'}</h2>
        <button 
          onClick={() => navigate('/domestic-destinations')}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold transition-colors"
        >
          Choose Another Package
        </button>
      </div>
    );
  }

  const hotelCost = hotel === 'premium' ? 15000 : hotel === 'luxury' ? 35000 : 0;
  const transportCost = transport === 'private' ? 8000 : transport === 'self' ? 12000 : 0;
  
  const totalPrice = calculateTotal(
    pkg.price, 
    hotelCost, 
    transportCost, 
    selectedPlaces, 
    selectedActivities,
    adults,
    children
  );

  const handleContinue = () => {
    const errors = {};
    if (!departureDate) errors.date = 'Departure date is required.';
    if (!travellerDetails.firstName) errors.firstName = 'First name is required.';
    if (!travellerDetails.lastName) errors.lastName = 'Last name is required.';
    if (!travellerDetails.email || !/\S+@\S+\.\S+/.test(travellerDetails.email)) errors.email = 'Valid email is required.';
    if (!travellerDetails.phone || travellerDetails.phone.length < 10) errors.phone = 'Valid phone number is required.';
    if (!termsAccepted) errors.terms = 'You must accept the terms and conditions.';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error('Please fill in all required fields correctly.');
      // Scroll to top or to first error
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setValidationErrors({});
    navigate(`/review-trip/${destinationSlug}/${packageSlug}`);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingProgress currentStep={3} title="Customize Trip" />

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Plan Your {destination.name} Trip</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Customize your journey with places, experiences, stay preferences and travel details.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 relative items-start">
          <div className="flex-1 w-full max-w-3xl">
            <PackageSummary pkg={pkg} destination={destination} />
            
            <TravelDatePicker 
              departureDate={departureDate} 
              setDepartureDate={setDepartureDate} 
              duration={pkg.duration} 
            />
            {validationErrors.date && <p className="text-red-500 text-sm mt-[-2rem] mb-6">{validationErrors.date}</p>}

            <TravellerSelector 
              adults={adults} setAdults={setAdults}
              children={children} setChildren={setChildren}
              rooms={rooms} setRooms={setRooms}
              childAges={childAges} setChildAges={setChildAges}
            />

            <RecommendedPlaces 
              destination={destination}
              places={recommendedPlaces}
              includedPlaces={pkg.includedPlaces || []}
              selectedPlaces={selectedPlaces}
              setSelectedPlaces={setSelectedPlaces}
            />

            <RecommendedActivities 
              destination={destination}
              activities={recommendedActivities}
              includedActivities={pkg.includedActivities || []}
              selectedActivities={selectedActivities}
              setSelectedActivities={setSelectedActivities}
            />

            <HotelPreference hotel={hotel} setHotel={setHotel} />
            <TransportPreference transport={transport} setTransport={setTransport} />
            <SpecialRequirements requirements={specialRequirements} setRequirements={setSpecialRequirements} />
            <TravellerDetails details={travellerDetails} setDetails={setTravellerDetails} errors={validationErrors} />
            <ContactPreference preference={contactPreference} setPreference={setContactPreference} errors={validationErrors} />

            <div className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <label className="flex items-start cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-3 text-sm text-gray-600 leading-relaxed">
                  I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>. I understand that this is a booking request and the final price may vary based on availability.
                </span>
              </label>
              {validationErrors.terms && <p className="text-xs text-red-500 mt-2">{validationErrors.terms}</p>}
            </div>
          </div>

          <TripSummary 
            destination={destination}
            pkg={pkg}
            departureDate={departureDate}
            adults={adults}
            children={children}
            rooms={rooms}
            selectedPlaces={selectedPlaces}
            includedPlaces={pkg.includedPlaces || []}
            selectedActivities={selectedActivities}
            hotel={hotel}
            transport={transport}
            totalPrice={totalPrice}
            onContinue={handleContinue}
          />
        </div>
      </div>
    </div>
  );
};

export default PlanYourTrip;
