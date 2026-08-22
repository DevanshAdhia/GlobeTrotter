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

import './Dashboard.css';

const Dashboard = () => {
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
          <select className="date-filter">
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Custom</option>
          </select>
          <button className="btn-primary flex-center gap-sm" onClick={() => {
            const reportData = Object.entries(kpiData).map(([key, data]) => ({
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
          value={kpiData.totalUsers.value} 
          trend={kpiData.totalUsers.trend}
          isPositive={kpiData.totalUsers.isPositive}
          label={kpiData.totalUsers.label}
          icon={Users} 
        />
        <KpiCard 
          title="Active Trips" 
          value={kpiData.activeTrips.value} 
          trend={kpiData.activeTrips.trend}
          isPositive={kpiData.activeTrips.isPositive}
          label={kpiData.activeTrips.label}
          icon={Map} 
        />
        <KpiCard 
          title="Trips Created" 
          value={kpiData.tripsCreated.value} 
          trend={kpiData.tripsCreated.trend}
          isPositive={kpiData.tripsCreated.isPositive}
          label={kpiData.tripsCreated.label}
          icon={PlusCircle} 
        />
        <KpiCard 
          title="Public Trips" 
          value={kpiData.publicTrips.value} 
          trend={kpiData.publicTrips.trend}
          isPositive={kpiData.publicTrips.isPositive}
          label={kpiData.publicTrips.label}
          icon={Globe2} 
        />
        <KpiCard 
          title="Destinations" 
          value={kpiData.destinations.value} 
          trend={kpiData.destinations.trend}
          isPositive={kpiData.destinations.isPositive}
          label={kpiData.destinations.label}
          icon={MapPin} 
        />
        <KpiCard 
          title="Activities" 
          value={kpiData.activities.value} 
          trend={kpiData.activities.trend}
          isPositive={kpiData.activities.isPositive}
          label={kpiData.activities.label}
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
        />
        <ChartCard 
          title="Trip Activity" 
          data={tripActivityData} 
          dataKeys={['created', 'completed']} 
          colors={['var(--info)', 'var(--warning)']}
        />
      </div>

      {/* Trends Row */}
      <div className="trends-grid">
        <div className="card trending-destinations">
          <div className="card-header">
            <h3>Trending Destinations</h3>
            <button className="btn-secondary">View All</button>
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
          />
        </div>
      </div>

      {/* Recent Activity Row */}
      <div className="recent-grid">
        <DataTable 
          title="Recent Users"
          columns={userColumns}
          data={recentUsers}
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
        />
      </div>

    </div>
  );
};

export default Dashboard;
