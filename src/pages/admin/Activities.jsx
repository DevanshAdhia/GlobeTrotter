import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';

const Activities = () => {
  const { activities, addActivity } = useAdmin();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [newAct, setNewAct] = useState({ activity: '', category: 'Sightseeing', destination: '' });

  const handleAddAct = (e) => {
    e.preventDefault();
    if (!newAct.activity || !newAct.destination) return;

    addActivity({
      activity: newAct.activity,
      category: newAct.category,
      destination: newAct.destination,
      rating: '0.0',
      searches: '0',
      addedToTrips: '0',
      trend: '+0.0%'
    });
    
    setIsModalOpen(false);
    setNewAct({ activity: '', category: 'Sightseeing', destination: '' });
  };

  const filteredActivities = activities.filter(act => 
    act.activity.toLowerCase().includes(searchTerm.toLowerCase()) || 
    act.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    act.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { 
      header: 'Activity', 
      accessor: 'activity', 
      render: (row) => <strong style={{ color: 'var(--text-primary)', cursor: 'pointer' }} onClick={() => navigate(`/admin/activities/${row.id}`)}>{row.activity}</strong> 
    },
    { header: 'Category', accessor: 'category' },
    { header: 'Destination', accessor: 'destination' },
    { header: 'Rating', accessor: 'rating', render: (row) => <span>⭐ {row.rating}</span> },
    { header: 'Searches', accessor: 'searches' },
    { header: 'Added to Trips', accessor: 'addedToTrips' },
    { header: 'Trend', accessor: 'trend', render: (row) => <span style={{color: 'var(--success)', fontWeight: 600}}>{row.trend}</span> }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2>Activities</h2>
          <p className="page-subtitle">Manage platform-wide experiences and attractions.</p>
        </div>
        <div className="page-actions">
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>Add Activity</button>
        </div>
      </div>
      <div className="controls-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search activities, destinations, or categories..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <DataTable 
        title={`All Activities (${filteredActivities.length})`}
        columns={columns}
        data={filteredActivities}
        onActionClick={(row) => navigate(`/admin/activities/${row.id}`)}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Activity">
        <form onSubmit={handleAddAct}>
          <div className="form-group">
            <label>Activity Name</label>
            <input type="text" value={newAct.activity} onChange={e => setNewAct({...newAct, activity: e.target.value})} required placeholder="E.g., Eiffel Tower Tour" />
          </div>
          <div className="form-group">
            <label>Destination</label>
            <input type="text" value={newAct.destination} onChange={e => setNewAct({...newAct, destination: e.target.value})} required placeholder="E.g., Paris" />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={newAct.category} onChange={e => setNewAct({...newAct, category: e.target.value})}>
              <option value="Sightseeing">Sightseeing</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Adventure">Adventure</option>
              <option value="Culture">Culture</option>
              <option value="Relaxation">Relaxation</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary">Add Activity</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Activities;
