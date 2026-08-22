import { places } from '../data/places';
import { activities } from '../data/activities';

export const calculateTotal = (basePrice, hotelCost, transportCost, selectedPlaces, selectedActivities, adults = 1, children = 0) => {
  const peopleMultiplier = adults + (children * 0.5);
  let total = (basePrice || 0) * peopleMultiplier;
  
  if (hotelCost) total += hotelCost; // Hotel is usually per room, assume fixed cost for now
  if (transportCost) total += transportCost; // Transport is per vehicle
  
  selectedPlaces.forEach(placeId => {
    const place = places.find(p => p.id === placeId);
    if (place && place.price) {
      total += (place.price * peopleMultiplier);
    }
  });

  selectedActivities.forEach(activityId => {
    const activity = activities.find(a => a.id === activityId);
    if (activity && activity.price) {
      total += (activity.price * peopleMultiplier);
    }
  });

  return total;
};
