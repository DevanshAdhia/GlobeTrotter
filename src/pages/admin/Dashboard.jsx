import { Users, Map, PlusCircle, Globe2, MapPin, Activity, Download } from 'lucide-react';
import KpiCard from '../../components/admin/KpiCard';
import ChartCard from '../../components/admin/ChartCard';
import DataTable from '../../components/admin/DataTable';
import ProgressBar from '../../components/admin/ProgressBar';

import { kpiData, userGrowthData, tripActivityData, platformHealth } from '../../data/analytics';
import { trendingDestinations } from '../../data/destinations';
import { popularActivities } from '../../data/activities';
import { recentUsers } from '../../data/users';
import { recentTrips } from '../../data/trips';
import { downloadCSV } from '../../utils/exportUtils';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [globalTimeframe, setGlobalTimeframe] = useState('30D');

  const currentKpis = kpiData[globalTimeframe] || kpiData['30D'];

  const userColumns = [
    { 
      header: 'User', 
      accessor: 'user',
      render: (row) => (
        <div className="table-user-cell">
          <div className="table-avatar">{row.avatar}</div>
          <div className="table-user-info">
            <span className="table-user-name">{row.user}</span>
            <span className="table-user-email">{row.email}</span>
          </div>
        </div>
      )
    },
    { header: 'Joined', accessor: 'joined' },
    { header: 'Trips', accessor: 'trips' },
    { header: 'Status', accessor: 'status', isStatus: true }
  ];

  const tripColumns = [
    { 
      header: 'Trip', 
      accessor: 'trip',
      render: (row) => (
        <div>
          <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{row.trip}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{row.destinations}</div>
        </div>
      )
    },
    { header: 'Owner', accessor: 'owner' },
    { header: 'Dates', accessor: 'dates' },
    { header: 'Budget', accessor: 'budget' },
    { header: 'Visibility', accessor: 'visibility' },
    { header: 'Status', accessor: 'status', isStatus: true }
  ];

  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <h2>Good morning, Admin 👋</h2>
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
            const reportData = Object.entries(currentKpis).map(([key, data]) => ({
              Metric: data.label || key,
              Value: data.value,
              Trend: data.trend
            }));
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
          value={currentKpis.totalUsers.value} 
          trend={currentKpis.totalUsers.trend}
          isPositive={currentKpis.totalUsers.isPositive}
          label={currentKpis.totalUsers.label}
          icon={Users} 
        />
        <KpiCard 
          title="Active Trips" 
          value={currentKpis.activeTrips.value} 
          trend={currentKpis.activeTrips.trend}
          isPositive={currentKpis.activeTrips.isPositive}
          label={currentKpis.activeTrips.label}
          icon={Map} 
        />
        <KpiCard 
          title="Trips Created" 
          value={currentKpis.tripsCreated.value} 
          trend={currentKpis.tripsCreated.trend}
          isPositive={currentKpis.tripsCreated.isPositive}
          label={currentKpis.tripsCreated.label}
          icon={PlusCircle} 
        />
        <KpiCard 
          title="Public Trips" 
          value={currentKpis.publicTrips.value} 
          trend={currentKpis.publicTrips.trend}
          isPositive={currentKpis.publicTrips.isPositive}
          label={currentKpis.publicTrips.label}
          icon={Globe2} 
        />
        <KpiCard 
          title="Destinations" 
          value={currentKpis.destinations.value} 
          trend={currentKpis.destinations.trend}
          isPositive={currentKpis.destinations.isPositive}
          label={currentKpis.destinations.label}
          icon={MapPin} 
        />
        <KpiCard 
          title="Activities" 
          value={currentKpis.activities.value} 
          trend={currentKpis.activities.trend}
          isPositive={currentKpis.activities.isPositive}
          label={currentKpis.activities.label}
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
            {trendingDestinations.map((dest, idx) => (
              <div key={dest.id} className="destination-item">
                <span className="dest-rank">{String(idx + 1).padStart(2, '0')}</span>
                <img src={dest.image} alt={dest.city} className="dest-image" />
                <div className="dest-info">
                  <h4>{dest.city}</h4>
                  <span>{dest.country}</span>
                </div>
                <div className="dest-stats">
                  <div className="dest-searches">{dest.searches} searches</div>
                  <div className="dest-trend positive">{dest.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="popular-activities">
          <DataTable 
            title="Popular Activities"
            columns={[
              { header: 'Activity', accessor: 'activity', render: (row) => <strong style={{ color: 'var(--text-primary)' }}>{row.activity}</strong> },
              { header: 'Destination', accessor: 'destination' },
              { header: 'Searches', accessor: 'searches' },
              { header: 'Rating', accessor: 'rating', render: (row) => <span>⭐ {row.rating}</span> }
            ]}
            data={popularActivities}
            onViewAll={() => navigate('/admin/activities')}
          />
        </div>
      </div>

      {/* Recent Activity Row */}
      <div className="recent-grid">
        <DataTable 
          title="Recent Users"
          columns={userColumns}
          data={recentUsers}
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
          data={recentTrips}
          onViewAll={() => navigate('/admin/trips')}
        />
      </div>

    </div>
  );
};

export default Dashboard;
