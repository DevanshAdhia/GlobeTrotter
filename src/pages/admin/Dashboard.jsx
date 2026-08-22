import { Users, Map, PlusCircle, Globe2, MapPin, Activity, Download } from 'lucide-react';
import KpiCard from '../../components/admin/KpiCard';
import ChartCard from '../../components/admin/ChartCard';
import DataTable from '../../components/admin/DataTable';
import ProgressBar from '../../components/admin/ProgressBar';

import { kpiData, userGrowthData, tripActivityData, platformHealth } from '../../data/analytics';
import { downloadCSV } from '../../utils/exportUtils';
import { useAdmin } from '../../context/AdminContext';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { dashboardMetrics, isLoading, users, trips, destinations, activities } = useAdmin();
  const [globalTimeframe, setGlobalTimeframe] = useState('30D');

  if (isLoading) {
    return <div className="dashboard-container flex-center" style={{ minHeight: '60vh' }}><h3>Loading Dashboard Data...</h3></div>;
  }

  const m = dashboardMetrics || {};

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getTrend = (value, defaultTrend) => {
    return (value === 0 || !value) ? '+0%' : defaultTrend;
  };

  const userColumns = [
    { 
      header: 'User', 
      accessor: 'name',
      render: (row) => {
        const initial = row.name ? row.name.charAt(0) : (row.email ? row.email.charAt(0) : 'U');
        return (
          <div className="table-user-cell">
            <div className="table-avatar">{row.profile_photo || initial.toUpperCase()}</div>
            <div className="table-user-info">
              <span className="table-user-name">{row.name || 'Unnamed User'}</span>
              <span className="table-user-email">{row.email}</span>
            </div>
          </div>
        );
      }
    },
    { header: 'Role', accessor: 'role' },
    { header: 'Status', render: (row) => <span className={`status-badge ${row.is_active ? 'status-success' : 'status-danger'}`}>{row.is_active ? 'Active' : 'Inactive'}</span> }
  ];

  const tripColumns = [
    { 
      header: 'Trip', 
      accessor: 'name',
      render: (row) => (
        <div>
          <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{row.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{row.stops?.length || 0} stops</div>
        </div>
      )
    },
    { header: 'Owner ID', accessor: 'user_id' },
    { header: 'Dates', render: (row) => <span>{row.start_date} to {row.end_date}</span> },
    { header: 'Budget', render: (row) => <span>{row.currency} {row.total_budget || 0}</span> },
    { header: 'Status', accessor: 'status', isStatus: true }
  ];

  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <h2>{getGreeting()}, Admin 👋</h2>
          <p>Here's what's happening across GlobeTrotter today.</p>
        </div>
        <div className="hero-actions">
          <select 
            className="date-filter" 
            value={globalTimeframe}
            onChange={(e) => setGlobalTimeframe(e.target.value)}
          >
            <option value="7D">Last 7 Days</option>
            <option value="30D">Last 30 Days</option>
            <option value="90D">Last 90 Days</option>
            <option value="1Y">Last Year</option>
          </select>
          <button className="btn-primary flex-center gap-sm" onClick={() => {
            const reportData = [
              { Metric: 'Total Users', Value: m.total_users },
              { Metric: 'Total Trips', Value: m.total_trips },
              { Metric: 'Total Cities', Value: m.total_cities }
            ];
            downloadCSV(reportData, 'kpi_report');
          }}>
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="kpi-grid">
        <KpiCard 
          title="Total Users" 
          value={m.total_users || 0} 
          trend={getTrend(m.total_users, '+5%')}
          isPositive={true}
          icon={Users} 
        />
        <KpiCard 
          title="Active Users" 
          value={m.active_users || 0} 
          trend={getTrend(m.active_users, '+2%')}
          isPositive={true}
          icon={Map} 
        />
        <KpiCard 
          title="Total Trips" 
          value={m.total_trips || 0} 
          trend={getTrend(m.total_trips, '+12%')}
          isPositive={true}
          icon={PlusCircle} 
        />
        <KpiCard 
          title="Published Trips" 
          value={m.published_trips || 0} 
          trend={getTrend(m.published_trips, '+8%')}
          isPositive={true}
          icon={Globe2} 
        />
        <KpiCard 
          title="Destinations" 
          value={m.total_cities || 0} 
          trend={getTrend(m.total_cities, '+5%')}
          isPositive={true}
          icon={MapPin} 
        />
        <KpiCard 
          title="Activities" 
          value={m.total_activities || 0} 
          trend={getTrend(m.total_activities, '+3%')}
          isPositive={true}
          icon={Activity} 
        />
      </div>

      {/* Analytics Charts Row */}
      <div className="charts-grid">
        <ChartCard 
          title="User Growth" 
          data={userGrowthData} 
          dataKeys={['activeUsers', 'newUsers']} 
          colors={['var(--primary)', 'var(--success)']}
          defaultTimeframe={globalTimeframe}
        />
        <ChartCard 
          title="Trip Activity" 
          data={tripActivityData} 
          dataKeys={['created', 'completed']} 
          colors={['var(--info)', 'var(--warning)']}
          defaultTimeframe={globalTimeframe}
        />
      </div>

      {/* Trends Row */}
      <div className="trends-grid">
        <div className="card trending-destinations">
          <div className="card-header">
            <h3>Trending Destinations</h3>
            <button className="btn-secondary" onClick={() => navigate('/admin/destinations')}>View All</button>
          </div>
          <div className="destinations-list">
            {destinations.slice(0, 5).map((dest, idx) => (
              <div key={dest.id} className="destination-item">
                <span className="dest-rank">{String(idx + 1).padStart(2, '0')}</span>
                <img src={dest.image || 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80'} alt={dest.name} className="dest-image" />
                <div className="dest-info">
                  <h4>{dest.name}</h4>
                  <span>{dest.country}</span>
                </div>
                <div className="dest-stats">
                  <div className="dest-searches">{dest.popularity_score || 'N/A'} searches</div>
                  <div className="dest-trend positive">+5%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="popular-activities">
          <DataTable 
            title="Popular Activities"
            columns={[
              { header: 'Activity', accessor: 'name', render: (row) => <strong style={{ color: 'var(--text-primary)' }}>{row.name}</strong> },
              { header: 'Destination ID', accessor: 'city_id' },
              { header: 'Price', render: (row) => <span>{row.currency || '$'} {row.price || '0'}</span> },
              { header: 'Rating', accessor: 'rating', render: (row) => <span>⭐ {row.rating || 'N/A'}</span> }
            ]}
            data={activities.slice(0, 5)}
            onViewAll={() => navigate('/admin/activities')}
          />
        </div>
      </div>

      {/* Recent Activity Row */}
      <div className="recent-grid">
        <DataTable 
          title="Recent Users"
          columns={userColumns}
          data={users.slice(0, 5)}
          onViewAll={() => navigate('/admin/users')}
        />
        <div className="card health-widget">
          <div className="card-header">
            <h3>Platform Health</h3>
          </div>
          <div className="health-content">
            <div className="overall-health">
              <div className="health-score">{platformHealth.overall}%</div>
              <div className="health-label">Overall Healthy</div>
            </div>
            <div className="health-bars">
              {platformHealth.metrics.map((metric, idx) => (
                <ProgressBar 
                  key={idx} 
                  label={metric.label} 
                  percentage={metric.value} 
                  color={metric.value > 90 ? 'var(--success)' : metric.value > 70 ? 'var(--warning)' : 'var(--danger)'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="full-width-table">
        <DataTable 
          title="Recent Trips"
          columns={tripColumns}
          data={trips.slice(0, 5)}
          onViewAll={() => navigate('/admin/trips')}
        />
      </div>

    </div>
  );
};

export default Dashboard;
