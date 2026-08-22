import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { ArrowLeft, Search, Edit, Trash2, MapPin } from 'lucide-react';
import ChartCard from '../../components/admin/ChartCard';
import Modal from '../../components/admin/Modal';

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { destinations, editDestination, deleteDestination } = useAdmin();
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ city: '', country: '', image: '', searches: '' });

  const dest = destinations.find(d => d.id === parseInt(id));

  if (!dest) return <div className="page-container"><h2>Not found</h2></div>;

  const mockChartData = [
    { name: 'Week 1', searches: 2000, trips: 400 },
    { name: 'Week 2', searches: 2500, trips: 550 },
    { name: 'Week 3', searches: 3200, trips: 800 },
    { name: 'Week 4', searches: parseInt(dest.searches.toString().replace(/,/g, '')) / 2 || 1000, trips: 1200 },
  ];

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      await deleteDestination(dest.id);
      navigate('/admin/destinations');
    }
  };

  const handleOpenEdit = () => {
    setEditFormData({ 
      city: dest.city, 
      country: dest.country, 
      image: dest.image, 
      searches: dest.searches 
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editDestination(dest.id, editFormData);
    setIsEditModalOpen(false);
  };

  return (
    <div className="page-container">
      <div className="breadcrumb-nav">
        <button className="btn-icon-text" onClick={() => navigate('/admin/destinations')}>
          <ArrowLeft size={16} /> Back to Destinations
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', position: 'relative' }}>
        <div style={{ 
          height: '400px', 
          width: '100%', 
          backgroundImage: `url(${dest.image.replace('w=400', 'w=1600')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)'
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
              <h2 style={{ fontSize: '3rem', margin: '0 0 0.5rem 0', fontWeight: 700, letterSpacing: '-0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{dest.city}</h2>
              <span style={{ fontSize: '1.25rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} /> {dest.country}
              </span>
            </div>
            
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '1rem 1.5rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{dest.searches}</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}><Search size={14}/> Searches</div>
              </div>
              <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.2)' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#4ade80' }}>{dest.trend}</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Growth</div>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ padding: '1.5rem 2.5rem', display: 'flex', gap: '1rem', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
          <button className="btn-secondary flex-center gap-sm" onClick={handleOpenEdit}><Edit size={16}/> Edit Destination</button>
          <button className="btn-danger flex-center gap-sm" onClick={handleDelete}><Trash2 size={16}/> Delete Destination</button>
        </div>
      </div>

      <ChartCard 
        title={`${dest.city} Performance Analytics`} 
        data={mockChartData}
        dataKeys={['searches', 'trips']}
        colors={['var(--primary)', 'var(--info)']}
      />

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Destination">
        <form onSubmit={handleEditSubmit}>
          <div className="form-group">
            <label>City</label>
            <input type="text" value={editFormData.city} onChange={e => setEditFormData({...editFormData, city: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input type="text" value={editFormData.country} onChange={e => setEditFormData({...editFormData, country: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input type="text" value={editFormData.image} onChange={e => setEditFormData({...editFormData, image: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Searches</label>
            <input type="text" value={editFormData.searches} onChange={e => setEditFormData({...editFormData, searches: e.target.value})} />
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

export default DestinationDetails;
