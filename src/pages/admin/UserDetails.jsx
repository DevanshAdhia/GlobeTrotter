import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { ArrowLeft, Edit, ShieldBan, Trash2, Mail, Calendar } from 'lucide-react';
import Modal from '../../components/admin/Modal';
import './UserDetails.css';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, updateUserStatus, deleteUser, editUser, trips } = useAdmin();
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ user: '', email: '' });
  
  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return (
      <div className="page-container">
        <h2>User not found</h2>
        <button className="btn-secondary" onClick={() => navigate('/admin/users')}>Back to Users</button>
      </div>
    );
  }

  // Dynamic stats
  const userTrips = trips.filter(t => t.owner === user.user);
  const publicTripsCount = userTrips.filter(t => t.visibility === 'Public').length;

  const handleSuspend = () => {
    updateUserStatus(user.id, user.status === 'Suspended' ? 'Active' : 'Suspended');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(user.id);
      navigate('/admin/users');
    }
  };

  const handleOpenEdit = () => {
    setEditFormData({ user: user.user, email: user.email });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editUser(user.id, { 
      user: editFormData.user, 
      email: editFormData.email,
      avatar: editFormData.user.charAt(0).toUpperCase()
    });
    setIsEditModalOpen(false);
  };

  return (
    <div className="page-container">
      <div className="breadcrumb-nav">
        <button className="btn-icon-text" onClick={() => navigate('/admin/users')}>
          <ArrowLeft size={16} /> Back to Users
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', position: 'relative' }}>
        <div style={{
          height: '180px',
          width: '100%',
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
        </div>

        <div style={{ padding: '0 2.5rem 2rem 2.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '-40px' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end' }}>
              <div style={{ 
                width: '100px', height: '100px', 
                borderRadius: '50%', 
                background: 'var(--surface)', 
                display: 'flex', justifyContent: 'center', alignItems: 'center', 
                fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)', border: '4px solid var(--surface)'
              }}>
                {user.avatar}
              </div>
              <div style={{ paddingBottom: '0.5rem' }}>
                <h2 style={{ fontSize: '2rem', margin: '0 0 0.25rem 0' }}>{user.user}</h2>
                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Mail size={14} /> {user.email}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={14} /> Joined {user.joined}</span>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '50px' }}>
              <button className="btn-secondary flex-center gap-sm" onClick={handleOpenEdit}><Edit size={16} /> Edit Profile</button>
              <button className={`btn-secondary flex-center gap-sm`} onClick={handleSuspend} style={{ color: user.status === 'Suspended' ? 'var(--success)' : 'var(--warning)' }}>
                <ShieldBan size={16} /> {user.status === 'Suspended' ? 'Activate' : 'Suspend'}
              </button>
              <button className="btn-danger flex-center gap-sm" onClick={handleDelete}><Trash2 size={16} /> Delete</button>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem' }}>
             <span className={`status-badge status-${user.status.toLowerCase() === 'active' ? 'success' : user.status.toLowerCase() === 'suspended' ? 'danger' : 'warning'}`}>
              Status: {user.status}
            </span>
          </div>
        </div>
      </div>

      <div className="user-details-grid">
        <div className="user-overview card">
          <h3>Overview</h3>
          <div className="overview-stats">
            <div className="stat-box">
              <span className="stat-value">{userTrips.length}</span>
              <span className="stat-label">Total Trips</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{publicTripsCount}</span>
              <span className="stat-label">Public Trips</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">0</span>
              <span className="stat-label">Saved Destinations</span>
            </div>
          </div>
        </div>

        <div className="user-timeline card">
          <h3>Recent Activity</h3>
          <div className="timeline">
            {userTrips.length > 0 ? (
              userTrips.slice(0, 3).map((t, idx) => (
                <div className="timeline-item" key={idx}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <p>Created Trip <strong>{t.trip}</strong></p>
                    <span className="timeline-time">{t.dates || 'Recently'}</span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>No recent activity.</p>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit User">
        <form onSubmit={handleEditSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={editFormData.user} onChange={e => setEditFormData({...editFormData, user: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={editFormData.email} onChange={e => setEditFormData({...editFormData, email: e.target.value})} required />
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

export default UserDetails;
