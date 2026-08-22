import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';

const Destinations = () => {
  const { destinations, addDestination } = useAdmin();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [newDest, setNewDest] = useState({ city: '', country: '', image: '', searches: '' });

  const handleAddDest = (e) => {
    e.preventDefault();
    if (!newDest.city || !newDest.country) return;

    addDestination({
      city: newDest.city,
      country: newDest.country,
      image: newDest.image || 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80',
      searches: newDest.searches || '1,000',
      trend: '+0.0%',
      isPositive: true
    });
    
    setIsModalOpen(false);
    setNewDest({ city: '', country: '', image: '', searches: '' });
  };

  const columns = [
    {
      header: 'Destination',
      accessor: 'city',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} onClick={() => navigate(`/admin/destinations/${row.id}`)}>
          <img src={row.image} alt={row.city} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.city}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{row.country}</div>
          </div>
        </div>
      )
    },
    { header: 'Searches', accessor: 'searches' },
    { 
      header: 'Trend', 
      accessor: 'trend',
      render: (row) => (
        <span style={{ color: row.isPositive ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>
          {row.trend}
        </span>
      )
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2>Destinations</h2>
          <p className="page-subtitle">Track the most popular cities and regions.</p>
        </div>
        <div className="page-actions">
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>Add Destination</button>
        </div>
      </div>
      <DataTable 
        title="All Destinations"
        columns={columns}
        data={destinations}
        onActionClick={(row) => navigate(`/admin/destinations/${row.id}`)}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Destination">
        <form onSubmit={handleAddDest}>
          <div className="form-group">
            <label>City</label>
            <input type="text" value={newDest.city} onChange={e => setNewDest({...newDest, city: e.target.value})} required placeholder="E.g., Berlin" />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input type="text" value={newDest.country} onChange={e => setNewDest({...newDest, country: e.target.value})} required placeholder="Germany" />
          </div>
          <div className="form-group">
            <label>Image URL (Optional)</label>
            <input type="text" value={newDest.image} onChange={e => setNewDest({...newDest, image: e.target.value})} placeholder="https://..." />
          </div>
          <div className="form-group">
            <label>Initial Searches</label>
            <input type="text" value={newDest.searches} onChange={e => setNewDest({...newDest, searches: e.target.value})} placeholder="E.g., 5,000" />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary">Add Destination</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Destinations;
