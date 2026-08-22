import { useClient } from '../../context/ClientContext';
import { ArrowRight, Compass, Map, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { currentUser, userTrips, trendingDestinations } = useClient();

  return (
    <div className="client-home" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      
      {/* Hero */}
      <div className="card" style={{ 
        position: 'relative', overflow: 'hidden', padding: '4rem 3rem',
        background: 'linear-gradient(135deg, var(--primary) 0%, #10b981 100%)',
        color: 'white', border: 'none', marginBottom: '3rem'
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
          <h1 style={{ fontSize: '3.5rem', margin: '0 0 1rem 0', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Where to next, {currentUser.name}?
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2rem' }}>
            Plan, organize, and track your next adventure with GlobeTrotter's intelligent itinerary builder.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/trips/new" className="btn-primary flex-center gap-sm" style={{ background: 'white', color: 'var(--text-primary)', fontSize: '1rem', padding: '0.75rem 1.5rem' }}>
              <Plus size={18} /> Plan a New Trip
            </Link>
            <Link to="/discover" className="btn-secondary flex-center gap-sm" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)', fontSize: '1rem', padding: '0.75rem 1.5rem' }}>
              <Compass size={18} /> Get Inspired
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Trips */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Your Trips</h2>
          <Link to="/trips" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: 600 }}>
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        {userTrips.length === 0 ? (
          <div className="card flex-center" style={{ padding: '3rem', flexDirection: 'column', color: 'var(--text-muted)' }}>
            <Map size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>You haven't planned any trips yet.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {userTrips.slice(0, 3).map(trip => (
              <div key={trip.id} className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem 0' }}>{trip.trip}</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{trip.destinations}</p>
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className={`status-badge status-${trip.status.toLowerCase() === 'active' ? 'success' : 'warning'}`}>{trip.status}</span>
                  <Link to={`/trips/${trip.id}`} className="btn-secondary">View Trip</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trending Destinations */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Trending Destinations</h2>
          <Link to="/discover" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: 600 }}>
            Explore More <ArrowRight size={16} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {trendingDestinations.slice(0, 4).map(dest => (
            <div key={dest.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ height: '150px', backgroundImage: `url(${dest.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <div style={{ padding: '1rem' }}>
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{dest.city}</h4>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{dest.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Home;
