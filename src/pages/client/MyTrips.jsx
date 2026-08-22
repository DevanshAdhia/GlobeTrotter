import { useClient } from '../../context/ClientContext';
import { Link } from 'react-router-dom';
import { Map, Calendar, DollarSign, Plus } from 'lucide-react';

const MyTrips = () => {
  const { userTrips } = useClient();

  return (
    <div className="page-container" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>My Trips</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage your upcoming adventures and past memories.</p>
        </div>
        <Link to="/trips/new" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> New Trip
        </Link>
      </div>

      {userTrips.length === 0 ? (
        <div className="card flex-center" style={{ padding: '4rem', flexDirection: 'column', color: 'var(--text-muted)' }}>
          <Map size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <p style={{ fontSize: '1.125rem' }}>You haven't planned any trips yet.</p>
          <Link to="/trips/new" className="btn-primary" style={{ marginTop: '1.5rem' }}>Start Planning</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {userTrips.map(trip => (
            <div key={trip.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
              <div style={{ height: '140px', background: 'linear-gradient(135deg, var(--primary) 0%, #10b981 100%)', display: 'flex', alignItems: 'flex-end', padding: '1.5rem' }}>
                <h3 style={{ color: 'white', margin: 0, fontSize: '1.5rem', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{trip.trip}</h3>
              </div>
              
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  <Map size={16} /> {trip.destinations}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  <Calendar size={16} /> {trip.dates}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  <DollarSign size={16} /> Budget: {trip.budget}
                </div>
                
                <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)' }}>
                  <span className={`status-badge status-${trip.status.toLowerCase() === 'active' ? 'success' : 'warning'}`}>{trip.status}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link to={`/trips/${trip.id}/builder`} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Edit</Link>
                    <Link to={`/trips/${trip.id}`} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>View</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips;
