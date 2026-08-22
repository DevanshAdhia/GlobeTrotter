import { places } from '../data/places';
import { activities } from '../data/activities';

export const calculateTotal = (basePrice, hotelCost, transportCost, selectedPlaces, selectedActivities) => {
  let total = basePrice || 0;
  
  if (hotelCost) total += hotelCost;
  if (transportCost) total += transportCost;
  
  selectedPlaces.forEach(placeId => {
    const place = places.find(p => p.id === placeId);
    if (place && place.price) {
      total += place.price;
    }
  });

  selectedActivities.forEach(activityId => {
    const activity = activities.find(a => a.id === activityId);
    if (activity && activity.price) {
      total += activity.price;
    }
  });

  return total;
};
