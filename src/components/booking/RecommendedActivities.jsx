import React from 'react';
import { RecommendedActivityCard } from './RecommendedActivityCard';

export const RecommendedActivities = ({ destination, activities, includedActivities, selectedActivities, setSelectedActivities }) => {
  if (!activities || activities.length === 0) {
    return null;
  }

  const toggleActivity = (id) => {
    if (selectedActivities.includes(id)) {
      setSelectedActivities(selectedActivities.filter(aId => aId !== id));
    } else {
      setSelectedActivities([...selectedActivities, id]);
    }
  };

  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Recommended Experiences in {destination.name}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map(activity => (
          <RecommendedActivityCard 
            key={activity.id}
            activity={activity}
            isIncluded={includedActivities.includes(activity.id)}
            isSelected={selectedActivities.includes(activity.id)}
            onToggle={toggleActivity}
          />
        ))}
      </div>
    </div>
  );
};
