import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Search } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';

const Reports = () => {
  const { reports, resolveReport } = useAdmin();
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = reports.filter(r => 
    r.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <div className="controls-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search reports by target, user, or reason..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <DataTable 
        title={`Needs Review (${filteredReports.length})`}
        columns={columns}
        data={filteredReports}
        onActionClick={(row) => setSelectedReport(row)}
      />

      {/* Review Drawer */}
      {selectedReport && (
        <>
          <div className="drawer-overlay" onClick={() => setSelectedReport(null)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, backdropFilter: 'blur(4px)' }}></div>
          <div className="itinerary-drawer card" style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', maxWidth: '100vw', zIndex: 101, display: 'flex', flexDirection: 'column', borderRadius: '0', borderLeft: '1px solid var(--border)', transform: 'none', animation: 'slideInRight 0.3s ease-out' }}>
            <div className="drawer-header" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Report Details</h3>
              <button style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setSelectedReport(null)}>×</button>
            </div>
            <div className="drawer-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
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
                  onClick={async () => { await resolveReport(selectedReport.id, 'Resolved'); setSelectedReport(null); }}
                >
                  Hide Content / Suspend User
                </button>
                <button 
                  className="btn-secondary" 
                  onClick={async () => { await resolveReport(selectedReport.id, 'Dismissed'); setSelectedReport(null); }}
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
