/* Sidebar — updated to use useNavigator */
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import useNavigator from '../../hooks/useNavigator';
import useToast from '../../hooks/useToast';
import { ROUTES } from '../../utils/constants';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { label: 'Dashboard',    path: ROUTES.DASHBOARD,    icon: '🏠' },
  { label: 'My Trips',     path: ROUTES.TRIPS,        icon: '✈️' },
  { label: 'Destinations', path: ROUTES.DESTINATIONS, icon: '🌍' },
  { label: 'Activities',   path: ROUTES.ACTIVITIES,   icon: '🎯' },
  { label: 'Community',    path: ROUTES.COMMUNITY,    icon: '🌐' },
  { label: 'Profile',      path: ROUTES.PROFILE,      icon: '👤' },
];

const Sidebar = ({ collapsed, onToggle }) => {
  const { user, logout } = useAuth();
  const { goTo } = useNavigator();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    toast.info('Logged out. See you next adventure! 👋');
    goTo(ROUTES.LOGIN, { replace: true });
  };

  const initials = (name = '') =>
    name.split(' ').slice(0, 2).map(w => w[0] || '').join('').toUpperCase() || '?';

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      {/* Logo / toggle */}
      <div
        className={styles.logo}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-label="Toggle sidebar"
        onKeyDown={e => e.key === 'Enter' && onToggle()}
      >
        <span className={styles['logo-icon']}>🌍</span>
        {!collapsed && <span className={styles['logo-text']}>GlobeTrotter</span>}
      </div>

      {/* Navigation */}
      <nav className={styles.nav} aria-label="Main navigation">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${styles['nav-item']} ${isActive ? styles['nav-item-active'] : ''}`
            }
            title={collapsed ? item.label : undefined}
          >
            <span className={styles['nav-icon']}>{item.icon}</span>
            {!collapsed && <span className={styles['nav-label']}>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className={styles.bottom}>
        {!collapsed && user && (
          <div className={styles.user}>
            <div className={styles.avatar}>
              {user.avatar
                ? <img src={user.avatar} alt={user.name} />
                : <span>{initials(user.name || user.email)}</span>
              }
            </div>
            <div className={styles['user-info']}>
              <span className={styles['user-name']}>{user.name || 'Traveler'}</span>
              <span className={styles['user-email']}>{user.email}</span>
            </div>
          </div>
        )}
        <button className={styles['logout-btn']} onClick={handleLogout} title="Logout">
          <span>🚪</span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
