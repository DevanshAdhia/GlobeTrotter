import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, Moon, Sun, HelpCircle } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import './Topbar.css';

const Topbar = ({ toggleMobileSidebar, openCommandPalette, pageTitle = "Dashboard", breadcrumbs = ["Overview", "Platform Performance"] }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();
  const { notifications } = useAdmin();
  const unreadCount = notifications ? notifications.filter(n => !n.read).length : 0;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <button className="mobile-menu-btn" onClick={toggleMobileSidebar} aria-label="Open Menu">
          <Menu size={20} />
        </button>
        
        <div className="page-header">
          <div className="breadcrumbs">
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="breadcrumb-item">
                {crumb}
                {idx < breadcrumbs.length - 1 && <span className="breadcrumb-separator">/</span>}
              </span>
            ))}
          </div>
          <h1 className="page-title">{pageTitle}</h1>
        </div>
      </div>

      <div className="topbar-right">
        <div className="search-container" onClick={openCommandPalette} style={{ cursor: 'pointer' }}>
          <Search size={16} className="search-icon" />
          <div className="search-input" style={{ flex: 1, color: 'var(--text-muted)' }}>
            Search users, trips, destinations...
          </div>
          <div className="search-shortcut">⌘K</div>
        </div>

        <div className="topbar-actions">
          <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          <button className="icon-btn" title="Help" onClick={() => alert('Help center coming soon!')}>
            <HelpCircle size={18} />
          </button>
          
          <button className="icon-btn notification-btn" title="Notifications" onClick={() => navigate('/admin/notifications')}>
            <Bell size={18} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>
          
          <div className="topbar-profile" onClick={() => navigate('/admin/settings')} style={{ cursor: 'pointer' }} title="Settings">
            <div className="avatar small">A</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
