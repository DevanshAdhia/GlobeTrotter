import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import { downloadCSV } from '../../utils/exportUtils';

const Trips = () => {
  const { trips, addTrip, users } = useAdmin();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [newTrip, setNewTrip] = useState({ trip: '', destinations: '', owner: users[0]?.user || '', dates: '', budget: '', visibility: 'Private' });

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.trip.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          trip.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || trip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAction = (trip) => {
    navigate(`/admin/trips/${trip.id}`);
  };

  const handleExport = () => {
    const exportData = filteredTrips.map(t => ({
      ID: t.id,
      TripName: t.trip,
      Destinations: t.destinations,
      Owner: t.owner,
      Dates: t.dates,
      Budget: t.budget,
      Visibility: t.visibility,
      Status: t.status
    }));
    downloadCSV(exportData, 'globetrotter_trips');
  };

  const handleAddTrip = (e) => {
    e.preventDefault();
    if (!newTrip.trip || !newTrip.owner) return;

    addTrip({
      trip: newTrip.trip,
      destinations: newTrip.destinations,
      owner: newTrip.owner,
      dates: newTrip.dates,
      budget: newTrip.budget,
      visibility: newTrip.visibility,
      status: 'Active'
    });
    
    setIsModalOpen(false);
    setNewTrip({ trip: '', destinations: '', owner: users[0]?.user || '', dates: '', budget: '', visibility: 'Private' });
  };

  const columns = [
    { 
      header: 'Trip', 
      accessor: 'trip',
      render: (row) => (
        <div onClick={() => navigate(`/admin/trips/${row.id}`)} style={{cursor: 'pointer'}}>
          <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{row.trip}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{row.destinations}</div>
        </div>
      )
    },
    { header: 'Owner', accessor: 'owner' },
    { header: 'Dates', accessor: 'dates' },
    { header: 'Budget', accessor: 'budget' },
    { header: 'Visibility', accessor: 'visibility' },
    { header: 'Status', accessor: 'status', isStatus: true }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2>Trips</h2>
          <p className="page-subtitle">Monitor and manage all itineraries across the platform.</p>
        </div>
        <div className="page-actions">
          <button className="btn-secondary" onClick={handleExport}>Export</button>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>Add Trip</button>
        </div>
      </div>

      <div className="controls-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search trips or owners..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <Filter size={18} className="filter-icon" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Completed">Completed</option>
            <option value="Flagged">Flagged</option>
          </select>
        </div>
      </div>

      <DataTable 
        title={`All Trips (${filteredTrips.length})`}
        columns={columns}
        data={filteredTrips}
        onActionClick={handleAction}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Trip">
        <form onSubmit={handleAddTrip}>
          <div className="form-group">
            <label>Trip Name</label>
            <input type="text" value={newTrip.trip} onChange={e => setNewTrip({...newTrip, trip: e.target.value})} required placeholder="E.g., Eurotrip 2026" />
          </div>
          <div className="form-group">
            <label>Destinations</label>
            <input type="text" value={newTrip.destinations} onChange={e => setNewTrip({...newTrip, destinations: e.target.value})} required placeholder="Paris → Rome" />
          </div>
          <div className="form-group">
            <label>Owner (Assign to User)</label>
            <select value={newTrip.owner} onChange={e => setNewTrip({...newTrip, owner: e.target.value})}>
              {users.map(u => (
                <option key={u.id} value={u.user}>{u.user}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Dates</label>
              <input type="text" value={newTrip.dates} onChange={e => setNewTrip({...newTrip, dates: e.target.value})} placeholder="Oct 12 - Oct 20" />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Budget</label>
              <input type="text" value={newTrip.budget} onChange={e => setNewTrip({...newTrip, budget: e.target.value})} placeholder="$3,500" />
            </div>
          </div>
          <div className="form-group">
            <label>Visibility</label>
            <select value={newTrip.visibility} onChange={e => setNewTrip({...newTrip, visibility: e.target.value})}>
              <option value="Private">Private</option>
              <option value="Public">Public</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary">Create Trip</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Trips;
