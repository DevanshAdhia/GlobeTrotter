import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import ChartCard from '../../components/admin/ChartCard';
import Modal from '../../components/admin/Modal';

const ActivityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activities, editActivity, deleteActivity } = useAdmin();
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ activity: '', category: '', destination: '' });

  const act = activities.find(a => a.id === parseInt(id));

  if (!act) return <div className="page-container"><h2>Not found</h2></div>;

  const mockChartData = [
    { name: 'Week 1', views: 800, added: 200 },
    { name: 'Week 2', views: 1200, added: 450 },
    { name: 'Week 3', views: 1600, added: 600 },
    { name: 'Week 4', views: parseInt(act.searches.toString().replace(/,/g, '')) / 5 || 500, added: parseInt(act.addedToTrips.toString().replace(/,/g, '')) / 5 || 100 },
  ];

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      await deleteActivity(act.id);
      navigate('/admin/activities');
    }
  };

  const handleOpenEdit = () => {
    setEditFormData({ 
      activity: act.activity, 
      category: act.category, 
      destination: act.destination 
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editActivity(act.id, editFormData);
    setIsEditModalOpen(false);
  };

  return (
    <div className="page-container">
      <div className="breadcrumb-nav">
        <button className="btn-icon-text" onClick={() => navigate('/admin/activities')}>
          <ArrowLeft size={16} /> Back to Activities
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', position: 'relative' }}>
        <div style={{
          height: '350px',
          width: '100%',
          background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)'
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
              <h2 style={{ fontSize: '3rem', margin: '0 0 0.5rem 0', fontWeight: 700, letterSpacing: '-0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{act.activity}</h2>
              <span style={{ fontSize: '1.25rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {act.destination} • {act.category}
              </span>
            </div>
            
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', padding: '1rem 1.5rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>⭐ {act.rating}</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ padding: '1.5rem 2.5rem', display: 'flex', gap: '1rem', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
          <button className="btn-secondary flex-center gap-sm" onClick={handleOpenEdit}><Edit size={16}/> Edit Activity</button>
          <button className="btn-danger flex-center gap-sm" onClick={handleDelete}><Trash2 size={16}/> Delete Activity</button>
        </div>
      </div>

      <ChartCard 
        title={`${act.activity} Engagement`} 
        data={mockChartData}
        dataKeys={['views', 'added']}
        colors={['var(--warning)', 'var(--success)']}
      />

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Activity">
        <form onSubmit={handleEditSubmit}>
          <div className="form-group">
            <label>Activity Name</label>
            <input type="text" value={editFormData.activity} onChange={e => setEditFormData({...editFormData, activity: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Destination</label>
            <input type="text" value={editFormData.destination} onChange={e => setEditFormData({...editFormData, destination: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={editFormData.category} onChange={e => setEditFormData({...editFormData, category: e.target.value})}>
              <option value="Sightseeing">Sightseeing</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Adventure">Adventure</option>
              <option value="Culture">Culture</option>
              <option value="Relaxation">Relaxation</option>
            </select>
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

export default ActivityDetails;
