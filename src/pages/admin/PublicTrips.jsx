import { useAdmin } from '../../context/AdminContext';
import DataTable from '../../components/admin/DataTable';

const PublicTrips = () => {
  const { trips, updateTripStatus } = useAdmin();
  
  const publicTrips = trips.filter(t => t.visibility === 'Public');

  const columns = [
    { 
      header: 'Trip', 
      accessor: 'trip',
      render: (row) => (
        <div>
          <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{row.trip}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{row.destinations}</div>
        </div>
      )
    },
    { header: 'Creator', accessor: 'owner' },
    { header: 'Status', accessor: 'status', isStatus: true },
    {
      header: 'Actions',
      accessor: 'id',
      render: (row) => (
        <button 
          className="btn-secondary" 
          onClick={() => updateTripStatus(row.id, row.status === 'Flagged' ? 'Active' : 'Flagged')}
        >
          {row.status === 'Flagged' ? 'Unflag' : 'Flag'}
        </button>
      )
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2>Public Trips</h2>
          <p className="page-subtitle">Monitor publicly shared itineraries.</p>
        </div>
      </div>
      <DataTable 
        title="Community Trips"
        columns={columns}
        data={publicTrips}
      />
    </div>
  );
};

export default PublicTrips;
