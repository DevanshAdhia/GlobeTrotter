import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { ArrowLeft, MapPin, Calendar, DollarSign, Users, Eye, Trash2, Edit } from 'lucide-react';
import Modal from '../../components/admin/Modal';
import './TripDetails.css';

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trips, updateTripStatus, editTrip, deleteTrip } = useAdmin();
  const [showItinerary, setShowItinerary] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ trip: '', destinations: '', dates: '', budget: '' });
  
  const trip = trips.find(t => t.id === parseInt(id));

  if (!trip) {
    return (
      <div className="page-container">
        <h2>Trip not found</h2>
        <button className="btn-secondary" onClick={() => navigate('/admin/trips')}>Back to Trips</button>
      </div>
    );
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      await deleteTrip(trip.id);
      navigate('/admin/trips');
    }
  };

  const handleOpenEdit = () => {
    setEditFormData({ 
      trip: trip.trip, 
      destinations: trip.destinations, 
      dates: trip.dates, 
      budget: trip.budget 
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await editTrip(trip.id, editFormData);
    setIsEditModalOpen(false);
  };

  // Mock Itinerary Data for the drawer
  const itineraryDays = [
    {
      day: 1,
      location: trip.destinations.split(' → ')[0] || "City 1",
      events: [
        { time: "09:00", title: "Breakfast at local cafe" },
        { time: "11:00", title: "City sightseeing tour" },
        { time: "14:00", title: "Museum visit" },
        { time: "19:00", title: "Dinner" }
      ]
    },
    {
      day: 2,
      location: trip.destinations.split(' → ')[1] || trip.destinations.split(' → ')[0],
      events: [
        { time: "08:00", title: "Train departure" },
        { time: "12:00", title: "Hotel check-in" },
        { time: "15:00", title: "Shopping district" },
      ]
    }
  ];

  return (
    <div className="page-container position-relative">
      <div className="breadcrumb-nav">
        <button className="btn-icon-text" onClick={() => navigate('/admin/trips')}>
          <ArrowLeft size={16} /> Back to Trips
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', position: 'relative' }}>
        <div style={{
          height: '350px',
          width: '100%',
          background: 'linear-gradient(135deg, #2563eb 0%, #10b981 100%)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)'
          }}></div>
          
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '2.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1.5rem',
            color: 'white'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span className={`status-badge`} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                  {trip.status}
                </span>
                <span style={{ opacity: 0.9, fontSize: '0.875rem' }}><Users size={14} style={{display:'inline', verticalAlign:'middle'}}/> {trip.owner}</span>
              </div>
              <h2 style={{ fontSize: '3rem', margin: '0 0 0.5rem 0', fontWeight: 700, letterSpacing: '-0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                {trip.trip}
              </h2>
              <div style={{ display: 'flex', gap: '1.5rem', opacity: 0.9, fontSize: '1rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> {trip.destinations}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} /> {trip.dates || 'Unscheduled'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', padding: '1rem 1.5rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{trip.budget || 'N/A'}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}><DollarSign size={12}/> Budget</div>
              </div>
              <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.2)' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>3</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}><Users size={12}/> Members</div>
              </div>
              <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.2)' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>124</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}><Eye size={12}/> Views</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '1.5rem 2.5rem', display: 'flex', gap: '1rem', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
          <button className="btn-primary" onClick={() => setShowItinerary(true)}>Preview Itinerary</button>
          <div style={{ flex: 1 }}></div>
          <button className="btn-secondary flex-center gap-sm" onClick={handleOpenEdit}><Edit size={16}/> Edit</button>
          <button className="btn-secondary flex-center gap-sm" onClick={() => updateTripStatus(trip.id, trip.visibility === 'Public' ? 'Private' : 'Public')}>
            Make {trip.visibility === 'Public' ? 'Private' : 'Public'}
          </button>
          <button className="btn-danger flex-center gap-sm" onClick={handleDelete}><Trash2 size={16} /> Delete</button>
        </div>
      </div>

      {/* Itinerary Drawer (Mock overlay) */}
      {showItinerary && (
        <>
          <div className="drawer-overlay" onClick={() => setShowItinerary(false)}></div>
          <div className="itinerary-drawer">
            <div className="drawer-header">
              <h3>Itinerary Preview</h3>
              <button className="close-btn" onClick={() => setShowItinerary(false)}>×</button>
            </div>
            <div className="drawer-content">
              {itineraryDays.map((day, idx) => (
                <div key={idx} className="itinerary-day">
                  <div className="day-header">
                    <h4>Day {day.day}</h4>
                    <span>{day.location}</span>
                  </div>
                  <div className="day-events">
                    {day.events.map((event, eIdx) => (
                      <div key={eIdx} className="event-item">
                        <span className="event-time">{event.time}</span>
                        <span className="event-title">{event.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Trip">
        <form onSubmit={handleEditSubmit}>
          <div className="form-group">
            <label>Trip Name</label>
            <input type="text" value={editFormData.trip} onChange={e => setEditFormData({...editFormData, trip: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Destinations</label>
            <input type="text" value={editFormData.destinations} onChange={e => setEditFormData({...editFormData, destinations: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Dates</label>
            <input type="text" value={editFormData.dates} onChange={e => setEditFormData({...editFormData, dates: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Budget</label>
            <input type="text" value={editFormData.budget} onChange={e => setEditFormData({...editFormData, budget: e.target.value})} />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TripDetails;
