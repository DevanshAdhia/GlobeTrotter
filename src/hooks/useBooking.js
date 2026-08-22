/**
 * useBooking.js
 * Central hook that reads all Phase 09 booking state from sessionStorage.
 * Single source of truth for Phases 09 and 10.
 */
import { useCallback } from 'react';
import { useBookingStorage } from './useBookingStorage';
import { useDestinationRecommendations } from './useDestinationRecommendations';
import { calculateTotal } from '../utils/pricing';

const HOTEL_COSTS = { standard: 0, premium: 15000, luxury: 35000 };
const TRANSPORT_COSTS = { shared: 0, private: 8000, self: 12000 };

export const useBooking = (destinationSlug, packageSlug) => {
  const key = (field) => `trip_${packageSlug}_${field}`;

  const { destination, pkg, recommendedPlaces, recommendedActivities, isLoading, error } =
    useDestinationRecommendations(destinationSlug, packageSlug);

  const [departureDate, setDepartureDate]         = useBookingStorage(key('date'),      '');
  const [adults,        setAdults]                = useBookingStorage(key('adults'),     2);
  const [children,      setChildren]              = useBookingStorage(key('children'),   0);
  const [rooms,         setRooms]                 = useBookingStorage(key('rooms'),      1);
  const [childAges,     setChildAges]             = useBookingStorage(key('childAges'),  []);
  const [selectedPlaces,     setSelectedPlaces]   = useBookingStorage(key('places'),     []);
  const [selectedActivities, setSelectedActivities] = useBookingStorage(key('activities'), []);
  const [hotel,         setHotel]                 = useBookingStorage(key('hotel'),      'standard');
  const [transport,     setTransport]             = useBookingStorage(key('transport'),  'shared');
  const [specialRequirements, setSpecialRequirements] = useBookingStorage(key('reqs'),  '');
  const [travellerDetails,    setTravellerDetails]    = useBookingStorage(key('traveller'), { firstName: '', lastName: '', email: '', phone: '' });
  const [contactPreference,   setContactPreference]   = useBookingStorage(key('contact'),  'whatsapp');

  const hotelCost     = HOTEL_COSTS[hotel]     ?? 0;
  const transportCost = TRANSPORT_COSTS[transport] ?? 0;

  const estimatedTotal = pkg
    ? calculateTotal(pkg.price, hotelCost, transportCost, selectedPlaces, selectedActivities, bookingData.adults, bookingData.children)
    : 0;

  const clearTrip = useCallback(() => {
    setDepartureDate('');
    setAdults(2);
    setChildren(0);
    setRooms(1);
    setChildAges([]);
    setSelectedPlaces([]);
    setSelectedActivities([]);
    setHotel('standard');
    setTransport('shared');
    setSpecialRequirements('');
    setTravellerDetails({ firstName: '', lastName: '', email: '', phone: '' });
    setContactPreference('whatsapp');
  }, []);

  return {
    // Data
    destination, pkg, recommendedPlaces, recommendedActivities, isLoading, error,
    // State + setters
    departureDate,  setDepartureDate,
    adults,         setAdults,
    children,       setChildren,
    rooms,          setRooms,
    childAges,      setChildAges,
    selectedPlaces, setSelectedPlaces,
    selectedActivities, setSelectedActivities,
    hotel,          setHotel,
    transport,      setTransport,
    specialRequirements, setSpecialRequirements,
    travellerDetails,    setTravellerDetails,
    contactPreference,   setContactPreference,
    // Computed
    hotelCost, transportCost, estimatedTotal,
    clearTrip,
    HOTEL_COSTS, TRANSPORT_COSTS,
  };
};
