import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useClient } from '../../context/ClientContext';
import { Map, Calendar, DollarSign, Share2, Edit2, MapPin, Users } from 'lucide-react';

const ClientTripDetails = () => {
  const { id } = useParams();
  const { getTrip } = useClient();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const t = getTrip(id);
    if (t) setTrip(t);
  }, [id, getTrip]);

  if (!trip) return <div className="page-container flex-center" style={{ minHeight: '60vh' }}>Loading trip...</div>;

  return (
    <div className="page-container" style={{ padding: 0 }}>
      {/* Hero */}
      <div style={{ height: '400px', background: 'linear-gradient(135deg, var(--primary) 0%, #10b981 100%)', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '3rem', color: 'white' }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <span style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 600, display: 'inline-block', marginBottom: '1rem' }}>
                {trip.status}
              </span>
              <h1 style={{ fontSize: '3rem', margin: '0 0 0.5rem 0', fontWeight: 800, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{trip.trip}</h1>
              <div style={{ display: 'flex', gap: '1.5rem', opacity: 0.9 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Map size={18} /> {trip.destinations}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={18} /> {trip.dates}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-secondary" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)' }}>
                <Share2 size={18} style={{ marginRight: '0.5rem' }} /> Share
              </button>
              <Link to={`/trips/${trip.id}/builder`} className="btn-primary" style={{ background: 'white', color: 'var(--text-primary)' }}>
                <Edit2 size={18} style={{ marginRight: '0.5rem' }} /> Edit Itinerary
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '3rem 2rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
        
        {/* Left Column - Itinerary View */}
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Itinerary Overview</h2>
          <div className="card" style={{ padding: '2rem' }}>
            {/* Mock Timeline */}
            <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid var(--border)' }}>
              <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
                <div style={{ position: 'absolute', left: '-2.6rem', top: '0', width: '1rem', height: '1rem', borderRadius: '50%', background: 'var(--primary)', border: '4px solid var(--surface)' }}></div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>Day 1 - Arrival</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Settle into the hotel and explore the local neighborhood.</p>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-2.6rem', top: '0', width: '1rem', height: '1rem', borderRadius: '50%', background: 'var(--border)', border: '4px solid var(--surface)' }}></div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>Day 2 - Sightseeing</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Full day tour of the main attractions.</p>
                <div style={{ marginTop: '1rem', background: 'var(--background)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600 }}><MapPin size={16} className="text-primary" /> Core Activities planned</div>
                  <Link to={`/trips/${trip.id}/builder`} style={{ fontSize: '0.875rem', color: 'var(--primary)' }}>View full details in builder →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Budget & Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <DollarSign size={18} /> Budget Summary
            </h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{trip.budget}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Estimated total</span>
            </div>
            
            {/* Mini Progress Bar */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                <span>Spent</span>
                <span>Remaining</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '40%', height: '100%', background: 'var(--primary)' }}></div>
              </div>
            </div>

            <button className="btn-secondary" style={{ width: '100%' }}>View Detailed Breakdown</button>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={18} /> Travelers
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                {trip.owner.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>{trip.owner}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Trip Organizer</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClientTripDetails;
