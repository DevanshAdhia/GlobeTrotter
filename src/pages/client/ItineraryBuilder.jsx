import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useClient } from '../../context/ClientContext';
import { Calendar, MapPin, Plus, Clock, DollarSign, GripVertical, Check, ArrowLeft, ArrowRight } from 'lucide-react';

const ItineraryBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTrip, popularActivities } = useClient();
  const [trip, setTrip] = useState(null);
  const [days, setDays] = useState([{ id: 1, date: 'Day 1', activities: [] }]);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [activeDayForModal, setActiveDayForModal] = useState(null);

  useEffect(() => {
    const t = getTrip(id);
    if (t) setTrip(t);
  }, [id, getTrip]);

  if (!trip) return <div className="page-container flex-center" style={{ minHeight: '60vh' }}>Loading trip...</div>;

  const addDay = () => {
    setDays([...days, { id: days.length + 1, date: `Day ${days.length + 1}`, activities: [] }]);
  };

  const openAddActivity = (dayId) => {
    setActiveDayForModal(dayId);
    setShowActivityModal(true);
  };

  const addActivityToDay = (activity) => {
    setDays(days.map(d => {
      if (d.id === activeDayForModal) {
        return { ...d, activities: [...d.activities, activity] };
      }
      return d;
    }));
    setShowActivityModal(false);
  };

  return (
    <div className="page-container" style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', padding: '2rem' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => navigate('/trips')} className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }}>
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700 }}>{trip.trip} - Builder</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.875rem' }}>Drag and drop activities to plan your perfect days.</p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
          <button className="btn-secondary">Save Draft</button>
          <Link to={`/trips/${trip.id}`} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Preview Itinerary <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {days.map((day) => (
          <div key={day.id} className="card" style={{ padding: '2rem', borderTop: '4px solid var(--primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{day.date}</h3>
                <input type="text" placeholder="Add a city/location..." style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-primary)', fontSize: '0.875rem' }} />
              </div>
              <button className="btn-secondary" onClick={() => openAddActivity(day.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                <Plus size={16} /> Add Activity
              </button>
            </div>

            {day.activities.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', border: '2px dashed var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                No activities planned for this day yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {day.activities.map((act, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--background)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <GripVertical size={20} style={{ color: 'var(--text-muted)', cursor: 'grab' }} />
                    <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MapPin size={24} style={{ color: 'var(--primary)' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{act.activity}</h4>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{act.category} • {act.destination}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={16} /> 2 hours</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><DollarSign size={16} /> {act.estimated_cost || 'Free'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <button onClick={addDay} className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', border: '2px dashed var(--border)', background: 'transparent', color: 'var(--text-secondary)', transition: 'all 0.2s' }}>
          <Plus size={20} /> Add Another Day
        </button>
      </div>

      {/* Activity Modal */}
      {showActivityModal && (
        <>
          <div className="drawer-overlay" onClick={() => setShowActivityModal(false)}></div>
          <div className="itinerary-drawer" style={{ zIndex: 101, right: 0, left: 'auto', width: '400px' }}>
            <div className="drawer-header">
              <h3>Select Activity</h3>
              <button className="close-btn" onClick={() => setShowActivityModal(false)}>×</button>
            </div>
            <div className="drawer-content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {popularActivities.map(act => (
                <div key={act.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--surface)' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}>{act.activity}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{act.destination}</span>
                  </div>
                  <button onClick={() => addActivityToDay(act)} className="btn-primary" style={{ padding: '0.25rem', borderRadius: '50%' }}>
                    <Plus size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default ItineraryBuilder;
