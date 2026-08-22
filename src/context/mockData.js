export const mockUsers = [
  { id: 101, name: 'Sarthak', email: 'sa@gmail.com', is_active: true, created_at: '2026-08-22T08:40:07Z', role: 'admin' },
  { id: 102, name: 'Elena Rodriguez', email: 'elena.r@example.com', is_active: true, created_at: '2025-11-14T09:20:00Z', role: 'user' },
  { id: 103, name: 'Marcus Johnson', email: 'marcus.j@example.com', is_active: true, created_at: '2026-01-05T14:10:00Z', role: 'user', profile_photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  { id: 104, name: 'Aisha Patel', email: 'apatel@example.com', is_active: false, created_at: '2026-03-22T11:45:00Z', role: 'user', profile_photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
  { id: 105, name: 'Liam O\'Connor', email: 'liam.oc@example.com', is_active: true, created_at: '2026-06-10T16:30:00Z', role: 'user' }
];

export const mockDestinations = [
  { id: 201, name: 'Jaipur', city: 'Jaipur', country: 'India', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400', popularity_score: 96, searches: '45,000', trend: '+12%', cost_index: 45, region: 'Rajasthan' },
  { id: 202, name: 'Goa', city: 'Goa', country: 'India', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400', popularity_score: 98, searches: '62,000', trend: '+18%', cost_index: 60, region: 'West Coast' },
  { id: 203, name: 'Varanasi', city: 'Varanasi', country: 'India', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400', popularity_score: 90, searches: '38,000', trend: '+8%', cost_index: 35, region: 'Uttar Pradesh' },
  { id: 204, name: 'Munnar', city: 'Munnar', country: 'India', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=400', popularity_score: 92, searches: '41,000', trend: '+15%', cost_index: 55, region: 'Kerala' },
  { id: 205, name: 'Udaipur', city: 'Udaipur', country: 'India', image: 'https://images.unsplash.com/photo-1598324749719-798c19958043?w=400', popularity_score: 94, searches: '39,000', trend: '+10%', cost_index: 50, region: 'Rajasthan' },
  { id: 206, name: 'Agra', city: 'Agra', country: 'India', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400', popularity_score: 97, searches: '55,000', trend: '+5%', cost_index: 40, region: 'Uttar Pradesh' }
];

export const mockActivities = [
  { id: 301, city_id: 201, name: 'Amer Fort Heritage Walk', activity: 'Amer Fort Heritage Walk', destination: 'Jaipur', category: 'Culture', duration_minutes: 180, estimated_cost: 15, rating: 4.8, searches: '12,000', addedToTrips: '1,500' },
  { id: 302, city_id: 202, name: 'Dudhsagar Waterfalls Trek', activity: 'Dudhsagar Waterfalls Trek', destination: 'Goa', category: 'Adventure', duration_minutes: 360, estimated_cost: 25, rating: 4.7, searches: '8,500', addedToTrips: '900' },
  { id: 303, city_id: 203, name: 'Ganges Evening Aarti Boat Ride', activity: 'Ganges Evening Aarti Boat Ride', destination: 'Varanasi', category: 'Spiritual', duration_minutes: 120, estimated_cost: 10, rating: 4.9, searches: '15,000', addedToTrips: '2,100' },
  { id: 304, city_id: 204, name: 'Tea Plantation Tour', activity: 'Tea Plantation Tour', destination: 'Munnar', category: 'Nature', duration_minutes: 240, estimated_cost: 20, rating: 4.8, searches: '7,200', addedToTrips: '850' },
  { id: 305, city_id: 206, name: 'Taj Mahal Sunrise Tour', activity: 'Taj Mahal Sunrise Tour', destination: 'Agra', category: 'Sightseeing', duration_minutes: 150, estimated_cost: 30, rating: 4.9, searches: '25,000', addedToTrips: '5,000' }
];

export const mockTrips = [
  { id: 401, user_id: 102, name: 'Royal Rajasthan Roadtrip', trip: 'Royal Rajasthan Roadtrip', owner: 'Elena Rodriguez', destinations: 'Jaipur → Udaipur', dates: 'Oct 15 - Oct 25, 2026', budget: '$1,500', status: 'published', visibility: 'Public', start_date: '2026-10-15', end_date: '2026-10-25', travel_style: 'luxury', total_budget: 1500 },
  { id: 402, user_id: 103, name: 'Goa Weekend Getaway', trip: 'Goa Weekend Getaway', owner: 'Marcus Johnson', destinations: 'Goa', dates: 'Dec 05 - Dec 08, 2026', budget: '$450', status: 'draft', visibility: 'Private', start_date: '2026-12-05', end_date: '2026-12-08', travel_style: 'balanced', total_budget: 450 },
  { id: 403, user_id: 101, name: 'Spiritual Journey North', trip: 'Spiritual Journey North', owner: 'Sarthak', destinations: 'Varanasi → Agra', dates: 'Nov 01 - Nov 10, 2026', budget: '$300', status: 'published', visibility: 'Public', start_date: '2026-11-01', end_date: '2026-11-10', travel_style: 'budget', total_budget: 300 },
  { id: 404, user_id: 105, name: 'Kerala Backwaters & Hills', trip: 'Kerala Backwaters & Hills', owner: "Liam O'Connor", destinations: 'Munnar', dates: 'Sep 20 - Sep 28, 2026', budget: '$800', status: 'planning', visibility: 'Private', start_date: '2026-09-20', end_date: '2026-09-28', travel_style: 'adventure', total_budget: 800 }
];

export const mockReports = [
  { id: 501, entity_type: 'trip', entity_id: 401, reason: 'Spam content', status: 'pending', created_at: '2026-08-20T10:00:00Z', reporter_id: 104 },
  { id: 502, entity_type: 'user', entity_id: 104, reason: 'Inappropriate profile picture', status: 'resolved', created_at: '2026-08-18T14:30:00Z', reporter_id: 102 }
];

export const mockDashboard = {
  total_users: 1542,
  active_users: 1420,
  total_trips: 845,
  published_trips: 520,
  total_cities: 124,
  total_activities: 480,
  pending_reports: 12
};
