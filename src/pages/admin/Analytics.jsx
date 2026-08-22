import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
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

  const travelTypeData = [
    { name: 'Solo', value: 38 },
    { name: 'Couple', value: 26 },
    { name: 'Friends', value: 21 },
    { name: 'Family', value: 12 },
    { name: 'Business', value: 3 },
  ];

  const COLORS = ['var(--primary)', 'var(--info)', 'var(--success)', 'var(--warning)', 'var(--danger)', '#8b5cf6'];

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
            <RechartsTooltip 
              contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: 'var(--radius-md)' }}
              itemStyle={{ color: 'var(--text-primary)' }}
            />
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {renderDonutChart('Most Popular Travel Styles', travelStyleData)}
        {renderDonutChart('Travel Types', travelTypeData)}
      </div>

      <ChartCard 
        title="User Retention (Cohort Analysis)" 
        data={userRetentionData}
        dataKeys={['retention']}
        colors={['var(--primary)']}
      />
    </div>
  );
};

export default Analytics;
