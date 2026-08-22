export const kpiData = {
  '7D': {
    totalUsers: { value: "124,580", trend: "+1.2%", isPositive: true, label: "vs last week" },
    activeTrips: { value: "4,250", trend: "+5.4%", isPositive: true, label: "vs last week" },
    tripsCreated: { value: "2,840", trend: "+3.2%", isPositive: true, label: "vs last week" },
    publicTrips: { value: "942", trend: "+2.7%", isPositive: true, label: "vs last week" },
    destinations: { value: "2,480", trend: "+0.3%", isPositive: true, label: "vs last week" },
    activities: { value: "18,920", trend: "+0.1%", isPositive: true, label: "vs last week" }
  },
  '30D': {
    totalUsers: { value: "135,200", trend: "+12.8%", isPositive: true, label: "vs last month" },
    activeTrips: { value: "18,420", trend: "+8.4%", isPositive: true, label: "vs last month" },
    tripsCreated: { value: "32,840", trend: "+16.2%", isPositive: true, label: "vs last month" },
    publicTrips: { value: "8,942", trend: "+11.7%", isPositive: true, label: "vs last month" },
    destinations: { value: "2,550", trend: "+4.3%", isPositive: true, label: "vs last month" },
    activities: { value: "19,200", trend: "+9.1%", isPositive: true, label: "vs last month" }
  },
  '90D': {
    totalUsers: { value: "158,400", trend: "+24.5%", isPositive: true, label: "vs last quarter" },
    activeTrips: { value: "45,200", trend: "+18.2%", isPositive: true, label: "vs last quarter" },
    tripsCreated: { value: "89,500", trend: "+28.4%", isPositive: true, label: "vs last quarter" },
    publicTrips: { value: "24,100", trend: "+22.1%", isPositive: true, label: "vs last quarter" },
    destinations: { value: "2,800", trend: "+12.4%", isPositive: true, label: "vs last quarter" },
    activities: { value: "22,500", trend: "+15.8%", isPositive: true, label: "vs last quarter" }
  },
  '1Y': {
    totalUsers: { value: "245,000", trend: "+85.2%", isPositive: true, label: "vs last year" },
    activeTrips: { value: "125,000", trend: "+64.8%", isPositive: true, label: "vs last year" },
    tripsCreated: { value: "310,000", trend: "+92.1%", isPositive: true, label: "vs last year" },
    publicTrips: { value: "85,000", trend: "+78.4%", isPositive: true, label: "vs last year" },
    destinations: { value: "3,200", trend: "+45.2%", isPositive: true, label: "vs last year" },
    activities: { value: "28,400", trend: "+55.6%", isPositive: true, label: "vs last year" }
  }
};

export const userGrowthData = {
  '7D': [
    { name: 'Mon', newUsers: 800, activeUsers: 6200 },
    { name: 'Tue', newUsers: 950, activeUsers: 6800 },
    { name: 'Wed', newUsers: 1100, activeUsers: 7100 },
    { name: 'Thu', newUsers: 1050, activeUsers: 7500 },
    { name: 'Fri', newUsers: 1150, activeUsers: 7900 },
    { name: 'Sat', newUsers: 1200, activeUsers: 8200 },
    { name: 'Sun', newUsers: 1240, activeUsers: 8420 },
  ],
  '30D': [
    { name: 'Week 1', newUsers: 3200, activeUsers: 24000 },
    { name: 'Week 2', newUsers: 4100, activeUsers: 28000 },
    { name: 'Week 3', newUsers: 3900, activeUsers: 31000 },
    { name: 'Week 4', newUsers: 4500, activeUsers: 35000 },
  ],
  '90D': [
    { name: 'Month 1', newUsers: 12000, activeUsers: 85000 },
    { name: 'Month 2', newUsers: 15000, activeUsers: 110000 },
    { name: 'Month 3', newUsers: 18000, activeUsers: 135000 },
  ],
  '1Y': [
    { name: 'Q1', newUsers: 35000, activeUsers: 250000 },
    { name: 'Q2', newUsers: 42000, activeUsers: 310000 },
    { name: 'Q3', newUsers: 51000, activeUsers: 390000 },
    { name: 'Q4', newUsers: 60000, activeUsers: 480000 },
  ]
};

export const tripActivityData = {
  '7D': [
    { name: 'Mon', created: 300, completed: 150, shared: 80 },
    { name: 'Tue', created: 350, completed: 180, shared: 110 },
    { name: 'Wed', created: 400, completed: 200, shared: 130 },
    { name: 'Thu', created: 380, completed: 220, shared: 140 },
    { name: 'Fri', created: 420, completed: 210, shared: 160 },
    { name: 'Sat', created: 450, completed: 240, shared: 180 },
    { name: 'Sun', created: 480, completed: 260, shared: 210 },
  ],
  '30D': [
    { name: 'Week 1', created: 1500, completed: 800, shared: 400 },
    { name: 'Week 2', created: 1800, completed: 950, shared: 550 },
    { name: 'Week 3', created: 1700, completed: 900, shared: 500 },
    { name: 'Week 4', created: 2100, completed: 1100, shared: 700 },
  ],
  '90D': [
    { name: 'Month 1', created: 6000, completed: 3200, shared: 1800 },
    { name: 'Month 2', created: 7500, completed: 4100, shared: 2500 },
    { name: 'Month 3', created: 8200, completed: 4800, shared: 3100 },
  ],
  '1Y': [
    { name: 'Q1', created: 18000, completed: 9500, shared: 5000 },
    { name: 'Q2', created: 24000, completed: 13000, shared: 7500 },
    { name: 'Q3', created: 29000, completed: 16500, shared: 9200 },
    { name: 'Q4', created: 35000, completed: 21000, shared: 12500 },
  ]
};

export const platformHealth = {
  overall: 96,
  metrics: [
    { label: 'Users', value: 98 },
    { label: 'Trips', value: 94 },
    { label: 'Content', value: 97 },
    { label: 'Reports', value: 89 },
  ]
};
