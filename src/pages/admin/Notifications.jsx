import { useAdmin } from '../../context/AdminContext';
import { AlertCircle, TrendingUp, UserPlus, Flame } from 'lucide-react';

const Notifications = () => {
  const { notifications, markNotificationRead } = useAdmin();

  const getIcon = (type) => {
    switch(type) {
      case 'alert': return <AlertCircle size={20} style={{ color: 'var(--danger)' }} />;
      case 'trend': return <TrendingUp size={20} style={{ color: 'var(--info)' }} />;
      case 'user': return <UserPlus size={20} style={{ color: 'var(--success)' }} />;
      case 'fire': return <Flame size={20} style={{ color: 'var(--warning)' }} />;
      default: return <AlertCircle size={20} />;
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2>Notifications</h2>
          <p className="page-subtitle">System alerts and platform updates.</p>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {notifications.map((n) => (
          <div 
            key={n.id} 
            style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '1rem', 
              padding: '1.5rem', 
              borderBottom: '1px solid var(--border)',
              backgroundColor: n.read ? 'transparent' : 'rgba(37, 99, 235, 0.05)',
              cursor: 'pointer'
            }}
            onClick={() => !n.read && markNotificationRead(n.id)}
          >
            <div style={{ backgroundColor: 'var(--surface)', padding: '0.75rem', borderRadius: '50%', boxShadow: 'var(--shadow-sm)' }}>
              {getIcon(n.icon)}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 0.25rem 0', fontWeight: n.read ? 500 : 600, color: 'var(--text-primary)' }}>{n.text}</p>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{n.time}</span>
            </div>
            {!n.read && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
