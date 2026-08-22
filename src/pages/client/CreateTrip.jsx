import { useState } from 'react';
import { useClient } from '../../context/ClientContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, FileText } from 'lucide-react';

const CreateTrip = () => {
  const { createTrip } = useClient();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    trip: '',
    dates: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.trip) return;
    
    const newTripId = await createTrip(formData);
    // After creating, redirect to the itinerary builder
    navigate(`/trips/${newTripId}/builder`);
  };

  return (
    <div className="page-container" style={{ maxWidth: '800px', margin: '3rem auto' }}>
      <div className="card" style={{ padding: '3rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 700 }}>Plan a New Trip</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Let's get started on your next big adventure.</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Trip Name</label>
            <div style={{ position: 'relative' }}>
              <MapPin size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="e.g. Summer in Europe, Backpacking Asia"
                value={formData.trip}
                onChange={e => setFormData({...formData, trip: e.target.value})}
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-primary)' }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Travel Dates (Optional)</label>
            <div style={{ position: 'relative' }}>
              <Calendar size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="e.g. Oct 15 - Oct 25"
                value={formData.dates}
                onChange={e => setFormData({...formData, dates: e.target.value})}
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Description (Optional)</label>
            <div style={{ position: 'relative' }}>
              <FileText size={20} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-muted)' }} />
              <textarea 
                placeholder="What's the vibe of this trip?"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-primary)', minHeight: '120px', resize: 'vertical' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={() => navigate(-1)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary" disabled={!formData.trip}>Start Building Itinerary</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTrip;
