import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import DataTable from '../../components/admin/DataTable';

const Reports = () => {
  const { reports, resolveReport } = useAdmin();
  const [selectedReport, setSelectedReport] = useState(null);

  const columns = [
    { header: 'Type', accessor: 'type' },
    { header: 'Target', accessor: 'target', render: (row) => <strong style={{color: 'var(--text-primary)'}}>{row.target}</strong> },
    { header: 'Reason', accessor: 'reason' },
    { header: 'Reporter', accessor: 'reporter' },
    { header: 'Date', accessor: 'date' },
    { header: 'Status', accessor: 'status', isStatus: true }
  ];

  return (
    <div className="page-container position-relative">
      <div className="page-header">
        <div>
          <h2>Moderation Queue</h2>
          <p className="page-subtitle">Review reported content and users.</p>
        </div>
      </div>

      <DataTable 
        title="Needs Review"
        columns={columns}
        data={reports}
        onActionClick={(row) => setSelectedReport(row)}
      />

      {/* Review Drawer */}
      {selectedReport && (
        <>
          <div className="drawer-overlay" onClick={() => setSelectedReport(null)}></div>
          <div className="itinerary-drawer" style={{ zIndex: 101 }}>
            <div className="drawer-header">
              <h3>Report Details</h3>
              <button className="close-btn" onClick={() => setSelectedReport(null)}>×</button>
            </div>
            <div className="drawer-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reported {selectedReport.type}</label>
                <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{selectedReport.target}</div>
              </div>
              
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reason</label>
                <div style={{ color: 'var(--text-secondary)' }}>{selectedReport.reason}</div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reported By</label>
                <div style={{ color: 'var(--text-secondary)' }}>{selectedReport.reporter} on {selectedReport.date}</div>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button 
                  className="btn-danger" 
                  onClick={() => { resolveReport(selectedReport.id, 'Resolved'); setSelectedReport(null); }}
                >
                  Hide Content / Suspend User
                </button>
                <button 
                  className="btn-secondary" 
                  onClick={() => { resolveReport(selectedReport.id, 'Dismissed'); setSelectedReport(null); }}
                >
                  Dismiss Report
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
