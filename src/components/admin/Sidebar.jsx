import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Map, 
  MapPin, 
  Activity, 
  Globe2, 
  BarChart3, 
  PieChart, 
  TrendingUp,
  Bell, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, toggleSidebar, isMobile, closeMobileSidebar }) => {
  const navGroups = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' }
      ]
    },
    {
      title: 'MANAGEMENT',
      items: [
        { label: 'Users', icon: <Users size={20} />, path: '/admin/users' },
        { label: 'Trips', icon: <Map size={20} />, path: '/admin/trips' },
        { label: 'Destinations', icon: <MapPin size={20} />, path: '/admin/destinations' },
        { label: 'Activities', icon: <Activity size={20} />, path: '/admin/activities' },
        { label: 'Public Trips', icon: <Globe2 size={20} />, path: '/admin/public-trips' },
        { label: 'Reports', icon: <ShieldAlert size={20} />, path: '/admin/reports' }
      ]
    },
    {
      title: 'ANALYTICS',
      items: [
        { label: 'Analytics', icon: <BarChart3 size={20} />, path: '/admin/analytics' },
        { label: 'Destinations Insights', icon: <PieChart size={20} />, path: '/admin/insights/destinations' },
        { label: 'Activity Insights', icon: <TrendingUp size={20} />, path: '/admin/insights/activities' }
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { label: 'Notifications', icon: <Bell size={20} />, path: '/admin/notifications' },
        { label: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' }
      ]
    }
  ];

  return (
    <>
      {isMobile && !isCollapsed && (
        <div className="sidebar-overlay" onClick={closeMobileSidebar} />
      )}
      <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}>
        <div className="sidebar-header">
          <div className="brand">
            <span className="brand-icon">🌍</span>
            {!isCollapsed && (
              <div className="brand-text">
                <h2>GlobeTrotter</h2>
                <span>Admin Console</span>
              </div>
            )}
          </div>
          {!isMobile && (
            <button className="collapse-toggle" onClick={toggleSidebar} aria-label="Toggle Sidebar">
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          {navGroups.map((group, idx) => (
            <div key={idx} className="nav-group">
              {!isCollapsed && <h3 className="nav-group-title">{group.title}</h3>}
              <ul className="nav-list">
                {group.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="nav-item">
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => `nav-link ${isActive && item.path === '/admin' ? 'active' : ''}`}
                      end={item.path === '/admin'}
                      title={isCollapsed ? item.label : undefined}
                      onClick={isMobile ? closeMobileSidebar : undefined}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      {!isCollapsed && <span className="nav-label">{item.label}</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="admin-profile">
            <div className="avatar">A</div>
            {!isCollapsed && (
              <div className="profile-info">
                <p className="profile-name">Admin</p>
                <p className="profile-role">Super Administrator</p>
              </div>
            )}
            {!isCollapsed && (
              <button className="logout-btn" title="Logout">
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
