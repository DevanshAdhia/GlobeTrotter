import { PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '../../components/admin/ChartCard';

const Analytics = () => {
  // Mock data for extended analytics
  const userRetentionData = [
    { name: 'Month 1', retention: 100 },
    { name: 'Month 2', retention: 75 },
    { name: 'Month 3', retention: 60 },
    { name: 'Month 4', retention: 50 },
    { name: 'Month 5', retention: 45 },
    { name: 'Month 6', retention: 40 },
  ];

  const travelStyleData = [
    { name: 'Adventure', value: 32 },
    { name: 'Culture', value: 24 },
    { name: 'Food', value: 18 },
    { name: 'Nature', value: 14 },
    { name: 'Luxury', value: 7 },
    { name: 'Shopping', value: 5 },
  ];

  const tripsCreatedData = [
    { month: 'Jan', created: 120, completed: 90 },
    { month: 'Feb', created: 150, completed: 110 },
    { month: 'Mar', created: 280, completed: 190 },
    { month: 'Apr', created: 350, completed: 250 },
    { month: 'May', created: 480, completed: 320 },
    { month: 'Jun', created: 520, completed: 410 },
  ];

  const cityEngagementData = [
    { city: 'Goa', engagement: 95 },
    { city: 'Jaipur', engagement: 82 },
    { city: 'Kerala', engagement: 78 },
    { city: 'Manali', engagement: 70 },
    { city: 'Udaipur', engagement: 65 },
  ];

  const formatYAxis = (tickItem) => {
    if (tickItem >= 1000000) return (tickItem / 1000000).toFixed(1) + 'M';
    if (tickItem >= 1000) return (tickItem / 1000).toFixed(0) + 'k';
    return tickItem;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-chart-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="tooltip-item">
              <div className="tooltip-color-indicator" style={{ backgroundColor: entry.color || entry.payload.fill || 'var(--primary)' }}></div>
              <span className="tooltip-name">{entry.name}:</span>
              <span className="tooltip-value">{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderDonutChart = (title, data) => (
    <div className="card">
      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>{title}</h3>
      <div style={{ height: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <RechartsTooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
        {data.map((entry, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLORS[index % COLORS.length] }}></span>
            {entry.name} ({entry.value}%)
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2>Platform Analytics</h2>
          <p className="page-subtitle">Deep dive into user behavior and travel trends.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Trips Created vs Completed</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tripsCreatedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatYAxis} width={35} />
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '3 3' }} />
                <Area type="monotone" dataKey="created" stroke="var(--primary)" fillOpacity={1} fill="url(#colorCreated)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Top Cities Engagement</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityEngagementData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="city" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatYAxis} width={35} />
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <RechartsTooltip content={<CustomTooltip />} cursor={{fill: 'var(--background)'}} />
                <Bar dataKey="engagement" fill="var(--info)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {renderDonutChart('Most Popular Travel Styles', travelStyleData)}
        <ChartCard 
          title="User Retention (Cohort Analysis)" 
          data={userRetentionData}
          dataKeys={['retention']}
          colors={['var(--success)']}
        />
      </div>
    </div>
  );
};

export default Analytics;
