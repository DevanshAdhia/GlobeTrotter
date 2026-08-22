import { useState } from 'react';
import { useClient } from '../../context/ClientContext';
import { Search, MapPin, Compass, Star } from 'lucide-react';

const Discover = () => {
  const { trendingDestinations, popularActivities } = useClient();
  const [activeTab, setActiveTab] = useState('destinations'); // destinations or activities
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = trendingDestinations.filter(d => 
    d.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredActivities = popularActivities.filter(a => 
    a.activity.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-container" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '2rem' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0', fontWeight: 800 }}>Explore the World</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Discover trending destinations and top-rated activities to build your perfect itinerary.
        </p>

        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
          <Search size={24} style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', padding: '1rem 1rem 1rem 4rem', fontSize: '1.125rem',
              borderRadius: '999px', border: '1px solid var(--border)', background: 'var(--surface)', 
              color: 'var(--text-primary)', boxShadow: 'var(--shadow-sm)'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          className={activeTab === 'destinations' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setActiveTab('destinations')}
          style={{ padding: '0.75rem 2rem', borderRadius: '999px' }}
        >
          <MapPin size={18} style={{ marginRight: '0.5rem', display: 'inline-block', verticalAlign: 'text-bottom' }} /> Destinations
        </button>
        <button 
          className={activeTab === 'activities' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setActiveTab('activities')}
          style={{ padding: '0.75rem 2rem', borderRadius: '999px' }}
        >
          <Compass size={18} style={{ marginRight: '0.5rem', display: 'inline-block', verticalAlign: 'text-bottom' }} /> Activities
        </button>
      </div>

      {activeTab === 'destinations' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {filteredDestinations.map(dest => (
            <div key={dest.id} className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ height: '200px', backgroundImage: `url(${dest.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', backdropFilter: 'blur(4px)' }}>
                  {dest.trend} Trending
                </div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem' }}>{dest.city}</h3>
                <p style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)' }}>{dest.country}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{dest.searches} searches</span>
                  <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Add to Trip</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'activities' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {filteredActivities.map(activity => (
            <div key={activity.id} className="card" style={{ padding: '1.5rem', border: 'none', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.05em' }}>{activity.category}</span>
                  <h3 style={{ margin: '0.25rem 0 0 0', fontSize: '1.125rem', lineHeight: 1.3 }}>{activity.activity}</h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'var(--warning)', color: '#000', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: 600 }}>
                  <Star size={14} fill="currentColor" /> {activity.rating}
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                <MapPin size={16} /> {activity.destination}
              </div>
              
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{activity.addedToTrips} saves</span>
                <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Add to Trip</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Discover;
