export const kpiData = {
  totalUsers: {
    value: "124,580",
    trend: "+12.8%",
    isPositive: true,
    label: "vs last month"
  },
  activeTrips: {
    value: "18,420",
    trend: "+8.4%",
    isPositive: true,
    label: "vs last month"
  },
  tripsCreated: {
    value: "32,840",
    trend: "+16.2%",
    isPositive: true,
    label: "vs last month"
  },
  publicTrips: {
    value: "8,942",
    trend: "+11.7%",
    isPositive: true,
    label: "vs last month"
  },
  destinations: {
    value: "2,480",
    trend: "+4.3%",
    isPositive: true,
    label: "vs last month"
  },
  activities: {
    value: "18,920",
    trend: "+9.1%",
    isPositive: true,
    label: "vs last month"
  }
};

export const userGrowthData = [
  { name: 'Aug 12', newUsers: 800, activeUsers: 6200 },
  { name: 'Aug 13', newUsers: 950, activeUsers: 6800 },
  { name: 'Aug 14', newUsers: 1100, activeUsers: 7100 },
  { name: 'Aug 15', newUsers: 1050, activeUsers: 7500 },
  { name: 'Aug 16', newUsers: 1150, activeUsers: 7900 },
  { name: 'Aug 17', newUsers: 1200, activeUsers: 8200 },
  { name: 'Aug 18', newUsers: 1240, activeUsers: 8420 },
];

export const tripActivityData = [
  { name: 'Aug 12', created: 300, completed: 150, shared: 80 },
  { name: 'Aug 13', created: 350, completed: 180, shared: 110 },
  { name: 'Aug 14', created: 400, completed: 200, shared: 130 },
  { name: 'Aug 15', created: 380, completed: 220, shared: 140 },
  { name: 'Aug 16', created: 420, completed: 210, shared: 160 },
  { name: 'Aug 17', created: 450, completed: 240, shared: 180 },
  { name: 'Aug 18', created: 480, completed: 260, shared: 210 },
];

export const platformHealth = {
  overall: 96,
  metrics: [
    { label: 'Users', value: 98 },
    { label: 'Trips', value: 94 },
    { label: 'Content', value: 97 },
    { label: 'Reports', value: 89 },
  ]
};
