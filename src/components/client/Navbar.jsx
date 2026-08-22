import { Link, NavLink } from 'react-router-dom';
import { useClient } from '../../context/ClientContext';
import { Compass, Map, User, Moon, Sun, Settings } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { isDarkMode, toggleTheme, currentUser } = useClient();

  return (
    <nav className="client-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🌍</span>
          <span className="brand-text">GlobeTrotter</span>
        </Link>
        
        <div className="navbar-links">
          <NavLink to="/discover" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <Compass size={18} /> Discover
          </NavLink>
          <NavLink to="/trips" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <Map size={18} /> My Trips
          </NavLink>
          <NavLink to="/community" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            Community
          </NavLink>
        </div>

        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <div className="user-menu">
            {currentUser ? (
              <>
                <Link to="/profile" className="user-avatar-btn">
                  <div className="navbar-avatar">{currentUser.avatar || currentUser.name?.charAt(0) || 'U'}</div>
                  <span className="navbar-username">{currentUser.name}</span>
                </Link>
                <Link to="/settings" className="settings-btn">
                  <Settings size={18} />
                </Link>
              </>
            ) : (
              <Link to="/login" className="btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '8px', textDecoration: 'none' }}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
