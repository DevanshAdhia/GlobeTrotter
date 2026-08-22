/**
 * validation.js
 * Shared validation utilities for Phase 09 and Phase 10.
 */

export const validateTravellerDetails = (details) => {
  const errors = {};
  if (!details.firstName?.trim()) errors.firstName = 'First name is required.';
  if (!details.lastName?.trim())  errors.lastName  = 'Last name is required.';
  if (!details.email?.trim() || !/\S+@\S+\.\S+/.test(details.email))
    errors.email = 'A valid email address is required.';
  if (!details.phone?.trim() || details.phone.replace(/\D/g, '').length < 10)
    errors.phone = 'A valid phone number is required.';
  return errors;
};

export const validateTripRequest = ({ departureDate, adults, travellerDetails, termsAccepted }) => {
  const errors = {};
  if (!departureDate) errors.date = 'Departure date is required.';
  if (!adults || adults < 1) errors.adults = 'At least 1 adult is required.';
  if (!termsAccepted) errors.terms = 'Please confirm the trip details and accept the terms.';
  const detailErrors = validateTravellerDetails(travellerDetails);
  return { ...errors, ...detailErrors };
};

export const hasErrors = (errors) => Object.keys(errors).length > 0;
