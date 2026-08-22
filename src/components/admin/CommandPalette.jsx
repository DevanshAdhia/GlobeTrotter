import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Map, Users as UsersIcon, MapPin, Activity, ShieldAlert, BarChart3, Settings } from 'lucide-react';
import './CommandPalette.css';

const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Handle keyboard shortcut to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent body scrolling when open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    { id: 1, label: 'Go to Dashboard', icon: <BarChart3 size={16} />, path: '/admin' },
    { id: 2, label: 'Search Users', icon: <UsersIcon size={16} />, path: '/admin/users' },
    { id: 3, label: 'Search Trips', icon: <Map size={16} />, path: '/admin/trips' },
    { id: 4, label: 'Manage Destinations', icon: <MapPin size={16} />, path: '/admin/destinations' },
    { id: 5, label: 'Manage Activities', icon: <Activity size={16} />, path: '/admin/activities' },
    { id: 6, label: 'Review Moderation Queue', icon: <ShieldAlert size={16} />, path: '/admin/reports' },
    { id: 7, label: 'Open Settings', icon: <Settings size={16} />, path: '/admin/settings' },
  ];

  const filteredCommands = commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (path) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  return (
    <div className="palette-overlay" onClick={onClose}>
      <div className="palette-modal" onClick={e => e.stopPropagation()}>
        <div className="palette-search">
          <Search size={20} className="palette-icon" />
          <input 
            type="text" 
            placeholder="What do you need? (e.g., 'Search users')" 
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          <button className="palette-esc" onClick={onClose}>ESC</button>
        </div>
        
        <div className="palette-results">
          {filteredCommands.length > 0 ? (
            <div className="palette-group">
              <span className="palette-group-title">Navigation Commands</span>
              {filteredCommands.map(cmd => (
                <div key={cmd.id} className="palette-item" onClick={() => handleSelect(cmd.path)}>
                  <div className="palette-item-icon">{cmd.icon}</div>
                  <span className="palette-item-label">{cmd.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="palette-empty">No results found for "{query}"</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
